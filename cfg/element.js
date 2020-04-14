import BlockquoteElement from '../src/blockquote/BlockquoteElement.js';
import DetailsElement from '../src/details/DetailsElement.js';
import Element from '../src/editor/Element.js';
import ListElement from '../src/list/ListElement.js';
import MediaElement from '../src/media/MediaElement.js';
import TableElement from '../src/table/TableElement.js';

/**
 * Element configuration
 *
 * @type {Function[]}
 */
export default [
    editor => new Element(editor, 'bold', 'strong'),
    editor => new Element(editor, 'italic', 'i'),
    editor => new Element(editor, 'mark', 'mark'),
    editor => new Element(editor, 'keyboard', 'kbd'),
    editor => new Element(editor, 'link', 'a'),
    editor => new Element(editor, 'paragraph', 'p'),
    editor => new Element(editor, 'heading', 'h2'),
    editor => new Element(editor, 'subheading', 'h3'),
    editor => new ListElement(editor, 'subheading', 'ul'),
    editor => new ListElement(editor, 'orderedlist', 'ol'),
    editor => new BlockquoteElement(editor),
    editor => new MediaElement(editor, 'image', 'img'),
    editor => new MediaElement(editor, 'video', 'video'),
    editor => new MediaElement(editor, 'audio', 'audio'),
    editor => new MediaElement(editor, 'iframe', 'iframe'),
    editor => new TableElement(editor),
    editor => new DetailsElement(editor),
]
