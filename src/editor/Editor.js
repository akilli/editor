import AudioPlugin from '../audio/AudioPlugin.js';
import BaseEditor from '../base/Editor.js';
import BasePlugin from '../base/BasePlugin.js';
import BlockquotePlugin from '../blockquote/BlockquotePlugin.js';
import BoldPlugin from '../bold/BoldPlugin.js';
import DetailsPlugin from '../details/DetailsPlugin.js';
import FigurePlugin from '../figure/FigurePlugin.js';
import HeadingPlugin from '../heading/HeadingPlugin.js';
import IframePlugin from '../iframe/IframePlugin.js';
import ImagePlugin from '../image/ImagePlugin.js';
import ItalicPlugin from '../italic/ItalicPlugin.js';
import LinkPlugin from '../link/LinkPlugin.js';
import OrderedListPlugin from '../orderedlist/OrderedListPlugin.js';
import ParagraphPlugin from '../paragraph/ParagraphPlugin.js';
import SubheadingPlugin from '../subheading/SubheadingPlugin.js';
import TablePlugin from '../table/TablePlugin.js';
import UnorderedListPlugin from '../unorderedlist/UnorderedListPlugin.js';
import VideoPlugin from '../video/VideoPlugin.js';

/**
 * Editor
 */
export default class Editor extends BaseEditor {}

/**
 * Default configuration
 *
 * @type {Object.<String, Array>}
 */
Editor.defaultConfig = {
    base: {
        plugins: [
            AudioPlugin,
            BasePlugin,
            BlockquotePlugin,
            BoldPlugin,
            DetailsPlugin,
            FigurePlugin,
            HeadingPlugin,
            IframePlugin,
            ImagePlugin,
            ItalicPlugin,
            LinkPlugin,
            OrderedListPlugin,
            ParagraphPlugin,
            SubheadingPlugin,
            TablePlugin,
            UnorderedListPlugin,
            VideoPlugin,
        ],
        toolbar: [
            'bold',
            'italic',
            'link',
            'paragraph',
            'heading',
            'subheading',
            'unorderedlist',
            'orderedlist',
            'blockquote',
            'image',
            'video',
            'audio',
            'iframe',
            'table',
            'details',
        ],
    },
};
