import DeleteObserver from '../src/observer/DeleteObserver.js';
import DisableDragObserver from '../src/observer/DisableDragObserver.js';
import DraggableObserver from '../src/observer/DraggableObserver.js';
import EditableObserver from '../src/observer/EditableObserver.js';
import FigureObserver from '../src/observer/FigureObserver.js';
import SummaryObserver from '../src/observer/SummaryObserver.js';
import TableObserver from '../src/observer/TableObserver.js';

/**
 * Observer configuration
 *
 * @type {Observer[]}
 */
export default [
    EditableObserver,
    SummaryObserver,
    DisableDragObserver,
    DraggableObserver,
    FigureObserver,
    TableObserver,
    DeleteObserver,
]
