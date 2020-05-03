import AudioPlugin from '../audio/AudioPlugin.js';
import BaseEditor from '../base/Editor.js';
import BasePlugin from '../base/BasePlugin.js';
import BlockPlugin from '../block/BlockPlugin.js';
import BoldPlugin from '../bold/BoldPlugin.js';
import DetailsPlugin from '../details/DetailsPlugin.js';
import FullscreenPlugin from '../fullscreen/FullscreenPlugin.js';
import HeadingPlugin from '../heading/HeadingPlugin.js';
import IframePlugin from '../iframe/IframePlugin.js';
import ImagePlugin from '../image/ImagePlugin.js';
import ItalicPlugin from '../italic/ItalicPlugin.js';
import LinkPlugin from '../link/LinkPlugin.js';
import ListPlugin from '../list/ListPlugin.js';
import ParagraphPlugin from '../paragraph/ParagraphPlugin.js';
import QuotePlugin from '../quote/QuotePlugin.js';
import SubheadingPlugin from '../subheading/SubheadingPlugin.js';
import TablePlugin from '../table/TablePlugin.js';
import VideoPlugin from '../video/VideoPlugin.js';

/**
 * Editor
 */
export default class Editor extends BaseEditor {
    /**
     * @inheritDoc
     */
    static defaultConfig() {
        return {
            base: {
                converters: {
                    em: 'i',
                    strong: 'b',
                },
                plugins: [
                    BasePlugin,
                    AudioPlugin,
                    BlockPlugin,
                    BoldPlugin,
                    DetailsPlugin,
                    FullscreenPlugin,
                    HeadingPlugin,
                    IframePlugin,
                    ImagePlugin,
                    ItalicPlugin,
                    LinkPlugin,
                    ListPlugin,
                    ParagraphPlugin,
                    QuotePlugin,
                    SubheadingPlugin,
                    TablePlugin,
                    VideoPlugin,
                ],
                toolbar: [
                    'fullscreen',
                    'bold',
                    'italic',
                    'link',
                    'paragraph',
                    'heading',
                    'subheading',
                    'unorderedlist',
                    'orderedlist',
                    'quote',
                    'image',
                    'video',
                    'audio',
                    'iframe',
                    'table',
                    'details',
                    'block',
                ],
            },
        };
    }
}
