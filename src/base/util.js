/**
 * Compares to element names considering is attributes
 *
 * @param {String|HTMLElement} item
 * @param {String|HTMLElement} ref
 * @return {Boolean}
 */
function is(item, ref) {
    return item && ref && localName(item) === localName(ref);
}

/**
 * Returns element local name considering is attribute
 *
 * @param {String|HTMLElement} item
 * @return {String}
 */
function localName(item) {
    if (item instanceof HTMLElement) {
        return item.getAttribute('is') || item.localName;
    }

    if (!item || typeof item !== 'string') {
        throw 'Invalid argument';
    }

    return item;
}

export {
    is,
    localName,
};
