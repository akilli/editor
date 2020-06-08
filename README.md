# akilli editor

A HTML standards-compliant and dependency-free rich text editor.

## Note

As this project is in an early state, some planned features are not finished yet or still missing.

## Toolbar

The toolbar contains the buttons to execute all configured commands. These can be commands to

- toggle the editor mode, p.e. fullscreen
- format the text inside an editable element, p.e. bold, italic, link or any other [text-level element](https://html.spec.whatwg.org/multipage/text-level-semantics.html)
- insert a widget into content area, p.e. paragraph, heading, lists, media elements, tables, sections and more 

If one of the toolbar buttons is focused, you can use the arrow `ArrowLeft`, `ArrowRight`, `Home` and `End` keys to navigate among the buttons.

## Content Area

Each widget has one or more editable elements that allow adding and maybe formatting text. Be aware of the fact that current configuration p.e. does not allow nesting of text formatting elements.

After adding the first widget, you can also use the `Enter` key to add a new paragraph. Depending on the widget, this new paragraph will be created inside the widget itself or on top-level. Within lists, the `Enter` key will add a new list item.

You can reorder the widgets or elements inside a widget in the editor content either by drag'n'drop or by keyboard shortcuts. Note that not all elements are configured to be sortable, p.e. the *summary* element within the *details* widget will always be the first child element.

As `draggable` and `contenteditable` do not play nice with each other, drag'n'drop is disabled per default. If you doubleclick on a widget or sortable element you can toggle `draggable` and `contenteditable` states. After dropping the widget the states are toggled automatically.

If one of the widgets or element inside a widget is focused, you can use the arrow `ArrowUp`, `ArrowDown`, `Home` and `End` keys to navigate among the widgets.

You can move the focused widget or element inside a widget before its previous or after its next sibling or to first or last position by combining the `Control` key with one of the `ArrowUp`, `ArrowDown`, `Home` or `End` keys.

You can delete the focused widget or element inside a widget by combining the `Control` key with the `Delete` key. Inside editable elements, you can also use the `Backspace` key to delete a widget or element inside a widget, if the editable is empty. Note that not all elements are configured to be deletable, p.e. the *details* widget will not allow to delete the *summary* element unless it is the only child in which case deleting the *summary* element will delete the whole *details* widget.

Figure widgets like quote, table or media elements allow changing alignment by adding or removing the CSS class `left`, `center` or `right`. This is done by combining the `Shift` key with the `ArrowLeft` (`left`), `ArrowDown` (`center`) or `ArrowRight` (`right`) or `ArrowUp` (*removes CSS classes*) keys.

The table widget additionally allows adding and removing rows and columns before or after the currently focused table cell by combining the `Alt` key (*add*) or `Alt` and `Shift` keys (*remove*) with one of the arrow keys (`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`).

## Demo

https://akilli.github.io/editor/demo
