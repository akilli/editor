import DetailsObserver from '../src/observer/DetailsObserver.js';
import EditableObserver from '../src/observer/EditableObserver.js';
import FigureObserver from '../src/observer/FigureObserver.js';
import TableObserver from '../src/observer/TableObserver.js';
import WidgetObserver from '../src/observer/WidgetObserver.js';

/**
 * Observer configuration
 *
 * @type {Observer[]}
 */
export default [
    EditableObserver,
    DetailsObserver,
    FigureObserver,
    TableObserver,
    WidgetObserver,
]
