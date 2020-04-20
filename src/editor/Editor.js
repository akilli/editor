import AudioPlugin from '../audio/AudioPlugin.js';
import BaseEditor from '../base/Editor.js';
import BasePlugin from '../base/BasePlugin.js';
import DetailsPlugin from '../details/DetailsPlugin.js';
import HeadingPlugin from '../heading/HeadingPlugin.js';
import IframePlugin from '../iframe/IframePlugin.js';
import ImagePlugin from '../image/ImagePlugin.js';
import LinkPlugin from '../link/LinkPlugin.js';
import ListPlugin from '../list/ListPlugin.js';
import ParagraphPlugin from '../paragraph/ParagraphPlugin.js';
import QuotePlugin from '../quote/QuotePlugin.js';
import TablePlugin from '../table/TablePlugin.js';
import TextPlugin from '../text/TextPlugin.js';
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
                plugins: [
                    BasePlugin,
                    AudioPlugin,
                    DetailsPlugin,
                    HeadingPlugin,
                    IframePlugin,
                    ImagePlugin,
                    LinkPlugin,
                    ListPlugin,
                    ParagraphPlugin,
                    QuotePlugin,
                    TablePlugin,
                    TextPlugin,
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
                    'quote',
                    'image',
                    'video',
                    'audio',
                    'iframe',
                    'table',
                    'details',
                ],
            },
        };
    }
}
