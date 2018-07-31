import cfgMediaType from '../../cfg/mediatype.js';

/**
 * Media Type
 */
export default class MediaType {
    /**
     * Returns all media types IDs
     *
     * @return {string[]}
     */
    static ids() {
        return Object.getOwnPropertyNames(cfgMediaType);
    }

    /**
     * Returns given media type or null
     *
     * @param {string} type
     *
     * @return {?Object}
     */
    static get(type) {
        return cfgMediaType[type] || null;
    }

    /**
     * Returns given media type from given element or null
     *
     * @param {string} element
     *
     * @return {?Object}
     */
    static fromElement(element) {
        const ids = MediaType.ids();

        for (let i = 0; i < ids.length; ++i) {
            if (cfgMediaType[ids[i]].element === element) {
                return cfgMediaType[ids[i]];
            }
        }

        return null;
    }

    /**
     * Returns media type from given URL or null
     *
     * @param {string} url
     *
     * @return {Promise<Object>}
     */
    static async fromUrl(url) {
        let response;

        try {
            response = await fetch(url);
        } catch (e) {
            console.log(e);
            return null;
        }

        if (response.ok) {
            const mime = response.headers.get('content-type').split(';')[0].trim();
            const ids = MediaType.ids();

            for (let i = 0; i < ids.length; ++i) {
                if (cfgMediaType[ids[i]].mime.includes(mime)) {
                    return cfgMediaType[ids[i]];
                }
            }
        }

        return null;
    }
}
