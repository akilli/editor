/**
 * @type {number}
 */
const now = Date.now();

/**
 * Minimal cache busting
 *
 * @param {string} path
 * @return {string}
 */
export function cache(path) {
    const url = new URL(path);
    url.searchParams.set('v', `${now}`);
    return url.toString();
}
