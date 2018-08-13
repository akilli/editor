/**
 * Media type configuration
 *
 * @type {Object}
 *
 * @typedef {Object} ConfigMediaType
 *
 * @property {String}   id      Media type ID
 * @property {String}   element The corresponding HTML element name
 * @property {String[]} mime    Supported MIME types
 */
const data = {
    audio: {
        id: 'audio',
        element: 'audio',
        mime: [
            'audio/aac', 'audio/flac', 'audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/wave', 'audio/webm',
            'audio/x-aac', 'audio/x-flac', 'audio/x-mpeg', 'audio/x-pn-wav', 'audio/x-wav'
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

export default data;
