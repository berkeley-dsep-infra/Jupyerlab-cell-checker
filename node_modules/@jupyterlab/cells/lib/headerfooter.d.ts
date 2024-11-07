import { Widget } from '@lumino/widgets';
/**
 * The interface for a cell header.
 */
export interface ICellHeader extends Widget {
}
/**
 * Default implementation of a cell header.
 */
export declare class CellHeader extends Widget implements ICellHeader {
    /**
     * Construct a new cell header.
     */
    constructor();
}
/**
 * The interface for a cell footer.
 */
export interface ICellFooter extends Widget {
}
/**
 * Default implementation of a cell footer.
 */
export declare class CellFooter extends Widget implements ICellFooter {
    /**
     * Construct a new cell footer.
     */
    constructor();
}
