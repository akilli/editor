import BlockquoteCommand from '../src/command/BlockquoteCommand.js';
import DetailsCommand from '../src/command/DetailsCommand.js';
import HeadingCommand from '../src/command/HeadingCommand.js';
import LinkCommand from '../src/command/LinkCommand.js';
import ListCommand from '../src/command/ListCommand.js';
import MediaCommand from '../src/command/MediaCommand.js';
import ParagraphCommand from '../src/command/ParagraphCommand.js';
import TableCommand from '../src/command/TableCommand.js';
import TextFormatCommand from '../src/command/TextFormatCommand.js';

/**
 * Command configuration
 */
const data = [
    ['bold', editor => new TextFormatCommand(editor, 'strong')],
    ['italic', editor => new TextFormatCommand(editor, 'i')],
    ['definition', editor => new TextFormatCommand(editor, 'dfn')],
    ['quote', editor => new TextFormatCommand(editor, 'q')],
    ['cite', editor => new TextFormatCommand(editor, 'cite')],
    ['mark', editor => new TextFormatCommand(editor, 'mark')],
    ['keyboard', editor => new TextFormatCommand(editor, 'kbd')],
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
