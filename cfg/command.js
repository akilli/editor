import BlockquoteCommand from '../src/command/BlockquoteCommand.js';
import DetailsCommand from '../src/command/DetailsCommand.js';
import FullscreenCommand from '../src/command/FullscreenCommand.js';
import HeadingCommand from '../src/command/HeadingCommand.js';
import LinkCommand from '../src/command/LinkCommand.js';
import ListCommand from '../src/command/ListCommand.js';
import MediaCommand from '../src/command/MediaCommand.js';
import ParagraphCommand from '../src/command/ParagraphCommand.js';
import TableCommand from '../src/command/TableCommand.js';
import TextCommand from '../src/editor/TextCommand.js';

/**
 * Commands configuration
 *
 * @type {Object.<String, Function>}
 */
export default {
    fullscreen: editor => new FullscreenCommand(editor),
    bold: editor => new TextCommand(editor, 'strong'),
    italic: editor => new TextCommand(editor, 'i'),
    definition: editor => new TextCommand(editor, 'dfn'),
    quote: editor => new TextCommand(editor, 'q'),
    cite: editor => new TextCommand(editor, 'cite'),
    mark: editor => new TextCommand(editor, 'mark'),
    keyboard: editor => new TextCommand(editor, 'kbd'),
    link: editor => new LinkCommand(editor),
    paragraph: editor => new ParagraphCommand(editor),
    heading: editor => new HeadingCommand(editor, 'h2'),
    subheading: editor => new HeadingCommand(editor, 'h3'),
    unorderedlist: editor => new ListCommand(editor, 'ul'),
    orderedlist: editor => new ListCommand(editor, 'ol'),
    blockquote: editor => new BlockquoteCommand(editor),
    image: editor => new MediaCommand(editor, 'img'),
    video: editor => new MediaCommand(editor, 'video'),
    audio: editor => new MediaCommand(editor, 'audio'),
    iframe: editor => new MediaCommand(editor, 'iframe'),
    table: editor => new TableCommand(editor),
    details: editor => new DetailsCommand(editor),
}
