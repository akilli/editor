/**
 * Tag configuration
 *
 * @typedef {Object} CfgTag
 *
 * @property {string[]} attributes Allowed attributes
 * @property {string[]} children   Allowed groups of child elements
 * @property {boolean}  empty      Is empty element
 * @property {string}   group      Name of the tag group
 */
'use strict';

const cfg = [
    [
        '_root_',
        {
            attributes: [],
            children: ['details', 'figure', 'heading', 'list', 'paragraph'],
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
            children: ['paragraph'],
            empty: false,
            group: 'blockquote',
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
        'cite',
        {
            attributes: [],
            children: [],
            empty: false,
            group: 'text',
        }
    ],
    [
        'details',
        {
            attributes: [],
            children: ['figure', 'paragraph', 'summary'],
            empty: false,
            group: 'details',
        }
    ],
    [
        'dfn',
        {
            attributes: [],
            children: [],
            empty: false,
            group: 'text',
        }
    ],
    [
        'figcaption',
        {
            attributes: [],
            children: ['text'],
            empty: false,
            group: 'caption',
        }
    ],
    [
        'figure',
        {
            attributes: ['class'],
            children: ['blockquote', 'caption', 'media', 'table'],
            empty: false,
            group: 'figure',
        }
    ],
    [
        'h2',
        {
            attributes: [],
            children: [],
            empty: false,
            group: 'heading',
        }
    ],
    [
        'h3',
        {
            attributes: [],
            children: [],
            empty: false,
            group: 'heading',
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
            children: ['break', 'text'],
            empty: false,
            group: 'listitem',
        }
    ],
    [
        'kbd',
        {
            attributes: [],
            children: [],
            empty: false,
            group: 'text',
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
            children: ['listitem'],
            empty: false,
            group: 'list',
        }
    ],
    [
        'p',
        {
            attributes: [],
            children: ['break', 'text'],
            empty: false,
            group: 'paragraph',
        }
    ],
    [
        'q',
        {
            attributes: [],
            children: [],
            empty: false,
            group: 'text',
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
            group: 'summary',
        }
    ],
    [
        'table',
        {
            attributes: [],
            children: ['tablepart'],
            empty: false,
            group: 'table',
        }
    ],
    [
        'tbody',
        {
            attributes: [],
            children: ['tablerow'],
            empty: false,
            group: 'tablepart',
        }
    ],
    [
        'td',
        {
            attributes: [],
            children: ['break', 'text'],
            empty: false,
            group: 'tablecell',
        }
    ],
    [
        'tfoot',
        {
            attributes: [],
            children: ['tablerow'],
            empty: false,
            group: 'tablepart',
        }
    ],
    [
        'th',
        {
            attributes: [],
            children: ['break', 'text'],
            empty: false,
            group: 'tablecell',
        }
    ],
    [
        'thead', {
            attributes: [],
            children: ['tablerow'],
            empty: false,
            group: 'tablepart',
        }
    ],
    [
        'tr',
        {
            attributes: [],
            children: ['tablecell'],
            empty: false,
            group: 'tablerow',
        }
    ],
    [
        'ul',
        {
            attributes: [],
            children: ['listitem'],
            empty: false,
            group: 'list',
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
