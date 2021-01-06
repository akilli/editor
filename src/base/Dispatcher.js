/**
 * Event Dispatcher
 */
export default class Dispatcher {
    /**
     * Managed element
     *
     * @type {HTMLElement}
     */
    #element;

    /**
     * Initializes a new event dispatcher
     *
     * @param {HTMLElement} element
     */
    constructor(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        this.#element = element;
        this.register(this.#observe.bind(this));
    }

    /**
     * Dispatches an event on managed element
     *
     * @param {String} type
     * @param {HTMLElement} element
     * @param {HTMLElement} target
     */
    dispatch(type, element, target) {
        if (!type || typeof type !== 'string' || !(element instanceof HTMLElement) || !(target instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        this.#element.dispatchEvent(new CustomEvent(type, {detail: {element: element, target: target}}));
    }

    /**
     * Registers a mutation observer on managed element
     *
     * @param {Function} call
     * @param {MutationObserverInit} [opts = {childList: true, subtree: true}]
     */
    register(call, opts = {childList: true, subtree: true}) {
        if (typeof call !== 'function') {
            throw 'Invalid argument';
        }

        const observer = new MutationObserver(call);
        observer.observe(this.#element, opts);
    }

    /**
     * Dispatches a mutation event on managed element
     *
     * @param {String} type
     * @param {Element} element
     * @param {Node} target
     */
    #dispatch(type, element, target) {
        if (element instanceof HTMLElement && target instanceof HTMLElement) {
            this.dispatch(type, element, target);
            this.dispatch(`${type}${element.localName.replace('-', '')}`, element, target);
        }
    }

    /**
     * Observes mutations on managed element
     *
     * @param {MutationRecord[]} records
     */
    #observe(records) {
        records.forEach(record => {
            record.addedNodes.forEach(element => {
                if (element instanceof HTMLElement) {
                    this.#dispatch('insert', element, record.target);
                    Array.from(element.getElementsByTagName('*')).forEach(item => this.#dispatch('insert', item, record.target));
                }
            });
            record.removedNodes.forEach(element => element instanceof HTMLElement && this.#dispatch('delete', element, record.target));
        });
    }
}
