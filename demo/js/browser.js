'use strict';

(function (document, window, console) {
    if (!window.opener) {
        console.error('window.opener undefined');
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
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

        return { id: id, content: element.outerHTML };
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
})(document, window, console);
