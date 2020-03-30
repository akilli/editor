import DetailsObserver from '../src/details/DetailsObserver.js';
import EditableObserver from '../src/editor/EditableObserver.js';
import FigureObserver from '../src/figure/FigureObserver.js';
import TableObserver from '../src/table/TableObserver.js';
import WidgetObserver from '../src/editor/WidgetObserver.js';

/**
 * Observer configuration
 *
 * @type {Object.<String, Observer>}
 */
export default {
    editable: editor => new EditableObserver(editor),
    details: editor => new DetailsObserver(editor),
    figure: editor => new FigureObserver(editor),
    table: editor => new TableObserver(editor),
    widget: editor => new WidgetObserver(editor),
}
