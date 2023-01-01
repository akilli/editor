import Abbreviation from '../src/abbreviation/Abbreviation.js';
import Audio from '../src/audio/Audio.js';
import Base from '../src/base/Base.js';
import Block from '../src/block/Block.js';
import Blockquote from '../src/blockquote/Blockquote.js';
import Bold from '../src/bold/Bold.js';
import Cite from '../src/cite/Cite.js';
import Code from '../src/code/Code.js';
import Data from '../src/data/Data.js';
import Definition from '../src/definition/Definition.js';
import Deletion from '../src/deletion/Deletion.js';
import Details from '../src/details/Details.js';
import Division from '../src/division/Division.js';
import Emphasis from '../src/emphasis/Emphasis.js';
import Heading from '../src/heading/Heading.js';
import HorizontalRule from '../src/horizontalrule/HorizontalRule.js';
import I18n from '../src/i18n/I18n.js';
import Iframe from '../src/iframe/Iframe.js';
import Image from '../src/image/Image.js';
import Insertion from '../src/insertion/Insertion.js';
import Italic from '../src/italic/Italic.js';
import Keyboard from '../src/keyboard/Keyboard.js';
import Link from '../src/link/Link.js';
import Mark from '../src/mark/Mark.js';
import OrderedList from '../src/orderedlist/OrderedList.js';
import Paragraph from '../src/paragraph/Paragraph.js';
import Plugin from '../src/base/Plugin.js';
import Preformat from '../src/preformat/Preformat.js';
import Quote from '../src/quote/Quote.js';
import Sample from '../src/sample/Sample.js';
import Section from '../src/section/Section.js';
import Small from '../src/small/Small.js';
import Strikethrough from '../src/strikethrough/Strikethrough.js';
import Strong from '../src/strong/Strong.js';
import Subheading from '../src/subheading/Subheading.js';
import Subscript from '../src/subscript/Subscript.js';
import Superscript from '../src/superscript/Superscript.js';
import Table from '../src/table/Table.js';
import Time from '../src/time/Time.js';
import Underline from '../src/underline/Underline.js';
import UnorderedList from '../src/unorderedlist/UnorderedList.js';
import Variable from '../src/variable/Variable.js';
import Video from '../src/video/Video.js';
import assert from 'node:assert';

/**
 * @type {Plugin[]}
 */
const plugins = [
    Base,
    I18n,
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
];

/**
 * @param {Object} val
 * @return {boolean}
 */
function isObject(val) {
    return typeof val === 'object' && !Array.isArray(val) && val !== null;
}

/**
 * @param {function} test
 * @param {Editor} editor
 */
export default function (test, editor) {
    plugins.forEach((plugin) => {
        test(plugin.name + ' plugin test', () => assert.ok(new plugin(editor) instanceof Plugin, 'Invalid plugin'));
        test(plugin.name + ' plugin name test', () => {
            assert.equal(typeof plugin.name, 'string', 'Invalid type for name property');
            assert.ok(!!plugin.name, 'Empty name property');
        });
        test(plugin.name + ' plugin dependencies test', () =>
            assert.ok(Array.isArray(plugin?.dependencies), 'Invalid type for dependencies property')
        );
        test(plugin.name + ' plugin config test', () =>
            assert.ok(isObject(plugin?.config), 'Invalid type for config property')
        );
    });
}
