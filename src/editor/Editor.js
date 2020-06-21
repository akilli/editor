import Audio from '../audio/Audio.js';
import BaseEditor from '../base/Editor.js';
import Block from '../block/Block.js';
import Bold from '../bold/Bold.js';
import Details from '../details/Details.js';
import Division from '../division/Division.js';
import Heading from '../heading/Heading.js';
import Iframe from '../iframe/Iframe.js';
import Image from '../image/Image.js';
import Italic from '../italic/Italic.js';
import Link from '../link/Link.js';
import Mark from '../mark/Mark.js';
import OrderedList from '../orderedlist/OrderedList.js';
import Paragraph from '../paragraph/Paragraph.js';
import Quote from '../quote/Quote.js';
import Section from '../section/Section.js';
import Strikethrough from '../strikethrough/Strikethrough.js';
import Subheading from '../subheading/Subheading.js';
import Table from '../table/Table.js';
import Underline from '../underline/Underline.js';
import UnorderedList from '../unorderedlist/UnorderedList.js';
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
                    Audio,
                    Block,
                    Bold,
                    Details,
                    Division,
                    Heading,
                    Iframe,
                    Image,
                    Italic,
                    Link,
                    Mark,
                    OrderedList,
                    Paragraph,
                    Quote,
                    Section,
                    Strikethrough,
                    Subheading,
                    Table,
                    Underline,
                    UnorderedList,
                    Video,
                ],
            },
        };
    }
}
