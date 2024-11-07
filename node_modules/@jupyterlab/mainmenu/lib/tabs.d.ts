import { IRankedMenu, RankedMenu } from '@jupyterlab/ui-components';
/**
 * An interface for a Tabs menu.
 */
export interface ITabsMenu extends IRankedMenu {
}
/**
 * An extensible Tabs menu for the application.
 */
export declare class TabsMenu extends RankedMenu implements ITabsMenu {
    /**
     * Construct the tabs menu.
     */
    constructor(options: IRankedMenu.IOptions);
}
