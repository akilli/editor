import DraggableObserver from '../src/observer/DraggableObserver.js';
import EditableObserver from '../src/observer/EditableObserver.js';
import FigureObserver from '../src/observer/FigureObserver.js';
import SummaryObserver from '../src/observer/SummaryObserver.js';
import WidgetObserver from '../src/observer/WidgetObserver.js';

/**
 * Observer configuration
 *
 * @type {Observer[]}
 */
export default [
    EditableObserver,
    SummaryObserver,
    DraggableObserver,
    FigureObserver,
    WidgetObserver,
]
