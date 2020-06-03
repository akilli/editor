'use strict';

(function (document, window) {
    if (!window.opener) {
        console.error('window.opener undefined');
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('body > figure > audio, body > figure > iframe, body > figure > img, body > figure > video').forEach(item => {
            const figure = item.closest('figure');
            const caption = figure.querySelector(':scope > figcaption');
            const type = item.localName === 'img' ? 'image' : item.localName;
            figure.addEventListener('click', () => window.opener.postMessage({
                alt: item.getAttribute('alt'),
                caption: caption ? caption.innerHTML : null,
                src: item.src,
                type: type,
            }, window.opener.origin));

            if (window.location.hash && window.location.hash !== `#${type}`) {
                figure.parentElement.removeChild(figure);
            }
        });
    });
})(document, window);
