import { Panel } from '@lumino/widgets';
import { Toolbar } from './toolbar';
/**
 * A base class for panel widget with toolbar.
 */
export declare class PanelWithToolbar extends Panel implements Toolbar.IWidgetToolbar {
    constructor(options?: PanelWithToolbar.IOptions);
    /**
     * Widget toolbar
     */
    get toolbar(): Toolbar;
    protected _toolbar: Toolbar;
}
/**
 * Namespace for panel with toolbar
 */
export declare namespace PanelWithToolbar {
    /**
     * An options object for creating a panel with toolbar widget.
     */
    interface IOptions extends Panel.IOptions {
        /**
         * Custom toolbar
         */
        toolbar?: Toolbar;
    }
}
