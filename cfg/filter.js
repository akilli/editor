import BrFilter from '../src/filter/BrFilter.js';
import ContentFilter from '../src/filter/ContentFilter.js';
import FigureFilter from '../src/filter/FigureFilter.js';
import TableFilter from '../src/filter/TableFilter.js';

/**
 * Filter configuration
 *
 * @type {Function[]}
 */
export default [
    ContentFilter,
    BrFilter,
    FigureFilter,
    TableFilter,
]
