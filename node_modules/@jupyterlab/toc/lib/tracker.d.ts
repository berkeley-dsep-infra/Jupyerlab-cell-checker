import { Widget } from '@lumino/widgets';
import { ITableOfContentsTracker, TableOfContents } from './tokens';
/**
 * Table of contents tracker
 */
export declare class TableOfContentsTracker implements ITableOfContentsTracker {
    /**
     * Constructor
     */
    constructor();
    /**
     * Track a given model.
     *
     * @param widget Widget
     * @param model Table of contents model
     */
    add(widget: Widget, model: TableOfContents.Model): void;
    /**
     * Get the table of contents model associated with a given widget.
     *
     * @param widget Widget
     * @returns The table of contents model
     */
    get(widget: Widget): TableOfContents.Model | null;
    protected modelMapping: WeakMap<Widget, TableOfContents.Model>;
}
