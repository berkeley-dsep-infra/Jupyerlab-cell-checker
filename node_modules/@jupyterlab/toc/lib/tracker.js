// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * Table of contents tracker
 */
export class TableOfContentsTracker {
    /**
     * Constructor
     */
    constructor() {
        this.modelMapping = new WeakMap();
    }
    /**
     * Track a given model.
     *
     * @param widget Widget
     * @param model Table of contents model
     */
    add(widget, model) {
        this.modelMapping.set(widget, model);
    }
    /**
     * Get the table of contents model associated with a given widget.
     *
     * @param widget Widget
     * @returns The table of contents model
     */
    get(widget) {
        const model = this.modelMapping.get(widget);
        return !model || model.isDisposed ? null : model;
    }
}
//# sourceMappingURL=tracker.js.map