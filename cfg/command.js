import AudioElement from '../src/audio/AudioElement.js';
import BlockquoteElement from '../src/blockquote/BlockquoteElement.js';
import Command from '../src/editor/Command.js';
import DetailsElement from '../src/details/DetailsElement.js';
import Element from '../src/editor/Element.js';
import IframeElement from '../src/iframe/IframeElement.js';
import ImageElement from '../src/image/ImageElement.js';
import LinkCommand from '../src/link/LinkCommand.js';
import ListElement from '../src/list/ListElement.js';
import TableElement from '../src/table/TableElement.js';
import VideoElement from '../src/video/VideoElement.js';

/**
 * Commands configuration
 *
 * @type {Function[]}
 */
export default [
    editor => new Command(editor, 'bold', new Element(editor, 'strong')),
    editor => new Command(editor, 'italic', new Element(editor, 'i')),
    editor => new Command(editor, 'definition', new Element(editor, 'dfn')),
    editor => new Command(editor, 'quote', new Element(editor, 'q')),
    editor => new Command(editor, 'cite', new Element(editor, 'cite')),
    editor => new Command(editor, 'mark', new Element(editor, 'mark')),
    editor => new Command(editor, 'keyboard', new Element(editor, 'kbd')),
    editor => new LinkCommand(editor),
    editor => new Command(editor, 'paragraph', new Element(editor, 'p')),
    editor => new Command(editor, 'heading', new Element(editor, 'h2')),
    editor => new Command(editor, 'subheading', new Element(editor, 'h3')),
    editor => new Command(editor, 'unorderedlist', new ListElement(editor, 'ul')),
    editor => new Command(editor, 'orderedlist', new ListElement(editor, 'ol')),
    editor => new Command(editor, 'blockquote', new BlockquoteElement(editor)),
    editor => new Command(editor, 'image', new ImageElement(editor)),
    editor => new Command(editor, 'video', new VideoElement(editor)),
    editor => new Command(editor, 'audio', new AudioElement(editor)),
    editor => new Command(editor, 'iframe', new IframeElement(editor)),
    editor => new Command(editor, 'table', new TableElement(editor)),
    editor => new Command(editor, 'details', new DetailsElement(editor)),
]
