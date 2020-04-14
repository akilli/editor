import AudioDialog from '../src/audio/AudioDialog.js';
import BrowserDialog from '../src/editor/BrowserDialog.js';
import IframeDialog from '../src/iframe/IframeDialog.js';
import ImageDialog from '../src/image/ImageDialog.js';
import LinkDialog from '../src/link/LinkDialog.js';
import TableDialog from '../src/table/TableDialog.js';
import VideoDialog from '../src/video/VideoDialog.js';

/**
 * Dialogs configuration
 *
 * @type {Function[]}
 */
export default [
    editor => editor.config.audio.browser ? new BrowserDialog(editor, 'audio') : new AudioDialog(editor, 'audio'),
    editor => editor.config.iframe.browser ? new BrowserDialog(editor, 'iframe') : new IframeDialog(editor, 'iframe'),
    editor => editor.config.image.browser ? new BrowserDialog(editor, 'image') : new ImageDialog(editor, 'image'),
    editor => new LinkDialog(editor, 'link'),
    editor => new TableDialog(editor, 'table'),
    editor => editor.config.video.browser ? new BrowserDialog(editor, 'video') : new VideoDialog(editor, 'video'),
]
