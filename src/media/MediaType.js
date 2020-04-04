/**
 * Media types
 *
 * @typedef {Object} MediaTypeElement
 * @property {String}   id      Media type ID
 * @property {String}   element The corresponding HTML element name
 * @property {String[]} mime    Supported MIME types
 *
 * @type {Object.<String, MediaTypeElement>}
 */
const types = {
    audio: {
        id: 'audio',
        element: 'audio',
        mime: [
            'audio/aac', 'audio/flac', 'audio/mp3', 'audio/mpeg', 'audio/mpeg3', 'audio/ogg', 'audio/wav', 'audio/wave', 'audio/webm',
            'audio/x-aac', 'audio/x-flac', 'audio/x-mp3', 'audio/x-mpeg', 'audio/x-mpeg3', 'audio/x-pn-wav', 'audio/x-wav',
        ],
    },
    iframe: {
        id: 'iframe',
        element: 'iframe',
        mime: ['text/html'],
    },
    image: {
        id: 'image',
        element: 'img',
        mime: ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'],
    },
    video: {
        id: 'video',
        element: 'video',
        mime: ['video/mp4', 'video/ogg', 'video/webm'],
    },
};

/**
 * Element to type cache
 *
 * @type {Object.<String, MediaTypeElement>}
 */
const elements = {};

/**
 * Mime to type cache
 *
 * @type {Object.<String, MediaTypeElement>}
 */
const mimes = {};

for (let [, type] of Object.entries(types)) {
    elements[type.element] = type;
    type.mime.forEach(mime => mimes[mime] = type);
}

/**
 * Media Type
 */
export default class MediaType {
    /**
     * Returns given media type from given type ID or null
     *
     * @param {String} id
     *
     * @return {?MediaTypeElement}
     */
    static get(id) {
        return types[id] || null;
    }

    /**
     * Returns given media type from given element or null
     *
     * @param {String} element
     *
     * @return {?MediaTypeElement}
     */
    static fromElement(element) {
        return elements[element] || null;
    }

    /**
     * Returns media type from given URL or null
     *
     * @param {String} url
     *
     * @return {Promise<MediaTypeElement>}
     */
    static async fromUrl(url) {
        try {
            const response = await fetch(url, {method: 'HEAD', mode: 'no-cors'});

            if (response.ok) {
                const mime = response.headers.get('content-type').split(';')[0].trim();
                return mimes[mime] || null;
            }
        } catch (e) {
            console.error(e);
        }

        return null;
    }
}
