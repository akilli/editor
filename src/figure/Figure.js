import Base from '../base/Base.js';
import FigureFilter from './FigureFilter.js';
import FigureListener from './FigureListener.js';
import Plugin from '../base/Plugin.js';

/**
 * Figure Plugin
 */
export default class Figure extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'figure';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._tag({
            name: 'figure',
            group: 'figure',
            children: ['audio', 'caption', 'iframe', 'image', 'quote', 'table', 'video'],
            attributes: ['class'],
            alignable: true,
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this._tag({
            name: 'figcaption',
            group: 'caption',
            children: ['format'],
            editable: true,
            navigable: true,
            enter: 'p',
        });
        new FigureListener(this.editor);
        this.editor.filters.add(new FigureFilter(this.editor));
    }
}
