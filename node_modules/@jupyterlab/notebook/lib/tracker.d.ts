import { WidgetTracker } from '@jupyterlab/apputils';
import { Cell } from '@jupyterlab/cells';
import { ISignal } from '@lumino/signaling';
import { NotebookPanel } from './panel';
import { INotebookTracker } from './tokens';
export declare class NotebookTracker extends WidgetTracker<NotebookPanel> implements INotebookTracker {
    /**
     * The currently focused cell.
     *
     * #### Notes
     * This is a read-only property. If there is no cell with the focus, then this
     * value is `null`.
     */
    get activeCell(): Cell | null;
    /**
     * A signal emitted when the current active cell changes.
     *
     * #### Notes
     * If there is no cell with the focus, then `null` will be emitted.
     */
    get activeCellChanged(): ISignal<this, Cell | null>;
    /**
     * A signal emitted when the selection state changes.
     */
    get selectionChanged(): ISignal<this, void>;
    /**
     * Add a new notebook panel to the tracker.
     *
     * @param panel - The notebook panel being added.
     */
    add(panel: NotebookPanel): Promise<void>;
    /**
     * Dispose of the resources held by the tracker.
     */
    dispose(): void;
    /**
     * Handle the current change event.
     */
    protected onCurrentChanged(widget: NotebookPanel): void;
    private _onActiveCellChanged;
    private _onSelectionChanged;
    private _activeCell;
    private _activeCellChanged;
    private _selectionChanged;
}
