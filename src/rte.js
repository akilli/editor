'use strict';

function RTE(el) {
    const tags = {
        'src': (editor) => {
            editor.classList.toggle('rte-src');
        },
        'undo': () => {
            cmd('undo', null);
        },
        'redo': () => {
            cmd('redo', null);
        },
        'remove': () => {
            cmd('removeformat', null);
        },
        'jl': () => {
            cmd('justifyleft', null);
        },
        'jc': () => {
            cmd('justifycenter', null);
        },
        'jr': () => {
            cmd('justifyright', null);
        },
        'jf': () => {
            cmd('justifyfull', null);
        },
        'b': () => {
            cmd('bold', null);
        },
        'i': () => {
            cmd('italic', null);
        },
        'u': () => {
            cmd('underline', null);
        },
        'small': (editor, sel) => {
            insertHtml('small', sel);
        },
        's': (editor, sel) => {
            insertHtml('s', sel);
        },
        'sup': () => {
            cmd('superscript', null);
        },
        'sub': () => {
            cmd('subscript', null);
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
        'img': () => {
            const value = prompt('URL', 'http://');

            if (value) {
                cmd('insertimage', value);
            }
        },
        'h1': () => {
            cmd('formatblock', '<h1>');
        },
        'h2': () => {
            cmd('formatblock', '<h2>');
        },
        'h3': () => {
            cmd('formatblock', '<h3>');
        },
        'h4': () => {
            cmd('formatblock', '<h4>');
        },
        'h5': () => {
            cmd('formatblock', '<h5>');
        },
        'h6': () => {
            cmd('formatblock', '<h6>');
        },
        'p': () => {
            cmd('insertparagraph', null);
        },
        'blockquote': () => {
            cmd('formatblock', '<blockquote>');
        },
        'ol': () => {
            cmd('insertorderedlist', null);
        },
        'ul': () => {
            cmd('insertunorderedlist', null);
        }
    };

    const allowed = ['a', 'b', 'blockquote', 'br', 'div', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'img', 'li', 'ol', 'p', 's', 'small', 'strong', 'sub', 'sup', 'u', 'ul'];

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

        for (let key in tags) {
            if (!tags.hasOwnProperty(key)) {
                continue;
            }

            const button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.setAttribute('data-rte-cmd', key);
            button.textContent = key;
            button.addEventListener('click', function () {
                const sel = window.getSelection(),
                    callback = tags[this.getAttribute('data-rte-cmd')] || null;

                // Selection outside element or invalid key
                if (!sel.containsNode(editor, true) || !callback) {
                    return false;
                }

                // Callback
                callback(editor, sel);
                editor.dispatchEvent(new Event('change'));

                return false;
            });

            toolbar.appendChild(button);
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
