'use strict';

function RTE(el) {
    const commands = {
        'src': (editor) => {
            editor.classList.toggle('rte-src');
        },
        'paragraph': () => {
            cmd('insertparagraph', null);
        },
        'h2': () => {
            cmd('formatblock', '<h2>');
        },
        'h3': () => {
            cmd('formatblock', '<h3>');
        },
        'bold': (editor, sel) => {
            insertHtml('strong', sel);
        },
        'italic': (editor, sel) => {
            insertHtml('i', sel);
        },
        'underline': () => {
            cmd('underline', null);
        },
        'clear': () => {
            cmd('removeformat', null);
        },
        'link': () => {
            let value;

            if (value = prompt('URL', 'http://')) {
                cmd('createlink', value);
            }
        },
        'unlink': () => {
            cmd('unlink', null);
        },
        'ol': () => {
            cmd('insertorderedlist', null);
        },
        'ul': () => {
            cmd('insertunorderedlist', null);
        },
        'quote': () => {
            cmd('formatblock', '<blockquote>');
        },
        'image': () => {
            const value = prompt('URL', 'http://');

            if (value) {
                cmd('insertimage', value);
            }
        }
    };

    const allowed = ['a', 'blockquote', 'br', 'div', 'h2', 'h3', 'i', 'img', 'li', 'ol', 'p', 'strong', 'u', 'ul'];

    function init(el) {
        let editor = el;

        if (el.nodeName.toLowerCase() === 'textarea') {
            editor = document.createElement('div');
            editor.innerHTML = decode(el.innerHTML);
            el.parentNode.appendChild(editor);
            el.setAttribute('hidden', 'hidden');

            const f = el.getAttribute('form'),
                form = f ? document.getElementById(f) : el.closest('form');

            form.addEventListener('submit', function () {
                el.innerHTML = trim(strip(decode(editor.innerHTML)));
            });

            toolbar(editor);
        } else {
            editor.addEventListener('focus', function () {
                toolbar(editor);
            });
        }

        editor.classList.add('rte');
        editor.setAttribute('contenteditable', 'true');
        editor.addEventListener('change', function () {
            let html = strip(decode(editor.innerHTML));
            editor.innerHTML = editor.classList.contains('rte-src') ? encode(html) : html;
        });
    }

    function toolbar(editor) {
        if (editor._initialized) {
            return;
        }

        const toolbar = document.createElement('div');
        toolbar.classList.add('rte-toolbar');

        for (let key in commands) {
            if (!commands.hasOwnProperty(key)) {
                continue;
            }

            const img = document.createElement('img');
            img.setAttribute('src', icon(key));
            img.setAttribute('alt', key);
            img.setAttribute('title', key);
            img.setAttribute('data-rte-cmd', key);
            img.addEventListener('click', function () {
                const sel = window.getSelection(),
                    callback = commands[this.getAttribute('data-rte-cmd')] || null;

                // Selection outside element or invalid key
                if (!sel.containsNode(editor, true) || !callback) {
                    return false;
                }

                // Callback
                callback(editor, sel);
                editor.dispatchEvent(new Event('change'));

                return false;
            });

            toolbar.appendChild(img);
        }

        editor.parentNode.insertBefore(toolbar, editor);
        editor._initialized = true;
    }

    function cmd(command, value) {
        try {
            document.execCommand(command, false, value);
        } catch (e) {
            console.log(e);
        }
    }

    function insertHtml(tag, sel) {
        const html = sel.toString();

        if (tag && html.length > 0) {
            cmd('insertHTML', '<' + tag + '>' + html + '</' + tag + '>');
        }
    }

    function icon(key) {
        return '/src/theme/icon/' + key + '.svg';
    }

    function trim(html) {
        return html ? html.trim().replace(/\s/g, ' ').replace(/^((<|&lt;)br\s*\/*(>|&gt;))+/gi, ' ').replace(/((<|&lt;)br\s*\/*(>|&gt;))+$/gi, ' ').trim() : '';
    }

    function encode(html) {
        return html ? html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : '';
    }

    function decode(html) {
        return html ? html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'") : '';
    }

    function strip(html) {
        if (!html) {
            return '';
        }

        return html.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, function ($0, $1) {
            return allowed.indexOf($1.toLowerCase()) > -1 ? $0 : '';
        });
    }

    init(el);

    return el;
}
