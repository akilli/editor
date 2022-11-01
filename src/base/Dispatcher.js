import TagName from './TagName.js';
import { isFunction, isOptHtml, isString } from './util.js';

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
            throw new TypeError('Invalid argument');
        }

        this.#element = element;
        this.register(this.#observe.bind(this));
    }

    /**
     * Dispatches an event on managed element
     *
     * @param {string} type
     * @param {HTMLElement|undefined} [element = undefined]
     * @param {HTMLElement|undefined} [target = undefined]
     * @return {void}
     */
    dispatch(type, element = undefined, target = undefined) {
        if (!isString(type) || !isOptHtml(element) || !isOptHtml(target)) {
            throw new TypeError('Invalid argument');
        }

        this.#element.dispatchEvent(new CustomEvent(type, { detail: { element, target } }));
    }

    /**
     * Registers a mutation observer on managed element
     *
     * @param {function} call
     * @param {MutationObserverInit} [opts = {childList: true, subtree: true}]
     * @return {void}
     */
    register(call, opts = { childList: true, subtree: true }) {
        if (!isFunction(call)) {
            throw new TypeError('Invalid argument');
        }

        const observer = new MutationObserver(call);
        observer.observe(this.#element, opts);
    }

    /**
     * Dispatches a mutation event on managed element
     *
     * @param {string} type
     * @param {Element} element
     * @param {Node} target
     * @return {void}
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
     * @return {void}
     */
    #observe(records) {
        records.forEach(record => {
            record.addedNodes.forEach(element => {
                if (element instanceof HTMLElement) {
                    this.#dispatch('insert', element, record.target);
                    Array.from(element.getElementsByTagName(TagName.ALL)).forEach(item =>
                        this.#dispatch('insert', item, record.target),
                    );
                }
            });
            record.removedNodes.forEach(element =>
                element instanceof HTMLElement && this.#dispatch('delete', element, record.target),
            );
        });
    }
}
