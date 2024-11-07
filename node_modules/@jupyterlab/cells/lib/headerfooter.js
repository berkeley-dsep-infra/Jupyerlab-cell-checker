/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
import { Widget } from '@lumino/widgets';
/**
 * The CSS class added to the cell header.
 */
const CELL_HEADER_CLASS = 'jp-CellHeader';
/**
 * The CSS class added to the cell footer.
 */
const CELL_FOOTER_CLASS = 'jp-CellFooter';
/**
 * Default implementation of a cell header.
 */
export class CellHeader extends Widget {
    /**
     * Construct a new cell header.
     */
    constructor() {
        super();
        this.addClass(CELL_HEADER_CLASS);
    }
}
/**
 * Default implementation of a cell footer.
 */
export class CellFooter extends Widget {
    /**
     * Construct a new cell footer.
     */
    constructor() {
        super();
        this.addClass(CELL_FOOTER_CLASS);
    }
}
//# sourceMappingURL=headerfooter.js.map