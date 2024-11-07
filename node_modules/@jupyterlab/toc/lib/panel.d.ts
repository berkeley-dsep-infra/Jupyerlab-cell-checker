import { ITranslator } from '@jupyterlab/translation';
import { SidePanel } from '@jupyterlab/ui-components';
import { TableOfContents } from './tokens';
import { Message } from '@lumino/messaging';
/**
 * Table of contents sidebar panel.
 */
export declare class TableOfContentsPanel extends SidePanel {
    /**
     * Constructor
     *
     * @param translator - Translator tool
     */
    constructor(translator?: ITranslator);
    /**
     * Get the current model.
     */
    get model(): TableOfContents.Model | null;
    set model(newValue: TableOfContents.Model | null);
    protected onAfterHide(msg: Message): void;
    protected onBeforeShow(msg: Message): void;
    private _onTitleChanged;
    private _model;
    private _title;
    private _treeview;
}
