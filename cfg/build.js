import AudioPlugin from '../src/audio/AudioPlugin.js';
import BasePlugin from '../src/base/BasePlugin.js';
import BlockquotePlugin from '../src/blockquote/BlockquotePlugin.js';
import BoldPlugin from '../src/bold/BoldPlugin.js';
import DetailsPlugin from '../src/details/DetailsPlugin.js';
import FigurePlugin from '../src/figure/FigurePlugin.js';
import HeadingPlugin from '../src/heading/HeadingPlugin.js';
import IframePlugin from '../src/iframe/IframePlugin.js';
import ImagePlugin from '../src/image/ImagePlugin.js';
import ItalicPlugin from '../src/italic/ItalicPlugin.js';
import LinkPlugin from '../src/link/LinkPlugin.js';
import OrderedListPlugin from '../src/orderedlist/OrderedListPlugin.js';
import ParagraphPlugin from '../src/paragraph/ParagraphPlugin.js';
import SubheadingPlugin from '../src/subheading/SubheadingPlugin.js';
import TablePlugin from '../src/table/TablePlugin.js';
import UnorderedListPlugin from '../src/unorderedlist/UnorderedListPlugin.js';
import VideoPlugin from '../src/video/VideoPlugin.js';

/**
 * Editor configuration
 *
 * @type {Object.<String, Array>}
 */
export default {
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
}
