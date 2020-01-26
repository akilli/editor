/**
 * Media
 */
export default class Media {
    /**
     * Initializes media service with given types configuration
     *
     * @param {Object.<String, MediaTypeElement>} types
     */
    constructor(types) {
        /**
         * Media type configuration
         *
         * @type {Object<String, MediaTypeElement>}
         */
        this.types = types;
    }

    /**
     * Returns all media types IDs
     *
     * @return {String[]}
     */
    ids() {
        return Object.getOwnPropertyNames(this.types);
    }

    /**
     * Returns given media type or null
     *
     * @param {String} type
     *
     * @return {?MediaTypeElement}
     */
    get(type) {
        return this.types[type] || null;
    }

    /**
     * Returns given media type from given element or null
     *
     * @param {String} element
     *
     * @return {?MediaTypeElement}
     */
    fromElement(element) {
        const ids = this.ids();

        for (let i = 0; i < ids.length; ++i) {
            if (this.types[ids[i]].element === element) {
                return this.types[ids[i]];
            }
        }

        return null;
    }

    /**
     * Returns media type from given URL or null
     *
     * @param {String} url
     *
     * @return {Promise<MediaTypeElement>}
     */
    async fromUrl(url) {
        let response;

        try {
            response = await fetch(url, {method: 'HEAD', mode: 'no-cors'});
        } catch (e) {
            return null;
        }

        if (response.ok) {
            const mime = response.headers.get('content-type').split(';')[0].trim();
            const ids = this.ids();

            for (let i = 0; i < ids.length; ++i) {
                if (this.types[ids[i]].mime.includes(mime)) {
                    return this.types[ids[i]];
                }
            }
        }

        return null;
    }
}
