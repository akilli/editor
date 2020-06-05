import Audio from '../audio/Audio.js';
import BaseEditor from '../base/Editor.js';
import Base from '../base/Base.js';
import Block from '../block/Block.js';
import Bold from '../bold/Bold.js';
import Details from '../details/Details.js';
import Div from '../div/Div.js';
import Fullscreen from '../fullscreen/Fullscreen.js';
import Gallery from '../gallery/Gallery.js';
import Heading from '../heading/Heading.js';
import Iframe from '../iframe/Iframe.js';
import Image from '../image/Image.js';
import Italic from '../italic/Italic.js';
import Link from '../link/Link.js';
import Listitem from '../listitem/Listitem.js';
import Orderedlist from '../orderedlist/Orderedlist.js';
import Paragraph from '../paragraph/Paragraph.js';
import Quote from '../quote/Quote.js';
import Section from '../section/Section.js';
import Subheading from '../subheading/Subheading.js';
import Table from '../table/Table.js';
import Unorderedlist from '../unorderedlist/Unorderedlist.js';
import Video from '../video/Video.js';

/**
 * Editor
 */
export default class Editor extends BaseEditor {
    /**
     * @inheritDoc
     */
    static get defaultConfig() {
        return {
            base: {
                filter: {
                    em: 'i',
                    strong: 'b',
                },
                plugins: [
                    Base,
                    Audio,
                    Block,
                    Bold,
                    Details,
                    Div,
                    Fullscreen,
                    Gallery,
                    Heading,
                    Iframe,
                    Image,
                    Italic,
                    Link,
                    Listitem,
                    Orderedlist,
                    Paragraph,
                    Quote,
                    Section,
                    Subheading,
                    Table,
                    Unorderedlist,
                    Video,
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
                    'section',
                    'details',
                    'block',
                    'div',
                    'gallery',
                ],
            },
        };
    }
}
