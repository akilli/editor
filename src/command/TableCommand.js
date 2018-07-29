import Command from './Command.js';

/**
 * Table Command
 */
export default class TableCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        let html = '';

        ['thead', 'tfoot', 'tbody'].forEach(part => {
            const cell = part === 'thead' ? 'th' : 'td';
            html += '<%part%><tr><%cell%></%cell%><%cell%></%cell%></tr></%part%>'.replace(/%part%/g, part).replace(/%cell%/g, cell);
        });

        html = '<figure class="table"><table>' + html + '</table><figcaption>Caption</figcaption></figure>';

        this.editor.execute('inserthtml', html);
    }
}
