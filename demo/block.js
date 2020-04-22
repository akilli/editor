'use strict';

(function (document, window) {
    if (!window.opener) {
        console.error('window.opener undefined');
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('body > section[data-block]').forEach(item => item.addEventListener('click', () => {
            const id = item.getAttribute('data-block');
            item.removeAttribute('data-block');
            window.opener.postMessage({
                id: id,
                content: item.outerHTML,
            }, window.opener.origin);
        }));
    });
})(document, window);
