import { cache } from './util.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!window.opener) {
        console.error('window.opener undefined');
        document.body.innerHTML = '';
        return;
    }

    Array.from(document.getElementsByTagName('link')).forEach((item) => (item.href = cache(item.href)));
    Array.from(document.getElementsByTagName('script')).forEach((item) => (item.src = cache(item.src)));

    for (let element of document.body.children) {
        element.addEventListener('click', () => {
            const data = element.localName === 'section' ? block(element) : media(element);
            window.opener.postMessage(data, window.opener.origin);
        });
    }
});

/**
 * Returns block data
 *
 * @param {HTMLElement} element
 * @return {Object.<string, string>}
 */
function block(element) {
    const id = element.id;
    element.removeAttribute('id');

    return { id, content: element.outerHTML };
}

/**
 * Returns media data
 *
 * @param {HTMLElement} element
 * @return {Object.<string, string>}
 */
function media(element) {
    const media = element.firstElementChild;

    return {
        alt: media.getAttribute('alt'),
        height: media.getAttribute('height'),
        id: media.id,
        src: media.src,
        type: element.getAttribute('class'),
        width: media.getAttribute('width'),
    };
}
