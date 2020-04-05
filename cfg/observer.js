import DetailsObserver from '../src/details/DetailsObserver.js';
import EditableObserver from '../src/editor/EditableObserver.js';
import FigureObserver from '../src/figure/FigureObserver.js';
import TableObserver from '../src/table/TableObserver.js';
import WidgetObserver from '../src/editor/WidgetObserver.js';

/**
 * Observer configuration
 *
 * @type {Function[]}
 */
export default [
    editor => new EditableObserver(editor, 'editable'),
    editor => new DetailsObserver(editor, 'details'),
    editor => new FigureObserver(editor, 'figure'),
    editor => new TableObserver(editor, 'table'),
    editor => new WidgetObserver(editor, 'widget'),
]
