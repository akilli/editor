/**
 * Media types
 *
 * @type {Object}
 */
const mediaTypes = {
    audio: {
        id: 'audio',
        element: 'audio',
        mime: [
            'audio/aac', 'audio/flac', 'audio/mp3', 'audio/ogg', 'audio/wav', 'audio/wave', 'audio/webm',
            'audio/x-aac', 'audio/x-flac', 'audio/x-pn-wav', 'audio/x-wav'
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
 * Media Utils
 */
export default class MediaUtils {
    /**
     * Returns all media types IDs
     *
     * @return {string[]}
     */
    static getTypeIds() {
        return Object.getOwnPropertyNames(mediaTypes);
    }

    /**
     * Returns given media type or null
     *
     * @param {string} type
     *
     * @return {?Object}
     */
    static getType(type) {
        return mediaTypes[type] || null;
    }

    /**
     * Returns media type from given URL or null
     *
     * @param {string} url
     *
     * @return {Promise<Object>}
     */
    static async getTypeFromUrl(url) {
        let response;

        try {
            response = await fetch(url);
        } catch (e) {
            console.log(e);
            return null;
        }

        if (response.ok) {
            const mime = response.headers.get('content-type').split(';')[0].trim();
            const types = MediaUtils.getTypeIds();

            for (let i = 0; i < types.length; ++i) {
                if (mediaTypes[types[i]].mime.includes(mime)) {
                    return mediaTypes[types[i]];
                }
            }
        }

        return null;
    }
}
