/**
 * Tag configuration
 *
 * @typedef {Object} CfgTag
 *
 * @property {string[]} attributes Allowed attributes
 * @property {string[]} children   Allowed child elements
 * @property {boolean}  empty      Is empty element
 * @property {string}   group      Name of the tag group
 */
'use strict';

const cfg = [
    [
        '_root_',
        {
            attributes: [],
            children: ['details', 'figure', 'h2', 'h3', 'ol', 'p', 'ul'],
            empty: false,
            group: 'root',
        }
    ],
    [
        'a',
        {
            attributes: ['href'],
            children: [],
            empty: false,
            group: 'text',
        }
    ],
    [
        'audio',
        {
            attributes: ['controls', 'height', 'src', 'width'],
            children: [],
            empty: false,
            group: 'media',
        }
    ],
    [
        'blockquote',
        {
            attributes: [],
            children: ['p'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'br',
        {
            attributes: [],
            children: [],
            empty: true,
            group: 'break',
        }
    ],
    [
        'details',
        {
            attributes: [],
            children: ['figure', 'p', 'summary', 'table'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'figcaption',
        {
            attributes: [],
            children: ['a', 'i', 'mark', 'strong'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'figure',
        {
            attributes: ['class'],
            children: ['audio', 'blockquote', 'figcaption', 'iframe', 'img', 'table', 'video'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'h2',
        {
            attributes: [],
            children: [],
            empty: false,
            group: 'block',
        }
    ],
    [
        'h3',
        {
            attributes: [],
            children: [],
            empty: false,
            group: 'block',
        }
    ],
    [
        'i',
        {
            attributes: [],
            children: [],
            empty: false,
            group: 'text',
        }
    ],
    [
        'iframe',
        {
            attributes: ['allowfullscreen', 'height', 'src', 'width'],
            children: [],
            empty: false,
            group: 'media',
        }
    ],
    [
        'img',
        {
            attributes: ['alt', 'height', 'src', 'width'],
            children: [],
            empty: true,
            group: 'media',
        }
    ],
    [
        'li',
        {
            attributes: [],
            children: ['a', 'br', 'i', 'mark', 'strong'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'mark',
        {
            attributes: [],
            children: [],
            empty: false,
            group: 'text',
        }
    ],
    [
        'ol',
        {
            attributes: [],
            children: ['li'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'p',
        {
            attributes: [],
            children: ['a', 'br', 'i', 'mark', 'strong'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'strong',
        {
            attributes: [],
            children: [],
            empty: false,
            group: 'text',
        }
    ],
    [
        'summary',
        {
            attributes: [],
            children: [],
            empty: false,
            group: 'block',
        }
    ],
    [
        'table',
        {
            attributes: [],
            children: ['tbody', 'tfoot', 'thead'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'tbody',
        {
            attributes: [],
            children: ['tr'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'td',
        {
            attributes: [],
            children: ['a', 'br', 'i', 'mark', 'strong'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'tfoot',
        {
            attributes: [],
            children: ['tr'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'th',
        {
            attributes: [],
            children: ['a', 'br', 'i', 'mark', 'strong'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'thead', {
            attributes: [],
            children: ['tr'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'tr',
        {
            attributes: [],
            children: ['td', 'th'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'ul',
        {
            attributes: [],
            children: ['li'],
            empty: false,
            group: 'block',
        }
    ],
    [
        'video',
        {
            attributes: ['controls', 'height', 'src', 'width'],
            children: [],
            empty: false,
            group: 'media',
        }
    ],
];

export default cfg;
