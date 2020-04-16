import EditorObject from './EditorObject.js';

/**
 * Observer
 */
export default class Observer extends EditorObject {
    /**
     * Observes editor content mutatations
     *
     * @param {MutationRecord[]} ev
     */
    observe(ev) {
        throw 'Not implemented';
    }
}
