import { ITranslator, TranslationBundle } from '@jupyterlab/translation';
import { AccordionPanel, Panel, Widget } from '@lumino/widgets';
import { Toolbar } from './toolbar';
/**
 * A widget meant to be contained in sidebars.
 *
 * #### Note
 * By default the content widget is an accordion panel that supports widget with
 * associated toolbar to be displayed in the widget title.
 */
export declare class SidePanel extends Widget {
    constructor(options?: SidePanel.IOptions);
    /**
     * The content hosted by the widget.
     */
    get content(): Panel;
    /**
     * A panel for widgets that sit on top of the widget.
     */
    get header(): Panel;
    /**
     * The toolbar hosted by the widget.
     *
     * It sits between the header and the content
     */
    get toolbar(): Toolbar;
    /**
     * A read-only array of the widgets in the content panel.
     */
    get widgets(): ReadonlyArray<Widget>;
    /**
     * Add a widget to the content panel bottom.
     *
     * @param widget Widget to add
     */
    addWidget(widget: Toolbar.IWidgetToolbar): void;
    /**
     * Insert a widget at the given position in the content panel.
     *
     * @param index Position
     * @param widget Widget to insert
     */
    insertWidget(index: number, widget: Toolbar.IWidgetToolbar): void;
    private addHeader;
    private addToolbar;
    protected _content: Panel;
    protected _header: Panel;
    protected _toolbar: Toolbar;
    protected _trans: TranslationBundle;
}
/**
 * The namespace for the `SidePanel` class statics.
 */
export declare namespace SidePanel {
    /**
     * An options object for creating a side panel widget.
     */
    interface IOptions extends AccordionPanel.IOptions {
        /**
         * The main child of the side panel
         *
         * If nothing is provided it fallback to an AccordionToolbar panel.
         */
        content?: Panel;
        /**
         * The header is at the top of the SidePanel,
         * and that extensions can populate.
         *
         * Defaults to an empty Panel if requested otherwise it won't be created.
         */
        header?: Panel;
        /**
         * The toolbar to use for the widget.
         * It sits between the header and the content
         *
         * Defaults to an empty toolbar if requested otherwise it won't be created.
         */
        toolbar?: Toolbar;
        /**
         * The application language translator.
         */
        translator?: ITranslator;
    }
}
