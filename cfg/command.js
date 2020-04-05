import BlockquoteElement from '../src/blockquote/BlockquoteElement.js';
import Command from '../src/editor/Command.js';
import DetailsElement from '../src/details/DetailsElement.js';
import Element from '../src/editor/Element.js';
import LinkCommand from '../src/link/LinkCommand.js';
import ListElement from '../src/list/ListElement.js';
import MediaElement from '../src/media/MediaElement.js';
import TableElement from '../src/table/TableElement.js';

/**
 * Commands configuration
 *
 * @type {Function[]}
 */
export default [
    editor => new Command(editor, 'bold', new Element(editor, 'bold', 'strong')),
    editor => new Command(editor, 'italic', new Element(editor, 'italic', 'i')),
    editor => new Command(editor, 'definition', new Element(editor, 'definition', 'dfn')),
    editor => new Command(editor, 'quote', new Element(editor, 'quote', 'q')),
    editor => new Command(editor, 'cite', new Element(editor, 'cite', 'cite')),
    editor => new Command(editor, 'mark', new Element(editor, 'mark', 'mark')),
    editor => new Command(editor, 'keyboard', new Element(editor, 'keyboard', 'kbd')),
    editor => new LinkCommand(editor),
    editor => new Command(editor, 'paragraph', new Element(editor, 'paragraph', 'p')),
    editor => new Command(editor, 'heading', new Element(editor, 'heading', 'h2')),
    editor => new Command(editor, 'subheading', new Element(editor, 'subheading', 'h3')),
    editor => new Command(editor, 'unorderedlist', new ListElement(editor, 'subheading', 'ul')),
    editor => new Command(editor, 'orderedlist', new ListElement(editor, 'orderedlist', 'ol')),
    editor => new Command(editor, 'blockquote', new BlockquoteElement(editor)),
    editor => new Command(editor, 'image', new MediaElement(editor, 'image', 'img')),
    editor => new Command(editor, 'video', new MediaElement(editor, 'video', 'video')),
    editor => new Command(editor, 'audio', new MediaElement(editor, 'audio', 'audio')),
    editor => new Command(editor, 'iframe', new MediaElement(editor, 'iframe', 'iframe')),
    editor => new Command(editor, 'table', new TableElement(editor)),
    editor => new Command(editor, 'details', new DetailsElement(editor)),
]
