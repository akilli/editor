import BlockquoteCommand from '../src/command/BlockquoteCommand.js';
import DetailsCommand from '../src/command/DetailsCommand.js';
import HeadingCommand from '../src/command/HeadingCommand.js';
import LinkCommand from '../src/command/LinkCommand.js';
import ListCommand from '../src/command/ListCommand.js';
import MediaCommand from '../src/command/MediaCommand.js';
import ParagraphCommand from '../src/command/ParagraphCommand.js';
import TableCommand from '../src/command/TableCommand.js';
import TextCommand from '../src/command/TextCommand.js';

/**
 * Command configuration
 */
const data = [
    ['bold', editor => new TextCommand(editor, 'strong')],
    ['italic', editor => new TextCommand(editor, 'i')],
    ['definition', editor => new TextCommand(editor, 'dfn')],
    ['quote', editor => new TextCommand(editor, 'q')],
    ['cite', editor => new TextCommand(editor, 'cite')],
    ['mark', editor => new TextCommand(editor, 'mark')],
    ['keyboard', editor => new TextCommand(editor, 'kbd')],
    ['link', editor => new LinkCommand(editor)],
    ['paragraph', editor => new ParagraphCommand(editor)],
    ['heading', editor => new HeadingCommand(editor, 'h2')],
    ['subheading', editor => new HeadingCommand(editor, 'h3')],
    ['unorderedlist', editor => new ListCommand(editor, 'ul')],
    ['orderedlist', editor => new ListCommand(editor, 'ol')],
    ['blockquote', editor => new BlockquoteCommand(editor)],
    ['media', editor => new MediaCommand(editor)],
    ['table', editor => new TableCommand(editor)],
    ['details', editor => new DetailsCommand(editor)],
];

export default data;
