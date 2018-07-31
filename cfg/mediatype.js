/**
 * Media type configuration
 *
 * @typedef {Object} CfgMediaType
 *
 * @property {string}   id      Media type ID
 * @property {string}   element The corresponding HTML element name
 * @property {string[]} mime    Supported MIME types
 */
'use strict';

const cfg = {
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

export default cfg;
