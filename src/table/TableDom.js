import Dom from '../base/Dom.js';
import { Error, TagName } from '../base/enum.js';

/**
 * Table DOM Manager
 */
export default class TableDom {
    /**
     * DOM manager
     *
     * @type {Dom}
     */
    #dom;

    /**
     * Allows read access to DOM manager
     *
     * @return {Dom}
     */
    get dom() {
        return this.#dom;
    }

    /**
     * Initializes a new table DOM manager
     *
     * @param {Dom} dom
     */
    constructor(dom) {
        if (!(dom instanceof Dom)) {
            throw Error.INVALID_ARGUMENT;
        }

        this.#dom = dom;
    }

    /**
     * Creates table element
     *
     * @param {number} rows
     * @param {number} cols
     * @return {HTMLTableElement}
     */
    createTable(rows, cols) {
        if (!Number.isInteger(rows) || rows < 1 || !Number.isInteger(cols) || cols < 1) {
            throw Error.INVALID_ARGUMENT;
        }

        const table = this.dom.createElement(TagName.TABLE);
        const tbody = this.dom.createElement(TagName.TBODY);

        for (let i = 0; i < rows; i++) {
            const tr = this.dom.createElement(TagName.TR);
            tbody.appendChild(tr);

            for (let j = 0; j < cols; ++j) {
                tr.appendChild(this.dom.createElement(TagName.TD));
            }
        }

        table.appendChild(tbody);

        return table;
    }
}
