// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * Search provider for text/plain
 */
export const TextSearchEngine = {
    /**
     * Search for regular expression matches in a string.
     *
     * @param query Query regular expression
     * @param data String to look into
     * @returns List of matches
     */
    search(query, data) {
        // If data is not a string, try to JSON serialize the data.
        if (typeof data !== 'string') {
            try {
                data = JSON.stringify(data);
            }
            catch (reason) {
                console.warn('Unable to search with TextSearchEngine non-JSON serializable object.', reason, data);
                return Promise.resolve([]);
            }
        }
        if (!query.global) {
            query = new RegExp(query.source, query.flags + 'g');
        }
        const matches = new Array();
        let match = null;
        while ((match = query.exec(data)) !== null) {
            matches.push({
                text: match[0],
                position: match.index
            });
        }
        return Promise.resolve(matches);
    }
};
//# sourceMappingURL=textprovider.js.map