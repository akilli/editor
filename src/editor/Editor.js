import AudioPlugin from '../audio/AudioPlugin.js';
import BaseEditor from '../base/Editor.js';
import BasePlugin from '../base/BasePlugin.js';
import BlockquotePlugin from '../blockquote/BlockquotePlugin.js';
import BoldPlugin from '../bold/BoldPlugin.js';
import DetailsPlugin from '../details/DetailsPlugin.js';
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
                    BlockquotePlugin,
                    BoldPlugin,
                    DetailsPlugin,
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
                tags: [
                    {name: 'root', group: 'root', children: ['details', 'figure', 'heading', 'list', 'paragraph']},
                    {name: 'p', group: 'paragraph', children: ['break', 'text'], editable: true, enter: 'p'},
                    {name: 'h2', group: 'heading', editable: true, enter: 'p'},
                    {name: 'h3', group: 'heading', editable: true, enter: 'p'},
                    {name: 'ul', group: 'list', children: ['listitem']},
                    {name: 'ol', group: 'list', children: ['listitem']},
                    {name: 'li', group: 'listitem', children: ['break', 'text'], editable: true, enter: 'li'},
                    {name: 'figure', group: 'figure', attributes: ['class'], children: ['blockquote', 'caption', 'media', 'table']},
                    {name: 'figcaption', group: 'caption', children: ['text'], editable: true, enter: 'p'},
                    {name: 'blockquote', group: 'blockquote', children: ['paragraph']},
                    {name: 'img', group: 'media', attributes: ['alt', 'height', 'src', 'width'], empty: true},
                    {name: 'video', group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true},
                    {name: 'audio', group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true},
                    {name: 'iframe', group: 'media', attributes: ['allowfullscreen', 'height', 'src', 'width'], empty: true},
                    {name: 'table', group: 'table', children: ['tablesection']},
                    {name: 'thead', group: 'tablesection', children: ['tablerow']},
                    {name: 'tbody', group: 'tablesection', children: ['tablerow']},
                    {name: 'tfoot', group: 'tablesection', children: ['tablerow']},
                    {name: 'tr', group: 'tablerow', children: ['tablecell']},
                    {name: 'th', group: 'tablecell', children: ['break', 'text'], editable: true, empty: true},
                    {name: 'td', group: 'tablecell', children: ['break', 'text'], editable: true, empty: true},
                    {name: 'details', group: 'details', children: ['figure', 'list', 'paragraph', 'summary']},
                    {name: 'summary', group: 'summary', editable: true, enter: 'p'},
                    {name: 'strong', group: 'text'},
                    {name: 'i', group: 'text'},
                    {name: 'a', group: 'text', attributes: ['href']},
                    {name: 'br', group: 'break', empty: true},
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
    }
}
