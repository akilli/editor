import Command from '../src/editor/Command.js';
import LinkCommand from '../src/link/LinkCommand.js';

/**
 * Commands configuration
 *
 * @type {Function[]}
 */
export default [
    editor => new Command(editor, 'bold'),
    editor => new Command(editor, 'italic'),
    editor => new Command(editor, 'mark'),
    editor => new Command(editor, 'keyboard'),
    editor => new LinkCommand(editor),
    editor => new Command(editor, 'paragraph'),
    editor => new Command(editor, 'heading'),
    editor => new Command(editor, 'subheading'),
    editor => new Command(editor, 'unorderedlist'),
    editor => new Command(editor, 'orderedlist'),
    editor => new Command(editor, 'blockquote'),
    editor => new Command(editor, 'image'),
    editor => new Command(editor, 'video'),
    editor => new Command(editor, 'audio'),
    editor => new Command(editor, 'iframe'),
    editor => new Command(editor, 'table'),
    editor => new Command(editor, 'details'),
]
