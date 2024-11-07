import { SemanticCommand } from '@jupyterlab/apputils';
import { TranslationBundle } from '@jupyterlab/translation';
import { CommandRegistry } from '@lumino/commands';
import { JupyterFrontEnd } from './frontend';
export interface ISemanticCommandDefault {
    /**
     * Default command to execute if no command is enabled
     */
    execute?: string;
    /**
     * Default command label
     */
    label?: string;
    /**
     * Default command caption
     */
    caption?: string;
    /**
     * Whether the default command is enabled.
     */
    isEnabled?: boolean;
    /**
     * Whether the default command is toggled.
     */
    isToggled?: boolean;
    /**
     * Whether the default command is visible.
     */
    isVisible?: boolean;
}
/**
 * Create the command options from the given semantic commands list
 * and the given default values.
 *
 * @param app Jupyter Application
 * @param semanticCommands Single semantic command  or a list of commands
 * @param defaultValues Default values
 * @param trans Translation bundle
 * @returns Command options
 */
export declare function createSemanticCommand(app: JupyterFrontEnd, semanticCommands: SemanticCommand | SemanticCommand[], defaultValues: ISemanticCommandDefault, trans: TranslationBundle): CommandRegistry.ICommandOptions;
