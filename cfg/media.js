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
export default {
    audio: {
        id: 'audio',
        element: 'audio',
        mime: [
            'audio/aac', 'audio/flac', 'audio/mp3', 'audio/mpeg', 'audio/mpeg3', 'audio/ogg', 'audio/wav', 'audio/wave', 'audio/webm',
            'audio/x-aac', 'audio/x-flac', 'audio/x-mp3', 'audio/x-mpeg', 'audio/x-mpeg3', 'audio/x-pn-wav', 'audio/x-wav'
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
}
