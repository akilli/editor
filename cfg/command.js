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
 * Commands configuration
 *
 * @type {Function[]}
 */
const data = [
    editor => new TextCommand(editor, 'bold', 'strong'),
    editor => new TextCommand(editor, 'italic', 'i'),
    editor => new TextCommand(editor, 'definition', 'dfn'),
    editor => new TextCommand(editor, 'quote', 'q'),
    editor => new TextCommand(editor, 'cite', 'cite'),
    editor => new TextCommand(editor, 'mark', 'mark'),
    editor => new TextCommand(editor, 'keyboard', 'kbd'),
    editor => new LinkCommand(editor, 'link'),
    editor => new ParagraphCommand(editor, 'paragraph'),
    editor => new HeadingCommand(editor, 'heading', 'h2'),
    editor => new HeadingCommand(editor, 'subheading', 'h3'),
    editor => new ListCommand(editor, 'unorderedlist', 'ul'),
    editor => new ListCommand(editor, 'orderedlist', 'ol'),
    editor => new BlockquoteCommand(editor, 'blockquote'),
    editor => new MediaCommand(editor, 'media'),
    editor => new TableCommand(editor, 'table'),
    editor => new DetailsCommand(editor, 'details'),
];

export default data;
