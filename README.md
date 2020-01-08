# akilli editor

A minimal rich text editor.

## Note

As this project is in a early state, some planned features are not finished yet or still missing.

## Usage

You can add widgets from the `main toolbar` on top. Each widget has one or more editable elements that allow adding and maybe formatting text. The `editable toolbar` will appear when you select some text in an editable element that allows text formatting, p.e. paragraphs, list items, table cells. Be aware of the fact that current configuration p.e. does not allow nesting of text formatting elements.

After adding the first widget, you can also use the `Enter` key to add a new paragraph. Depending on the widget, this new paragraph will be created inside the widget itself or on top-level. Within lists, the `Enter` key will add a new list item.

You can reorder the widgets in the editor content by drag'n'drop. As `draggable` and `contenteditable` do not play nice with each other, drag'n'drop is disabled per default. If you doubleclick on a widget you can toggle `draggable` and `contenteditable` states. After dropping the widget the states are toggled automatically. Within `draggable` state you can also use `ArrowUp` and `ArrowDown` keys to move the content.

If a widget is focused, i.e. the widget element is the active element (`document.activeElement`), you can use the `Delete` key to delete the widget, unless the widget element is also `contenteditable` which is the case for simple widgets like `paragraph`, `heading` and `subheading`. For those you have to toggle to `draggable` state first before pressing the `Delete` key.

You can also use the `Backspace`key inside editables to delete the widget, if the editable is empty and is either the widget element itself or the main editable of the widget.

The table widget additionally allows to add and remove rows and columns before or after the currently focused table cell by combining the `Control` key (add) or `Alt` key (remove) with one of the arrow keys (`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`).

## Demo

https://akilli.github.io/editor/demo
