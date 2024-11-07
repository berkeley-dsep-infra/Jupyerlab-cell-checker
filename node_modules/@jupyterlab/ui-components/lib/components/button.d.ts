import React from 'react';
/**
 * Button component property
 */
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Whether this button should use minimal styles.
     */
    minimal?: boolean;
    /**
     * Whether this button should use small styles.
     */
    small?: boolean;
}
/**
 * Button component
 *
 * @param props Component properties
 * @returns Component
 */
export declare function Button(props: IButtonProps): JSX.Element;
