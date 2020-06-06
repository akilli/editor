import Base from '../base/Base.js';
import FigureFilter from './FigureFilter.js';
import FigureObserver from './FigureObserver.js';
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
        this.editor.tags.create({
            name: 'figure',
            group: 'figure',
            alignable: true,
            attributes: ['class'],
            children: ['audio', 'caption', 'figure', 'iframe', 'image', 'quote', 'table', 'video'],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.create({
            name: 'figcaption',
            group: 'caption',
            children: ['format'],
            editable: true,
            enter: 'p',
            navigable: true,
        });
        this.editor.observe(new FigureObserver(this.editor));
        this.editor.filters.add(new FigureFilter(this.editor));
    }
}