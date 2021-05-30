import Abbreviation from '../abbreviation/Abbreviation.js';
import Align from '../align/Align.js';
import Audio from '../audio/Audio.js';
import BaseEditor from '../base/Editor.js';
import Block from '../block/Block.js';
import Blockquote from '../blockquote/Blockquote.js';
import Bold from '../bold/Bold.js';
import Cite from '../cite/Cite.js';
import Code from '../code/Code.js';
import Data from '../data/Data.js';
import Definition from '../definition/Definition.js';
import Delete from '../delete/Delete.js';
import Deletion from '../deletion/Deletion.js';
import Details from '../details/Details.js';
import Division from '../division/Division.js';
import Emphasis from '../emphasis/Emphasis.js';
import Heading from '../heading/Heading.js';
import HorizontalRule from '../horizontalrule/HorizontalRule.js';
import Iframe from '../iframe/Iframe.js';
import Image from '../image/Image.js';
import Insertion from '../insertion/Insertion.js';
import Italic from '../italic/Italic.js';
import Keyboard from '../keyboard/Keyboard.js';
import Link from '../link/Link.js';
import Mark from '../mark/Mark.js';
import OrderedList from '../orderedlist/OrderedList.js';
import Paragraph from '../paragraph/Paragraph.js';
import Preformat from '../preformat/Preformat.js';
import Quote from '../quote/Quote.js';
import Sample from '../sample/Sample.js';
import Section from '../section/Section.js';
import Small from '../small/Small.js';
import Sort from '../sort/Sort.js';
import Strikethrough from '../strikethrough/Strikethrough.js';
import Strong from '../strong/Strong.js';
import Subheading from '../subheading/Subheading.js';
import Subscript from '../subscript/Subscript.js';
import Superscript from '../superscript/Superscript.js';
import Table from '../table/Table.js';
import Time from '../time/Time.js';
import Underline from '../underline/Underline.js';
import UnorderedList from '../unorderedlist/UnorderedList.js';
import Variable from '../variable/Variable.js';
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
                plugins: [
                    Bold,
                    Italic,
                    Strong,
                    Emphasis,
                    Underline,
                    Strikethrough,
                    Link,
                    Mark,
                    Small,
                    Definition,
                    Abbreviation,
                    Quote,
                    Cite,
                    Code,
                    Keyboard,
                    Sample,
                    Variable,
                    Subscript,
                    Superscript,
                    Time,
                    Data,
                    Insertion,
                    Deletion,
                    Paragraph,
                    Heading,
                    Subheading,
                    UnorderedList,
                    OrderedList,
                    HorizontalRule,
                    Blockquote,
                    Image,
                    Video,
                    Audio,
                    Iframe,
                    Table,
                    Preformat,
                    Section,
                    Details,
                    Division,
                    Block,
                    Align,
                    Sort,
                    Delete,
                ],
            },
        };
    }
}
