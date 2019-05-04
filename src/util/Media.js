/**
 * Media types
 *
 * @type {Object}
 *
 * @typedef {Object} MediaTypeElement
 *
 * @property {String}   id      Media type ID
 * @property {String}   element The corresponding HTML element name
 * @property {String[]} mime    Supported MIME types
 */
const types = {
    audio: {
        id: 'audio',
        element: 'audio',
        mime: [
            'audio/aac', 'audio/flac', 'audio/mp3', 'audio/mpeg', 'audio/mpeg3', 'audio/ogg', 'audio/wav', 'audio/wave', 'audio/webm',
            'audio/x-aac', 'audio/x-flac', 'audio/x-mp3', 'audio/x-mpeg', 'audio/x-mpeg3', 'audio/x-pn-wav', 'audio/x-wav'
        ]
    },
    iframe: {
        id: 'iframe',
        element: 'iframe',
        mime: ['text/html']
    },
    image: {
        id: 'image',
        element: 'img',
        mime: ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
    },
    video: {
        id: 'video',
        element: 'video',
        mime: ['video/mp4', 'video/ogg', 'video/webm']
    }
};

/**
 * Media
 */
export default class Media {
    /**
     * Returns all media types IDs
     *
     * @return {String[]}
     */
    static ids() {
        return Object.getOwnPropertyNames(types);
    }

    /**
     * Returns given media type or null
     *
     * @param {String} type
     *
     * @return {?Object}
     */
    static get(type) {
        return types[type] || null;
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
            if (types[ids[i]].element === element) {
                return types[ids[i]];
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
            return null;
        }

        if (response.ok) {
            const mime = response.headers.get('content-type').split(';')[0].trim();
            const ids = this.ids();

            for (let i = 0; i < ids.length; ++i) {
                if (types[ids[i]].mime.includes(mime)) {
                    return types[ids[i]];
                }
            }
        }

        return null;
    }
}
