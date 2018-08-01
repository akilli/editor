/**
 * Media Browser
 */
export default class MediaBrowser {
    /**
     * Opens a media browser window and registers a listener for communication between editor and browser windows
     *
     * @param {Window} window
     * @param {String} url
     * @param {Function} callback
     */
    static open(window, url, callback) {
        if (!url || typeof callback !== 'function') {
            return;
        }

        const feat = 'alwaysRaised=yes,dependent=yes,height=' + window.screen.height + ',location=no,menubar=no,' +
            'minimizable=no,modal=yes,resizable=yes,scrollbars=yes,toolbar=no,width=' + window.screen.width;
        const document = window.document;
        const win = window.open(url, 'mediabrowser', feat);
        let origin;

        try {
            origin = win.origin;
        } catch (e) {
            window.console.log(e);
            const a = document.createElement('a');
            a.href = url;
            origin = a.origin;
        }

        window.addEventListener('message', (ev) => {
            if (ev.origin === origin && ev.source === win) {
                callback(ev.data);
                win.close();
            }
        }, false);
    }
}
