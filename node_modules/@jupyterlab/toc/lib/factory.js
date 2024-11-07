// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { ActivityMonitor, PathExt } from '@jupyterlab/coreutils';
/**
 * Timeout for throttling ToC rendering following model changes.
 *
 * @private
 */
const RENDER_TIMEOUT = 1000;
/**
 * Abstract table of contents model factory for IDocumentWidget.
 */
export class TableOfContentsFactory {
    /**
     * Constructor
     *
     * @param tracker Widget tracker
     */
    constructor(tracker) {
        this.tracker = tracker;
    }
    /**
     * Whether the factory can handle the widget or not.
     *
     * @param widget - widget
     * @returns boolean indicating a ToC can be generated
     */
    isApplicable(widget) {
        if (!this.tracker.has(widget)) {
            return false;
        }
        return true;
    }
    /**
     * Create a new table of contents model for the widget
     *
     * @param widget - widget
     * @param configuration - Table of contents configuration
     * @returns The table of contents model
     */
    createNew(widget, configuration) {
        const model = this._createNew(widget, configuration);
        const context = widget.context;
        const updateHeadings = () => {
            model.refresh().catch(reason => {
                console.error('Failed to update the table of contents.', reason);
            });
        };
        const monitor = new ActivityMonitor({
            signal: context.model.contentChanged,
            timeout: RENDER_TIMEOUT
        });
        monitor.activityStopped.connect(updateHeadings);
        const updateTitle = () => {
            model.title = PathExt.basename(context.localPath);
        };
        context.pathChanged.connect(updateTitle);
        context.ready
            .then(() => {
            updateTitle();
            updateHeadings();
        })
            .catch(reason => {
            console.error(`Failed to initiate headings for ${context.localPath}.`);
        });
        widget.disposed.connect(() => {
            monitor.activityStopped.disconnect(updateHeadings);
            context.pathChanged.disconnect(updateTitle);
        });
        return model;
    }
}
//# sourceMappingURL=factory.js.map