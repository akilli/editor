import AudioDialog from '../src/audio/AudioDialog.js';
import AudioElement from '../src/audio/AudioElement.js';
import BlockquoteElement from '../src/blockquote/BlockquoteElement.js';
import Command from '../src/editor/Command.js';
import DetailsElement from '../src/details/DetailsElement.js';
import Element from '../src/editor/Element.js';
import IframeDialog from '../src/iframe/IframeDialog.js';
import IframeElement from '../src/iframe/IframeElement.js';
import ImageDialog from '../src/image/ImageDialog.js';
import ImageElement from '../src/image/ImageElement.js';
import LinkCommand from '../src/link/LinkCommand.js';
import ListElement from '../src/list/ListElement.js';
import TableDialog from '../src/table/TableDialog.js';
import TableElement from '../src/table/TableElement.js';
import VideoDialog from '../src/video/VideoDialog.js';
import VideoElement from '../src/video/VideoElement.js';

/**
 * Commands configuration
 *
 * @type {Object.<String, Function>}
 */
export default {
    bold: editor => new Command(editor, new Element(editor, 'strong')),
    italic: editor => new Command(editor, new Element(editor, 'i')),
    definition: editor => new Command(editor, new Element(editor, 'dfn')),
    quote: editor => new Command(editor, new Element(editor, 'q')),
    cite: editor => new Command(editor, new Element(editor, 'cite')),
    mark: editor => new Command(editor, new Element(editor, 'mark')),
    keyboard: editor => new Command(editor, new Element(editor, 'kbd')),
    link: editor => new LinkCommand(editor),
    paragraph: editor => new Command(editor, new Element(editor, 'p')),
    heading: editor => new Command(editor, new Element(editor, 'h2')),
    subheading: editor => new Command(editor, new Element(editor, 'h3')),
    unorderedlist: editor => new Command(editor, new ListElement(editor, 'ul')),
    orderedlist: editor => new Command(editor, new ListElement(editor, 'ol')),
    blockquote: editor => new Command(editor, new BlockquoteElement(editor)),
    image: editor => new Command(editor, new ImageElement(editor), ImageDialog),
    video: editor => new Command(editor, new VideoElement(editor), VideoDialog),
    audio: editor => new Command(editor, new AudioElement(editor), AudioDialog),
    iframe: editor => new Command(editor, new IframeElement(editor), IframeDialog),
    table: editor => new Command(editor, new TableElement(editor), TableDialog),
    details: editor => new Command(editor, new DetailsElement(editor)),
}
