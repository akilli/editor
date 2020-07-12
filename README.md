# akilli editor

A HTML standards-compliant and dependency-free rich text editor.

## Demo

- **dist version (`es2020`):** https://akilli.github.io/editor/demo
- **legacy version (`es2017`):** https://akilli.github.io/editor/demo/legacy.html
- **src version:** https://akilli.github.io/editor/demo/src.html

## Info

The editor mostly consists of a main toolbar, a formats toolbar and a content area. 

The formats toolbar contains the buttons to format the text inside an editable element, p.e. bold, italic, link or any other [text-level element](https://html.spec.whatwg.org/multipage/text-level-semantics.html) and is hidden or shown depending on the current selection.

The main toolbar mostly contains the buttons to insert a widget into the content area, p.e. paragraph, heading, lists, media elements, tables, sections and more.

Each widgets itself usually consists of one or more editables that allow adding and maybe formatting text. The `Block` plugin is an exception to this, as it provides the possibility to add non-editable and optionally previewable placeholder blocks into the editor content that will later be somehow replaced by your application (p.e. a CMS).

The features of each element (p.e. like *alignable*, *deletable*, *editable*, *navigable*, *sortable*, etc) as well as the allowed attributes and child elements are configured by the tag configuration. 

Be aware of the fact that nesting of text-level elements is deliberately disallowed by both the default tag configuration and the `Editor.format()` method. If you are not happy with this restriction, adjust the tag configuration and override the `format()` method in your `Editor` subclass.

## Features

### Toolbar navigation

Once a toolbar button is focused, use the `ArrowLeft`, `ArrowRight`, `Home` and `End` keys to navigate among the buttons.

### Navigable elements

If one *navigable* element is focused, you can use the `ArrowUp`, `ArrowDown`, `Home` and `End` keys to navigate among the sibling elements.

### `Enter` key handling

After adding the first widget into the content area, you can also use the `Enter` key to add a new paragraph. Depending on the widget, this new paragraph will be created inside the widget itself or on top-level. Within lists, the `Enter` key will add a new list item.

### Sortable elements

You can reorder *sortable* elements either by drag'n'drop or by keyboard shortcuts. Note that not all elements are configured to be sortable, p.e. the *summary* element within the *details* widget will always be the first child element.

You can move the *sortable* element before its previous or after its next sibling or to first or last position by combining the `Control` key with one of the `ArrowUp`, `ArrowDown`, `Home` or `End` keys.

### Deletable elements

You can delete a *deletable* element by combining the `Control` key with the `Delete` key. Inside editable elements, you can also use the `Backspace` key, if the editable is empty. Note that not all elements are configured to be deletable, p.e. the *details* widget will not allow to delete the *summary* element unless it is the only child in which case deleting the *summary* element will delete the whole *details* widget.

### Alignable elements

Figure widgets like block quote, table or media elements allow changing alignment by adding or removing the CSS class `left`, `center` or `right`. This is done by combining the `Shift` key with the `ArrowLeft` (`left`), `ArrowDown` (`center`) or `ArrowRight` (`right`) or `ArrowUp` (*removes CSS classes*) keys.

### Table widget keyboard shortcuts

The keyboard shortcuts within a table slightly differ due to the nature of table elements. Navigating, sorting, adding and deleting shortcuts use the **arrow keys** `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`. Note that sorting, adding and deleting take the table section (`thead`, `tbody`, `tfoot`) into account.

To navigate among the cells and rows use one of the **arrow keys**.

To sort a table row/column combine the `Control` key with one of the **arrow keys**.

To add a new row/column before/after the currently focused table cell combine the `Alt` key with one of the **arrow keys**.

To delete the row/column before/after the currently focused table cell combine the `Alt` and `Shift` keys with one of the **arrow keys**.

### Text-level elements

Each text-level element registers a keyboard shortcut in the form `Alt` + `Shift` + a letter. If you hover a formats toolbar button for such a text-level element, the actual keyboard shortcut will be shown.

## Usage

```js
import Editor from './dist/editor.js';

/**
 * Configuration options
 */
const config = {
    /**
     * Base plugin
     */
    base: {
        /**
         * Overrides default browser dialog window options
         *
         * @see BrowserDialog.opts
         * @type {Object.<String, String>}
         */
        browser: {},

        /**
         * Converts one HTML element to another
         *
         * @see ContentFilter.__convert
         * @type {Object.<String, String>}
         */
        filter: {},

        /**
         * Language for i18n
         *
         * @see Plugin._i18n
         * @type {?String}
         */
        lang: null,

        /**
         * Names of the built-in plugins to load
         *
         * If empty, all built-in plugins are loaded, otherwise only those configured or their dependencies.
         *
         * @see Editor.init
         * @see Editor.defaultConfig
         * @type {String[]}
         */
        plugins: [],
    },

    /**
     * Audio plugin
     */
    audio: {
        /**
         * URL to audio browser
         *
         * If browser URL is provided, an audio browser dialog is used to insert new audio elements instead of the
         * default audio dialog that provides just a simple form to set the src attribute.
         *
         * @see Audio.init
         * @type {?String}
         */
        browser: null,
    },

    /**
     * Block plugin
     */
    block: {
        /**
         * URL to block API including the placeholder {id}, p.e. '/api/{id}.html'
         *
         * The placeholder {id} will be replaced by the value of the block element's id attribute and then a GET request
         * will be sent to the resulting URL, p.e. if the block API URL is configured to '/api/{id}.html' and the block 
         * element's id attribute is 1, an GET request is sent to '/api/1.html'. The block API must only return the HTML
         * content for the preview if the block with the requested ID exists.
         * 
         *
         * @see BlockListener.inserteditorblock
         * @type {?String}
         */
        api: null,

        /**
         * URL to block browser
         *
         * If browser URL is provided, a block browser dialog is used to insert new block elements instead of the
         * default block dialog that provides just a simple form to set the id attribute.
         *
         * @see Block.init
         * @type {?String}
         */
        browser: null,

        /**
         * Comma-separated list of URLs to CSS files that should be included by the autonomous custom block element
         *
         * @see BlockListener.inserteditorblock
         * @type {?String}
         */
        css: null,
    },

    /**
     * Iframe plugin
     */
    iframe: {
        /**
         * URL to iframe browser
         *
         * If browser URL is provided, an iframe browser dialog is used to insert new iframe elements instead of the
         * default iframe dialog that provides just a simple form to set the src, width and height attributes.
         *
         * @see Iframe.init
         * @type {?String}
         */
        browser: null,
    },

    /**
     * Image plugin
     */
    image: {
        /**
         * URL to image browser
         *
         * If browser URL is provided, an image browser dialog is used to insert new image elements instead of the
         * default image dialog that provides just a simple form to set the src, alt, width and height attributes.
         *
         * @see Image.init
         * @type {?String}
         */
        browser: null,
    },

    /**
     * Video plugin
     */
    video: {
        /**
         * URL to video browser
         *
         * If browser URL is provided, a video browser dialog is used to insert new video elements instead of the
         * default video dialog that provides just a simple form to set the src, width and height attributes.
         *
         * @see Video.init
         * @type {?String}
         */
        browser: null,
    },
};

document.addEventListener('DOMContentLoaded', () => {
    const rte = document.getElementById('rte');
    const editor = Editor.create(rte, config);
    console.log(editor);
});
```
