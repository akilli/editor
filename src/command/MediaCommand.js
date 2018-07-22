import Command from './Command.js';

/**
 * Image Command
 */
export default class MediaCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        let url;

        if (!!this.editor.config.mediabrowser) {
            const feat = 'alwaysRaised=yes,dependent=yes,height=' + window.screen.height + ',location=no,menubar=no,' +
                'minimizable=no,modal=yes,resizable=yes,scrollbars=yes,toolbar=no,width=' + window.screen.width;
            const win = this.editor.window.open(this.editor.config.mediabrowser, 'mediabrowser', feat);

            this.editor.window.addEventListener('message', (ev) => {
                if (ev.origin === win.origin && ev.source === win && !!ev.data.src) {
                    this.editor.execute('insertHTML', '<img src="' + ev.data.src + '" alt="" />');
                    win.close();
                }
            }, false);
        } else if (url = this.editor.window.prompt('URL')) {
            this.editor.execute('insertHTML', '<img src="' + url + '" alt="" />');
        }
    }
}
