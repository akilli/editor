import configMediaType from '../../cfg/mediatype.js';

/**
 * Media Type
 */
export default class MediaType {
    /**
     * Returns all media types IDs
     *
     * @return {String[]}
     */
    static ids() {
        return Object.getOwnPropertyNames(configMediaType);
    }

    /**
     * Returns given media type or null
     *
     * @param {String} type
     *
     * @return {?Object}
     */
    static get(type) {
        return configMediaType[type] || null;
    }

    /**
     * Returns given media type from given element or null
     *
     * @param {String} element
     *
     * @return {?Object}
     */
    static fromElement(element) {
        const ids = this.ids();

        for (let i = 0; i < ids.length; ++i) {
            if (configMediaType[ids[i]].element === element) {
                return configMediaType[ids[i]];
            }
        }

        return null;
    }

    /**
     * Returns media type from given URL or null
     *
     * @param {String} url
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
            const ids = this.ids();

            for (let i = 0; i < ids.length; ++i) {
                if (configMediaType[ids[i]].mime.includes(mime)) {
                    return configMediaType[ids[i]];
                }
            }
        }

        return null;
    }
}
