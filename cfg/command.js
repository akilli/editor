import AudioElement from '../src/audio/AudioElement.js';
import BlockquoteElement from '../src/blockquote/BlockquoteElement.js';
import Command from '../src/editor/Command.js';
import DetailsElement from '../src/details/DetailsElement.js';
import FullscreenCommand from '../src/fullscreen/FullscreenCommand.js';
import Element from '../src/editor/Element.js';
import IframeElement from '../src/iframe/IframeElement.js';
import ImageElement from '../src/image/ImageElement.js';
import LinkCommand from '../src/link/LinkCommand.js';
import ListElement from '../src/list/ListElement.js';
import MediaDialog from '../src/media/MediaDialog.js';
import TableDialog from '../src/table/TableDialog.js';
import TableElement from '../src/table/TableElement.js';
import VideoElement from '../src/video/VideoElement.js';

/**
 * Commands configuration
 *
 * @type {Object.<String, Function>}
 */
export default {
    fullscreen: editor => new FullscreenCommand(editor),
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
    image: editor => new Command(editor, new ImageElement(editor), MediaDialog),
    video: editor => new Command(editor, new VideoElement(editor), MediaDialog),
    audio: editor => new Command(editor, new AudioElement(editor), MediaDialog),
    iframe: editor => new Command(editor, new IframeElement(editor), MediaDialog),
    table: editor => new Command(editor, new TableElement(editor), TableDialog),
    details: editor => new Command(editor, new DetailsElement(editor)),
}
