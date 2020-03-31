import BlockquoteCommand from '../src/blockquote/BlockquoteCommand.js';
import Command from '../src/editor/Command.js';
import DetailsCommand from '../src/details/DetailsCommand.js';
import FullscreenCommand from '../src/fullscreen/FullscreenCommand.js';
import HeadingCommand from '../src/heading/HeadingCommand.js';
import LinkCommand from '../src/link/LinkCommand.js';
import ListCommand from '../src/list/ListCommand.js';
import MediaCommand from '../src/media/MediaCommand.js';
import TableCommand from '../src/table/TableCommand.js';

/**
 * Commands configuration
 *
 * @type {Object.<String, Function>}
 */
export default {
    fullscreen: editor => new FullscreenCommand(editor),
    bold: editor => new Command(editor, 'strong'),
    italic: editor => new Command(editor, 'i'),
    definition: editor => new Command(editor, 'dfn'),
    quote: editor => new Command(editor, 'q'),
    cite: editor => new Command(editor, 'cite'),
    mark: editor => new Command(editor, 'mark'),
    keyboard: editor => new Command(editor, 'kbd'),
    link: editor => new LinkCommand(editor),
    paragraph: editor => new Command(editor, 'p'),
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
