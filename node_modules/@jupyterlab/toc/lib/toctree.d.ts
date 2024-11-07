import * as React from 'react';
import { TableOfContents } from './tokens';
/**
 * Interface describing component properties.
 */
export interface ITableOfContentsTreeProps {
    /**
     * Currently active heading.
     */
    activeHeading: TableOfContents.IHeading | null;
    /**
     * Type of document supported by the model.
     */
    documentType: string;
    /**
     * List of headings to render.
     */
    headings: TableOfContents.IHeading[];
    /**
     * Set active heading.
     */
    setActiveHeading: (heading: TableOfContents.IHeading) => void;
    /**
     * Collapse heading callback.
     */
    onCollapseChange: (heading: TableOfContents.IHeading) => void;
}
/**
 * React component for a table of contents tree.
 */
export declare class TableOfContentsTree extends React.PureComponent<ITableOfContentsTreeProps> {
    /**
     * Renders a table of contents tree.
     */
    render(): JSX.Element;
    /**
     * Convert the flat headings list to a nested tree list
     */
    protected buildTree(): JSX.Element[];
}
