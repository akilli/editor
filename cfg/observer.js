import DetailsObserver from '../src/observer/DetailsObserver.js';
import EditableObserver from '../src/observer/EditableObserver.js';
import FigureObserver from '../src/observer/FigureObserver.js';
import TableObserver from '../src/observer/TableObserver.js';
import WidgetObserver from '../src/observer/WidgetObserver.js';

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
