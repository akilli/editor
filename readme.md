![akilli editor](https://raw.githubusercontent.com/akilli/editor/master/demo/img/logo.svg?sanitize=true)

# akilli editor

A HTML standards-compliant and dependency-free rich text editor.

## Demo

https://akilli.github.io/editor/demo

## Development

Use the editor [source version](build/AkilliEditor.js) directly or the bundled and minified
[dist version](dist/editor.js) of it. If you use the source version all changes in the code take effect immediately,
whereas the dist version needs to be rebuild with

```
npm run build
```

The demo offers both versions and can be started with either

```
npm start
```

or

```
docker compose up -d
```

In both cases the demo is accessible at http://localhost:20000/demo/index.html

## Info

The editor consists of a main toolbar, a formatbar, a focusbar and a content area.

The focusbar contains the buttons to align, sort and delete a *focusable* element. Which buttons are shown depends on
the elements tag configuration (see below).

The formatbar contains the buttons to format the text inside an editable element, p.e. bold, italic, link or any
other [text-level element](https://html.spec.whatwg.org/multipage/text-level-semantics.html) and is hidden or shown
depending on the current selection.

The main toolbar contains the buttons to insert a widget into the content area, p.e. paragraph, heading, lists, media
elements, tables, sections and more.

Each widgets itself usually consists of one or more editables that allow adding and maybe formatting text. The `Block`
plugin is an exception to this, as it provides the possibility to add non-editable and optionally previewable
placeholder blocks into the editor content that will later be somehow replaced by your application (p.e. a CMS).

The features of each element (p.e. like *alignable*, *deletable*, *editable*, *focusable*, *navigable*, *sortable*, etc)
as well as the allowed attributes and child elements are configured by the tag configuration.

Be aware of the fact that nesting of text-level elements is deliberately disallowed by both the default tag
configuration and the `Editor.format()` method. If you are not happy with this restriction, adjust the tag configuration
and override the `format()` method in your `Editor` subclass.

## Features

### Toolbar navigation

Once a toolbar button is focused, use the `ArrowLeft`, `ArrowRight`, `Home` and `End` keys to navigate among the
buttons.

### Navigable elements

If one *navigable* element is focused, you can use the `ArrowUp`, `ArrowDown`, `Home` and `End` keys to navigate among
the sibling elements.

### `Enter` key handling

After adding the first widget into the content area, you can also use the `Enter` key to add a new one. In most cases
this will be a new paragraph. Depending on the widget, this new paragraph will be created inside the widget itself or on
top-level.

Within lists the `Enter` key will add a new list item. Within tables it's either a new row or new column, depending on
wheter a row or a column currently is focused.

### `Backspace` key handling

Certain editable elements like p. e. paragraphs and headings remove themselves if they contain no text and the
`Backspace` key is pressed. Other (pseudo) elements like p. e. table rows and colums do the same.

### Sortable elements

You can reorder *sortable* elements either by drag'n'drop or by keyboard shortcuts. Note that not all elements are
configured to be sortable, p.e. the *summary* element within the *details* widget will always be the first child
element.

You can move the *sortable* element before its previous or after its next sibling or to first or last position by
combining the `Control` key with one of the `ArrowUp`, `ArrowDown`, `Home` or `End` keys.

### Deletable elements

You can delete a *deletable* element by combining the `Control` key with the `Delete` key. Inside editable elements, you
can also use the `Backspace` key, if the editable is empty. Note that not all elements are configured to be deletable,
p.e. the *details* widget will not allow to delete the *summary* element unless it is the only child in which case
deleting the *summary* element will delete the whole *details* widget.

### Alignable elements

Figure widgets like blockquote, table or media elements allow changing alignment by adding or removing the CSS
class `left`, `center` or `right`. This is done by combining the `Shift` key with the `ArrowLeft` (`left`)
, `ArrowDown` (`center`) or `ArrowRight` (`right`) or `ArrowUp` (*removes CSS classes*) keys.

### Text-level elements

Each formatting command registers a keyboard shortcut in the form `Alt` + `Shift` + a letter. If you hover a formatbar
button for such a text-level element, the actual keyboard shortcut will be shown. Using such a shortcut will execute the
corresponding command.

In addition to that, you can also doubleclick on a text-level element to execute the corresponding command.

In both cases, executing the command will either open the corresponding dialog in case the elements allows attributes or
remove the formatting text-level element.

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
         * @see BrowserManager.#opts
         * @type {Object.<string, string>}
         */
        browser: {},

        /**
         * Converts one HTML element to another
         *
         * @see ContentFilter.#convert
         * @type {Object.<string, string>}
         */
        filter: {},

        /**
         * Language for i18n
         *
         * @see Plugin._i18n
         * @type {string|undefined}
         */
        lang: undefined,

        /**
         * Names of the built-in plugins to load or disable
         *
         * - if empty, all built-in plugins are loaded
         * - if not empty and `pluginsDisabled` is not set, only given plugins and their dependencies are loaded
         * - if not empty and `pluginsDisabled` is set, all given plugins are disabled that are no dependencies
         *
         * @see Editor.init
         * @see Editor.defaultConfig
         * @type {string[]}
         */
        plugins: [],

        /**
         * The state of this flag will affect the way the `plugins` array is used 
         *
         * @see Editor.init
         * @type {boolean}
         */
        pluginsDisabled: false,
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
         * @see AudioDialog.constructor
         * @type {string|undefined}
         */
        browser: undefined,
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
         * @see BlockListener.insertappblock
         * @type {string|undefined}
         */
        api: undefined,

        /**
         * URL to block browser
         *
         * If browser URL is provided, a block browser dialog is used to insert new block elements instead of the 
         * default block dialog that provides just a simple form to set the id attribute.
         *
         * @see BlockDialog.constructor
         * @type {string|undefined}
         */
        browser: undefined,

        /**
         * Comma-separated list of URLs to CSS files that should be included by the autonomous custom block element
         *
         * @see BlockListener.insertappblock
         * @type {string|undefined}
         */
        css: undefined,
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
         * @see IframeDialog.constructor
         * @type {string|undefined}
         */
        browser: undefined,
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
         * @see ImageDialog.constructor
         * @type {string|undefined}
         */
        browser: undefined,
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
         * @see VideoDialog.constructor
         * @type {string|undefined}
         */
        browser: undefined,
    },
};

document.addEventListener('DOMContentLoaded', () => {
    const rte = document.getElementById('rte');
    const editor = Editor.create(rte, config);
    console.log(editor);
});
```

## Browser integration

As described in the configuration options in above's *Usage* example, some plugins *(currently all media element plugins
and the block element plugin)* offer the possibilty to configure a browser URL. If browser URL is provided, a browser
window with that location will be opened instead of the simple form dialog used by default.

The editor does not provide a browser integration itself, but a simple and minimal API to integrate your own browser
implementation.

You can implement your browser as you wish, the only requirement is that your browser notifies the editor by posting a
message when an item is selected, p.e. for the image plugin something like

```js
window.opener.postMessage({
    alt: 'Alternative Text',// optional
    height: '300',// optional
    id: 'image-1', // optional, can be used as regular id attribute and/or p. e. a reference to the image in the DB
    src: '/url/to/media',// required
    width: '400',// optional
}, window.opener.origin);
```

The examples for the other browsers differ only in the keys the plugin considers:

- the iframe and video plugins require `src` and additionally accept `height`, `width` and `id`
- the audio plugin requires `src` and additionally accepts `id`
- the block plugin only requires and accepts `id`

You can also use this API for your own plugins and define the type and structure of the message to your likings, p.e.
use a simple string if you are only interested in one value, an object or an array.

Your browser implementation will receive existing values of the currently selected element as `URL.searchParams` if the
plugin supports updating already inserted elements. Currently neither the media element plugins nor the block element
plugin do.
