import { ISearchMatch } from '../tokens';
/**
 * Search provider for text/plain
 */
export declare const TextSearchEngine: {
    /**
     * Search for regular expression matches in a string.
     *
     * @param query Query regular expression
     * @param data String to look into
     * @returns List of matches
     */
    search(query: RegExp, data: string): Promise<ISearchMatch[]>;
};
