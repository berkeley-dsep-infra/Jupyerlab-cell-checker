import { PageConfig } from '@jupyterlab/coreutils';
export async function requestAPI(endpoint, init = {}) {
    const baseUrl = PageConfig.getBaseUrl();
    const response = await fetch(`${baseUrl}${endpoint}`, init);
    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }
    return response.json();
}
//# sourceMappingURL=handler.js.map