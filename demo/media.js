'use strict';

(function (document, window) {
    if (!window.opener) {
        window.console.error('window.opener undefined');
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        Array.from(document.getElementsByTagName('figure')).forEach(figure => {
            const media = figure.firstElementChild;
            const type = media.localName === 'img' ? 'image' : media.localName;
            figure.addEventListener('click', () => window.opener.postMessage({
                alt: media.getAttribute('alt'),
                caption: figure.lastElementChild.innerHTML,
                src: media.src,
                type: type,
            }, window.opener.origin));

            if (window.location.hash && window.location.hash !== `#${type}`) {
                figure.parentElement.removeChild(figure);
            }
        });
    });
})(document, window);
