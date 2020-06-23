# akilli editor

A HTML standards-compliant and dependency-free rich text editor.

## Note

As this project is in an early state, some planned features are yet not finished or still missing or exist, but are not well documented. And although most of the API is quite stable now, all versions prior to `v1.0.0` are prereleases and should be considered experimental. `v1.0.0` is the designated initial stable release.

Before `v1.0.0` you will also need a modern Browser to run the **src version** and also the **dist version**, because esbuild target for the **dist version** is currently set to `es2020`. 

For the initial stable release additional **dist versions** for older browsers might be provided, as well as individual npm packages for each plugin. 

## Info

The editor mostly consists of a toolbar and a content area. The toolbar contains the buttons to execute all configured commands. These can be commands to

- toggle the editor mode *[currently not used]*
- format the text inside an editable element, p.e. bold, italic, link or any other [text-level element](https://html.spec.whatwg.org/multipage/text-level-semantics.html)
- insert a widget into content area, p.e. paragraph, heading, lists, media elements, tables, sections and more

Each widgets itself usually consists of one or more editables that allow adding and maybe formatting text. The `Block` plugin is an exception to this, as it provides the possibility to add non-editable and optionally previewable placeholder blocks into the editor content that will later be somehow replaced by your application (p.e. a CMS).

The features of each element (p.e. like *alignable*, *deletable*, *editable*, *navigable*, *sortable*, etc) as well as the allowed attributes and child elements are configured by the tag configuration. Be aware of the fact that current default tag configuration p.e. does not allow nesting of text formatting elements.

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

The navigation within a table slightly differs due to the nature of table elements. You can use the `ArrowLeft`, `ArrowRight`, `Home` and `End` keys to navigate among the sibling cell elements if the `textContent` of the table cell is empty. In addition to that, use the `ArrowUp` and `ArrowDown` keys to navigate among the rows.

The table widget additionally allows adding and removing rows and columns before or after the currently focused table cell by combining the `Alt` key (*add*) or `Alt` and `Shift` keys (*remove*) with one of the arrow keys (`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`).

### Text-level elements

You can click on a text-level element (bold, italic, link, etc) to 

- open the corresponding dialog in case the elements allows attributes or 
- remove the format aka replace the element with its `textContent`.

Note that this feature is not fully implemented yet, as quite a lot of new plugins for text-level elements have been added. 

In addition to that, each text-level element registers a keyboard shortcut in the form `Alt` + `Shift` + a letter. If you hover a button for such a text-level element in the toolbar, the actual keyboard shortcut will be shown. 

## Demo

- **dist version:** https://akilli.github.io/editor/demo
- **src version:** https://akilli.github.io/editor/demo/src.html
