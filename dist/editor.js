class e{constructor(e){if(!(e instanceof n))throw"Invalid argument";this.editor=e}observe(e){throw"Not implemented"}}class t{constructor(e,t){if(!(e instanceof n&&t&&"string"==typeof t))throw"Invalid argument";this.editor=e,this.name=t}init(){throw"Not implemented"}}class i{constructor({name:e,group:t,attributes:i=[],children:n=[],editable:s=!1,empty:r=!1,enter:a=null}={}){if(!e||"string"!=typeof e||!t||"string"!=typeof t)throw"Invalid argument";this.name=e,this.group=t,this.children=Array.isArray(n)?n:[],this.attributes=Array.isArray(i)?i:[],this.editable=Boolean(s),this.empty=Boolean(r),this.enter=a&&"string"==typeof a?a:null}}class n{constructor(e,t={}){if(!(e instanceof HTMLElement))throw"No HTML element";for(let[e,i]of Object.entries(this.constructor.defaultConfig||{}))t[e]=Object.assign(t[e]||{},i);this.orig=e,this.document=this.orig.ownerDocument,this.window=this.document.defaultView,this.origin=this.window.origin||this.window.location.origin,this.element=this.createElement("div",{class:"editor"}),this.content=this.createElement("div",{class:"editor-content"}),this.toolbar=this.createElement("div",{class:"editor-toolbar"}),this.orig.hidden=!0,this.orig.insertAdjacentElement("afterend",this.element),this.element.appendChild(this.toolbar),this.element.appendChild(this.content),this.config=t,this.translators=new Map,this.tags=this.mapTags(this.config.base.tags||[]),this.elements=new Map,this.converters=new Map,this.filters=new Map,this.dialogs=new Map,this.commands=new Map,this.plugins=new Map}mapTags(e){const t=new Map;return e.forEach(e=>{const n=new i(e);t.set(n.name,n)}),t}init(){this.initPlugin(),this.initContent(),this.initToolbar()}initPlugin(){Array.isArray(this.config.base.plugins)&&this.config.base.plugins.forEach(e=>{if(!(e instanceof t.constructor))throw"Invalid argument";const i=new e(this);this.plugins.set(i.name,i)}),this.plugins.forEach(e=>e.init())}initContent(){this.orig instanceof HTMLTextAreaElement?(this.content.innerHTML=this.orig.value.replace("/&nbsp;/g"," "),this.orig.form.addEventListener("submit",()=>this.save())):this.content.innerHTML=this.orig.innerHTML,this.filter(this.content)}initToolbar(){Array.isArray(this.config.base.toolbar)&&this.config.base.toolbar.forEach(e=>{if(!this.commands.has(e))throw"Invalid argument";const t=this.createElement("button",{type:"button","data-cmd":e,title:e},e);t.addEventListener("click",()=>{this.window.getSelection().containsNode(this.content,!0)||this.content.focus(),this.commands.get(e).execute()}),this.toolbar.appendChild(t)})}getData(){const e=this.content.cloneNode(!0);return this.filter(e,!0),e.innerHTML}save(){this.orig instanceof HTMLTextAreaElement?this.orig.value=this.getData():this.orig.innerHTML=this.getData()}insert(e){let t;if(!(e instanceof HTMLElement&&(t=this.tags.get(e.tagName.toLowerCase()))))throw"Invalid HTML element";"text"===t.group?this.formatText(e):this.insertWidget(e)}insertWidget(e){if(!(e instanceof HTMLElement))throw"Invalid HTML element";if(!this.allowed(e.tagName.toLowerCase(),"root"))throw"Element is not allowed here";this.content.appendChild(e)}insertText(e){this.document.execCommand("inserttext",!1,e)}formatText(e){if(!(e instanceof HTMLElement))throw"Invalid HTML element";const t=this.window.getSelection(),i=t.anchorNode instanceof Text?t.anchorNode.parentElement:t.anchorNode,n=this.getSelectedEditable();if(t.isCollapsed||!t.toString().trim()||!(i instanceof HTMLElement)||!n)return;const s=t.getRangeAt(0),r=this.tags.get(i.tagName.toLowerCase()),a=r&&"text"!==r.group?i:i.parentElement;s.startContainer instanceof Text&&!s.startContainer.parentElement.isSameNode(a)&&s.setStartBefore(s.startContainer.parentElement),s.endContainer instanceof Text&&!s.endContainer.parentElement.isSameNode(a)&&s.setEndAfter(s.endContainer.parentElement);const o=s.toString(),l=s.cloneContents().childNodes;let d=Array.from(l).every(t=>t instanceof Text&&!t.textContent.trim()||t instanceof HTMLElement&&t.tagName===e.tagName);s.deleteContents(),!(a.isContentEditable&&this.allowed(e.tagName.toLowerCase(),a.tagName.toLowerCase())&&o.trim())||r&&d?s.insertNode(this.createText(o)):(e.textContent=o,s.insertNode(e)),a.normalize()}createElement(e,t={},i=""){const n=this.document.createElement(e);n.innerHTML=i;for(let[e,i]of Object.entries(t))i&&n.setAttribute(e,""+i);return n}createText(e){return this.document.createTextNode(e)}getSelectedElement(){const e=this.window.getSelection(),t=e.anchorNode instanceof Text?e.anchorNode.parentElement:e.anchorNode,i=e.focusNode instanceof Text?e.focusNode.parentElement:e.focusNode;return t instanceof HTMLElement&&i instanceof HTMLElement&&t.isSameNode(i)&&this.content.contains(t)?t:null}getSelectedEditable(){const e=this.window.getSelection(),t=e.anchorNode instanceof Text?e.anchorNode.parentElement:e.anchorNode,i=e.focusNode instanceof Text?e.focusNode.parentElement:e.focusNode;if(t instanceof HTMLElement&&i instanceof HTMLElement){const e=t.closest("[contenteditable=true]"),n=i.closest("[contenteditable=true]");if(e instanceof HTMLElement&&n instanceof HTMLElement&&e.isSameNode(n)&&this.content.contains(e))return e}return null}getSelectedWidget(){const e=this.getSelectedElement();return e?e.closest("div.editor-content > *"):null}focusEnd(e){if(!(e instanceof HTMLElement))throw"No HTML element";const t=this.document.createRange(),i=this.window.getSelection();e.focus(),t.selectNodeContents(e),t.collapse(),i.removeAllRanges(),i.addRange(t)}observe(t,i={childList:!0,subtree:!0}){if(!(t instanceof e))throw"Invalid argument";new MutationObserver(e=>t.observe(e)).observe(this.content,i)}filter(e,t=!1){if(!(e instanceof HTMLElement))throw"No HTML element";const i=t||this.content.isSameNode(e),n=t?"root":this.getTagName(e);e.normalize(),Array.from(e.childNodes).forEach(t=>{if(t instanceof HTMLElement&&(t=this.convert(t)),t instanceof HTMLElement){const s=t.tagName.toLowerCase(),r=this.tags.get(s),a=t.textContent.trim();r&&(this.allowed(s,n)||i&&"text"===r.group&&this.allowed("p",n))?(Array.from(t.attributes).forEach(e=>{r.attributes.includes(e.name)||t.removeAttribute(e.name)}),t.hasChildNodes()&&this.filter(t),t.hasChildNodes()||r.empty?this.allowed(s,n)||e.replaceChild(this.createElement("p",{},t.outerHTML),t):e.removeChild(t)):i&&a&&this.allowed("p",n)?e.replaceChild(this.createElement("p",{},a),t):a&&this.allowed("text",n)?e.replaceChild(this.createText(a),t):e.removeChild(t)}else if(t instanceof Text){const s=t.textContent.trim();i&&s&&this.allowed("p",n)?e.replaceChild(this.createElement("p",{},s),t):i&&e.removeChild(t)}else e.removeChild(t)}),this.filters.forEach(t=>{e.normalize(),t.filter(e)}),e.normalize(),e.innerHTML=e.innerHTML.replace(/^\s*(<br\s*\/?>\s*)+/gi,"").replace(/\s*(<br\s*\/?>\s*)+$/gi,""),e instanceof HTMLParagraphElement?e.outerHTML=e.outerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi,"</p><p>"):e.innerHTML=e.innerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi,"<br>")}getTagName(e){if(!(e instanceof HTMLElement))throw"No HTML element";return this.content.isSameNode(e)?"root":e.tagName.toLowerCase()}allowed(e,t){const i=this.tags.get(e),n=i?i.group:e,s=this.tags.get(t);return s&&s.children.includes(n)}convert(e){if(!(e instanceof HTMLElement))throw"No HTML element";const t=this.converters.get(e.tagName.toLowerCase());if(!t)return e;const i=t.convert(e);return e.parentElement.replaceChild(i,e),i}static create(e,t={}){const i=new this(e,t);return i.init(),i}}class s{constructor(e,t){if(!e||"string"!=typeof e)throw"Invalid argument";this.name=e,this.data=t}get(e){return this.data[e]||e}}class r{constructor(e,t){if(!(e instanceof n&&t&&"string"==typeof t))throw"Invalid argument";this.editor=e,this.name=t,this.translator=this.editor.translators.get(this.name)||new s(this.name,{})}open(e,t={}){this.editor.document.querySelectorAll("dialog.editor-dialog").forEach(e=>e.parentElement.removeChild(e));const i=this.editor.window.getSelection(),n=i.rangeCount>0?i.getRangeAt(0):null,s=this.editor.createElement("dialog",{class:"editor-dialog"}),r=this.editor.createElement("form"),a=this.editor.createElement("fieldset"),o=this.editor.createElement("button",{type:"button","data-action":"cancel"},this.translator.get("Cancel")),l=this.editor.createElement("button",{"data-action":"save"},this.translator.get("Save")),d=()=>{n&&(i.removeAllRanges(),i.addRange(n)),s.parentElement.removeChild(s)};s.appendChild(r),s.addEventListener("click",e=>{e.target===s&&d()}),"boolean"!=typeof s.open&&this.polyfill(s),s.open=!0,a.insertAdjacentHTML("beforeend",this.getFieldsetHtml());for(let[e,i]of Object.entries(t))a.elements[e]&&(a.elements[e].value=i);r.appendChild(a),r.addEventListener("submit",t=>{t.preventDefault(),d();const i={};Array.from(a.elements).forEach(e=>i[e.name]=e.value),e(i)}),o.addEventListener("click",d),r.appendChild(o),r.appendChild(l),this.editor.element.appendChild(s)}getFieldsetHtml(){throw"Not implemented"}polyfill(e){Object.defineProperty(e,"open",{get:function(){return this.hasAttribute("open")},set:function(e){e?this.setAttribute("open",""):this.removeAttribute("open")}})}}class a extends r{getFieldsetHtml(){return`\n            <legend>${this.translator.get("Audio")}</legend>\n            <div data-attr="src">\n                <label for="editor-src">${this.translator.get("URL")}</label>\n                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.translator.get("Insert URL to media element")}" />\n            </div>\n            <div data-attr="width">\n                <label for="editor-width">${this.translator.get("Width")}</label>\n                <input id="editor-width" name="width" type="number" />\n            </div>\n            <div data-attr="height">\n                <label for="editor-height">${this.translator.get("Height")}</label>\n                <input id="editor-height" name="height" type="number" />\n            </div>\n        `}}class o extends r{constructor(e,t){if(super(e,t),!this.editor.config[this.name]||!this.editor.config[this.name].browser)throw"Invalid argument";this.url=this.editor.config[this.name].browser,this.opts=Object.assign({alwaysRaised:"yes",dependent:"yes",height:""+this.editor.window.screen.height,location:"no",menubar:"no",minimizable:"no",modal:"yes",resizable:"yes",scrollbars:"yes",toolbar:"no",width:""+this.editor.window.screen.width},this.editor.config.browser||{})}open(e,t={}){const i=Object.entries(this.opts).map(e=>`${e[0]}=${e[1]}`).join(","),n=this.editor.window.open(this.url,this.name,i),s=this.editor.createElement("a",{href:this.url});this.editor.window.addEventListener("message",t=>{t.origin===s.origin&&t.source===n&&(e(t.data),n.close())},!1)}}class l{constructor(e,t){if(!(e instanceof n&&t&&"string"==typeof t))throw"Invalid argument";this.editor=e,this.name=t,this.element=this.editor.elements.get(this.name)||null,this.dialog=this.editor.dialogs.get(this.name)||null}execute(){this.dialog?this.dialog.open(e=>this.insert(e),this.oldData()):this.insert()}insert(e={}){this.element&&this.element.insert(e)}oldData(){const e={},t=this.editor.getSelectedElement();return t instanceof HTMLElement&&t.tagName.toLowerCase()===this.element.tagName&&Array.from(t.attributes).forEach(t=>e[t.nodeName]=t.nodeValue),e}}class d{constructor(e,t,i){if(!(e instanceof n&&t&&"string"==typeof t&&i&&"string"==typeof i))throw"Invalid argument";this.editor=e,this.name=t,this.tagName=i}create(e={}){return this.editor.createElement(this.tagName,e)}insert(e={}){this.editor.insert(this.create(e))}}const h={audio:{controls:"controls"},iframe:{allowfullscreen:"allowfullscreen"},video:{controls:"controls"}};class c extends d{create({caption:e="",...t}={}){if(!t.src)throw"No media element";const i=this.editor.createElement("a",{href:t.src});t.src=i.origin===this.editor.origin?i.pathname:i.href,Object.assign(t,h[this.tagName]||{});const n=this.editor.createElement("figure",{class:this.name}),s=this.editor.createElement(this.tagName,t),r=this.editor.createElement("figcaption",{},e);return n.appendChild(s),n.appendChild(r),n}}const m={de:{Audio:"Audio",Cancel:"Abbrechen",Height:"Höhe","Insert URL to media element":"URL zum Medienelement eingeben",Save:"Speichern",URL:"URL",Width:"Breite"}};class g extends e{constructor(e){super(e),this.editables=[...this.editor.tags].reduce((e,t)=>(t[1].editable&&e.push(t[1].name),e),[])}observe(e){e.forEach(e=>e.addedNodes.forEach(e=>{e instanceof HTMLElement&&this.editables.includes(e.tagName.toLowerCase())?this.toEditable(e):e instanceof HTMLElement&&e.querySelectorAll(this.editables.join(", ")).forEach(e=>this.toEditable(e))}))}toEditable(e){e.contentEditable="true",e.focus(),e.addEventListener("keydown",e=>{this.onKeydownEnter(e),this.onKeydownBackspace(e)}),e.addEventListener("keyup",e=>this.onKeyupEnter(e))}onKeydownEnter(e){"Enter"!==e.key||e.shiftKey&&this.editor.allowed("br",e.target.tagName.toLowerCase())||(e.preventDefault(),e.cancelBubble=!0)}onKeyupEnter(e){let t;if("Enter"===e.key&&!e.shiftKey&&(t=this.editor.tags.get(e.target.tagName.toLowerCase()))&&t.enter){let i,n=e.target;e.preventDefault(),e.cancelBubble=!0;do{if(i=this.editor.getTagName(n.parentElement),this.editor.allowed(t.enter,i)){n.insertAdjacentElement("afterend",this.editor.createElement(t.enter));break}}while((n=n.parentElement)&&this.editor.content.contains(n)&&!this.editor.content.isSameNode(n))}}onKeydownBackspace(e){const t=this.editor.getSelectedWidget(),i=["blockquote","details","ol","ul"].includes(e.target.parentElement.tagName.toLowerCase())&&("summary"!==e.target.tagName.toLowerCase()||e.target.matches(":only-child"));if("Backspace"===e.key&&!e.shiftKey&&!e.target.textContent&&t&&(t.isSameNode(e.target)||i)){const i=t.isSameNode(e.target)||e.target.matches(":only-child")?t:e.target;i.previousElementSibling&&this.editor.focusEnd(i.previousElementSibling),i.parentElement.removeChild(i),e.preventDefault(),e.cancelBubble=!0}}}class u extends e{observe(e){e.forEach(e=>e.addedNodes.forEach(e=>{e instanceof HTMLElement&&e.parentElement instanceof HTMLElement&&e.parentElement.isSameNode(this.editor.content)&&(e.tabIndex=0,this.keyboard(e),this.dragndrop(e))}))}keyboard(e){e.addEventListener("keyup",t=>{this.editor.document.activeElement.isSameNode(e)&&("Delete"!==t.key||e.isContentEditable?e.draggable&&"ArrowUp"===t.key&&e.previousElementSibling?(e.previousElementSibling.insertAdjacentHTML("beforebegin",e.outerHTML),e.parentElement.removeChild(e),t.preventDefault(),t.cancelBubble=!0):e.draggable&&"ArrowDown"===t.key&&e.nextElementSibling&&(e.nextElementSibling.insertAdjacentHTML("afterend",e.outerHTML),e.parentElement.removeChild(e),t.preventDefault(),t.cancelBubble=!0):(e.parentElement.removeChild(e),t.preventDefault(),t.cancelBubble=!0))})}dragndrop(e){const t="text/x-editor-name",i=()=>{const t=e.hasAttribute("draggable");this.editor.content.querySelectorAll("[draggable]").forEach(e=>{e.removeAttribute("draggable"),e.hasAttribute("contenteditable")&&e.setAttribute("contenteditable","true")}),t||(e.setAttribute("draggable","true"),e.hasAttribute("contenteditable")&&e.setAttribute("contenteditable","false"))},n=i=>{const n=i.dataTransfer.getData(t);n&&this.editor.allowed(n,"root")&&(i.preventDefault(),e.setAttribute("data-dragover",""),i.dataTransfer.dropEffect="move")};e.addEventListener("dblclick",i),e.addEventListener("dragstart",i=>{i.dataTransfer.effectAllowed="move",i.dataTransfer.setData(t,e.tagName.toLowerCase()),i.dataTransfer.setData("text/x-editor-html",e.outerHTML)}),e.addEventListener("dragend",t=>{"move"===t.dataTransfer.dropEffect&&e.parentElement.removeChild(e),i()}),e.addEventListener("dragenter",n),e.addEventListener("dragover",n),e.addEventListener("dragleave",()=>e.removeAttribute("data-dragover")),e.addEventListener("drop",i=>{const n=i.dataTransfer.getData(t),s=i.dataTransfer.getData("text/x-editor-html");i.preventDefault(),e.removeAttribute("data-dragover"),n&&this.editor.allowed(n,"root")&&s&&e.insertAdjacentHTML("beforebegin",s)})}}class f extends d{constructor(e){super(e,"blockquote","blockquote")}create({caption:e=""}={}){const t=this.editor.createElement("figure",{class:"quote"}),i=this.editor.createElement("blockquote"),n=this.editor.createElement("figcaption",{},e);return i.appendChild(this.editor.createElement("p")),t.appendChild(i),t.appendChild(n),t}}class p{constructor(e,t,i){if(!(e instanceof n&&t&&"string"==typeof t&&i&&"string"==typeof i))throw"Invalid argument";this.editor=e,this.name=t,this.target=i}convert(e){return this.editor.createElement(this.target,{},e.innerHTML)}}class b extends d{constructor(e){super(e,"details","details")}create(e={}){const t=this.editor.createElement("details");return t.appendChild(this.editor.createElement("summary")),t.appendChild(this.editor.createElement("p")),t}}class w extends e{observe(e){e.forEach(e=>e.addedNodes.forEach(e=>{e instanceof HTMLDetailsElement?this.initDetails(e):e instanceof HTMLElement&&"summary"===e.tagName.toLowerCase()?this.initSummary(e):e instanceof HTMLElement&&e.querySelectorAll("details").forEach(e=>this.initDetails(e))}))}initDetails(e){let t=e.firstElementChild;if(t instanceof HTMLElement&&"summary"===t.tagName.toLowerCase())this.initSummary(t),1===e.childElementCount&&e.appendChild(this.editor.createElement("p"));else if(t instanceof HTMLElement){const i=this.editor.createElement("summary");e.insertBefore(i,t),this.initSummary(i)}}initSummary(e){const t=()=>{e.textContent.trim()||(e.textContent=this.editor.translators.get("details").get("Details"))};t(),e.addEventListener("blur",t),e.addEventListener("keydown",e=>{" "===e.key&&(e.preventDefault(),e.cancelBubble=!0)}),e.addEventListener("keyup",e=>{" "===e.key&&(e.preventDefault(),e.cancelBubble=!0,this.editor.insertText(" "))})}}const E={de:{Details:"Details"}};class v{constructor(e,t){if(!(e instanceof n&&t&&"string"==typeof t))throw"Invalid argument";this.editor=e,this.name=t}filter(e){throw"Not implemented"}}class L extends v{filter(e){e.querySelectorAll("figure > figcaption:only-child").forEach(e=>e.parentElement.removeChild(e))}}class y extends e{observe(e){e.forEach(e=>e.addedNodes.forEach(e=>{e instanceof HTMLElement&&"figure"===e.tagName.toLowerCase()&&!e.querySelector(":scope > figcaption")&&e.appendChild(this.editor.createElement("figcaption"))}))}}class T extends r{getFieldsetHtml(){return`\n            <legend>${this.translator.get("Iframe")}</legend>\n            <div data-attr="src">\n                <label for="editor-src">${this.translator.get("URL")}</label>\n                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.translator.get("Insert URL to media element")}" />\n            </div>\n            <div data-attr="width">\n                <label for="editor-width">${this.translator.get("Width")}</label>\n                <input id="editor-width" name="width" type="number" />\n            </div>\n            <div data-attr="height">\n                <label for="editor-height">${this.translator.get("Height")}</label>\n                <input id="editor-height" name="height" type="number" />\n            </div>\n        `}}const x={de:{Cancel:"Abbrechen",Height:"Höhe",Ifrane:"Iframe","Insert URL to media element":"URL zum Medienelement eingeben",Save:"Speichern",URL:"URL",Width:"Breite"}};class C extends r{getFieldsetHtml(){return`\n            <legend>${this.translator.get("Image")}</legend>\n            <div data-attr="src">\n                <label for="editor-src">${this.translator.get("URL")}</label>\n                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.translator.get("Insert URL to media element")}" />\n            </div>\n            <div data-attr="alt">\n                <label for="editor-alt">${this.translator.get("Alternative text")}</label>\n                <input id="editor-alt" name="alt" type="text" placeholder="${this.translator.get("Replacement text for use when media elements are not available")}" />\n            </div>\n            <div data-attr="width">\n                <label for="editor-width">${this.translator.get("Width")}</label>\n                <input id="editor-width" name="width" type="number" />\n            </div>\n            <div data-attr="height">\n                <label for="editor-height">${this.translator.get("Height")}</label>\n                <input id="editor-height" name="height" type="number" />\n            </div>\n        `}}const H={de:{"Alternative text":"Alternativtext",Cancel:"Abbrechen",Height:"Höhe",Image:"Bild","Insert URL to media element":"URL zum Medienelement eingeben","Replacement text for use when media elements are not available":"Ersatztext, falls Medienelemente nicht verfügbar sind",Save:"Speichern",URL:"URL",Width:"Breite"}};class M extends l{constructor(e){super(e,"link")}insert({href:e=null}={}){const t=this.editor.getSelectedElement(),i=t instanceof HTMLAnchorElement?t:null;e&&i?i.setAttribute("href",e):e?this.element.insert({href:e}):i&&i.parentElement.replaceChild(this.editor.createText(i.textContent),i)}}class A extends r{getFieldsetHtml(){return`\n            <legend>${this.translator.get("Link")}</legend>\n            <div data-attr="href">\n                <label for="editor-href">${this.translator.get("URL")}</label>\n                <input id="editor-href" name="href" type="text" pattern="(https?|/).+" placeholder="${this.translator.get("Insert URL to add a link or leave empty to unlink")}" />\n            </div>\n        `}}const N={de:{Cancel:"Abbrechen","Insert URL to add a link or leave empty to unlink":"URL eingeben um zu verlinken oder leer lassen um Link zu entfernen",Link:"Link",Save:"Speichern",URL:"URL"}};class k extends d{create(e={}){const t=this.editor.createElement(this.tagName);return t.appendChild(this.editor.createElement("li")),t}}class S extends r{getFieldsetHtml(){return`\n            <legend>${this.translator.get("Table")}</legend>\n            <div data-attr="rows" data-required>\n                <label for="editor-rows">${this.translator.get("Rows")}</label>\n                <input id="editor-rows" name="rows" type="number" value="1" required="required" min="1" />\n            </div>\n            <div data-attr="cols" data-required>\n                <label for="editor-cols">${this.translator.get("Columns")}</label>\n                <input id="editor-cols" name="cols" type="number" value="1" required="required" min="1" />\n            </div>\n        `}}class R extends d{constructor(e){super(e,"table","table")}create({rows:e=1,cols:t=1,caption:i=""}={}){if(e<=0||t<=0)throw"Invalid argument";const n=this.editor.createElement("figure",{class:"table"}),s=this.editor.createElement("table"),r=this.editor.createElement("figcaption",{},i);return n.appendChild(s),n.appendChild(r),["thead","tbody","tfoot"].forEach(i=>{const n=this.editor.createElement(i),r="thead"===i?"th":"td",a="tbody"===i?e:1;let o;s.appendChild(n);for(let e=0;e<a;e++){o=this.editor.createElement("tr"),n.appendChild(o);for(let e=0;e<t;++e)o.appendChild(this.editor.createElement(r))}}),n}}class I extends v{filter(e){if(e instanceof HTMLTableRowElement&&!e.querySelector("th:not(:empty), td:not(:empty)")||e instanceof HTMLTableSectionElement&&e.rows.length<=0||e instanceof HTMLTableElement&&e.querySelector("thead, tfoot")&&!e.querySelector("tbody"))for(;e.firstChild;)e.removeChild(e.firstChild)}}class U extends e{observe(e){e.forEach(e=>e.addedNodes.forEach(e=>{e instanceof HTMLTableElement?this.initTable(e):e instanceof HTMLElement&&e.querySelectorAll("table").forEach(e=>this.initTable(e))}))}initTable(e){this.sections(e),this.keyboard(e)}sections(e){if(e.tBodies.length>0&&e.tBodies[0].rows[0]&&(!e.tHead||!e.tFoot)){const t=e.tBodies[0].rows[0].cells.length;let i;if(!e.tHead){i=e.createTHead().insertRow();for(let e=0;e<t;e++)i.appendChild(this.editor.createElement("th"))}if(!e.tFoot){i=e.createTFoot().insertRow();for(let e=0;e<t;e++)i.insertCell()}}}keyboard(e){e.addEventListener("keydown",t=>{const i=t.target,n=i.parentElement,s=n.parentElement;if(i instanceof HTMLTableCellElement&&n instanceof HTMLTableRowElement&&(s instanceof HTMLTableElement||s instanceof HTMLTableSectionElement)&&(t.altKey||t.ctrlKey)&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(t.key)){const r=n.cells.length,a=s.rows.length,o=s instanceof HTMLTableElement?n.rowIndex:n.sectionRowIndex;let l;if(t.altKey&&("ArrowLeft"===t.key&&i.cellIndex>0||"ArrowRight"===t.key&&i.cellIndex<r-1))l=i.cellIndex+("ArrowLeft"===t.key?-1:1),Array.from(e.rows).forEach(e=>e.deleteCell(l));else if(t.altKey&&("ArrowUp"===t.key&&o>0||"ArrowDown"===t.key&&o<a-1))l=o+("ArrowUp"===t.key?-1:1),s.deleteRow(l);else if(!t.ctrlKey||"ArrowLeft"!==t.key&&"ArrowRight"!==t.key){if(t.ctrlKey&&("ArrowUp"===t.key||"ArrowDown"===t.key)){l=o+("ArrowUp"===t.key?0:1);const e=s.insertRow(l);for(let t=0;t<r;t++)e.insertCell()}}else l=i.cellIndex+("ArrowLeft"===t.key?0:1),Array.from(e.rows).forEach(e=>{e.querySelector(":scope > td")?e.insertCell(l):e.insertBefore(this.editor.createElement("th"),e.cells[l])});t.preventDefault(),t.cancelBubble=!0}})}}const D={de:{Cancel:"Abbrechen",Columns:"Spalten",Rows:"Zeilen",Save:"Speichern",Table:"Tabelle"}};class $ extends r{getFieldsetHtml(){return`\n            <legend>${this.translator.get("Video")}</legend>\n            <div data-attr="src">\n                <label for="editor-src">${this.translator.get("URL")}</label>\n                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.translator.get("Insert URL to media element")}" />\n            </div>\n            <div data-attr="width">\n                <label for="editor-width">${this.translator.get("Width")}</label>\n                <input id="editor-width" name="width" type="number" />\n            </div>\n            <div data-attr="height">\n                <label for="editor-height">${this.translator.get("Height")}</label>\n                <input id="editor-height" name="height" type="number" />\n            </div>\n        `}}const q={de:{Cancel:"Abbrechen",Height:"Höhe","Insert URL to media element":"URL zum Medienelement eingeben",Save:"Speichern",URL:"URL",Video:"Video",Width:"Breite"}};class B extends n{}B.defaultConfig={base:{plugins:[class extends t{constructor(e){super(e,"audio")}init(){const e=this.editor.config.base&&m[this.editor.config.base.lang]?m[this.editor.config.base.lang]:{};this.editor.translators.set(this.name,new s(this.name,e)),this.editor.elements.set(this.name,new c(this.editor,this.name,"audio"));const t=this.editor.config[this.name]&&this.editor.config[this.name].browser?o:a;this.editor.dialogs.set(this.name,new t(this.editor,this.name)),this.editor.commands.set(this.name,new l(this.editor,this.name))}},class extends t{constructor(e){super(e,"base")}init(){this.editor.observe(new g(this.editor)),this.editor.observe(new u(this.editor))}},class extends t{constructor(e){super(e,"blockquote")}init(){this.editor.elements.set(this.name,new f(this.editor)),this.editor.commands.set(this.name,new l(this.editor,this.name))}},class extends t{constructor(e){super(e,"bold")}init(){this.editor.elements.set(this.name,new d(this.editor,this.name,"strong")),this.editor.commands.set(this.name,new l(this.editor,this.name)),this.editor.converters.set("b",new p(this.editor,"b","strong"))}},class extends t{constructor(e){super(e,"details")}init(){this.editor.observe(new w(this.editor));const e=this.editor.config.base&&E[this.editor.config.base.lang]?E[this.editor.config.base.lang]:{};this.editor.translators.set(this.name,new s(this.name,e)),this.editor.elements.set(this.name,new b(this.editor)),this.editor.commands.set(this.name,new l(this.editor,this.name))}},class extends t{constructor(e){super(e,"figure")}init(){this.editor.observe(new y(this.editor)),this.editor.filters.set(this.name,new L(this.editor,this.name))}},class extends t{constructor(e){super(e,"heading")}init(){this.editor.elements.set(this.name,new d(this.editor,this.name,"h2")),this.editor.commands.set(this.name,new l(this.editor,this.name))}},class extends t{constructor(e){super(e,"iframe")}init(){const e=this.editor.config.base&&x[this.editor.config.base.lang]?x[this.editor.config.base.lang]:{};this.editor.translators.set(this.name,new s(this.name,e)),this.editor.elements.set(this.name,new c(this.editor,this.name,"iframe"));const t=this.editor.config[this.name]&&this.editor.config[this.name].browser?o:T;this.editor.dialogs.set(this.name,new t(this.editor,this.name)),this.editor.commands.set(this.name,new l(this.editor,this.name))}},class extends t{constructor(e){super(e,"image")}init(){const e=this.editor.config.base&&H[this.editor.config.base.lang]?H[this.editor.config.base.lang]:{};this.editor.translators.set(this.name,new s(this.name,e)),this.editor.elements.set(this.name,new c(this.editor,this.name,"img"));const t=this.editor.config[this.name]&&this.editor.config[this.name].browser?o:C;this.editor.dialogs.set(this.name,new t(this.editor,this.name)),this.editor.commands.set(this.name,new l(this.editor,this.name))}},class extends t{constructor(e){super(e,"italic")}init(){this.editor.elements.set(this.name,new d(this.editor,this.name,"i")),this.editor.commands.set(this.name,new l(this.editor,this.name))}},class extends t{constructor(e){super(e,"link")}init(){const e=this.editor.config.base&&N[this.editor.config.base.lang]?N[this.editor.config.base.lang]:{};this.editor.translators.set(this.name,new s(this.name,e)),this.editor.elements.set(this.name,new d(this.editor,this.name,"a")),this.editor.dialogs.set(this.name,new A(this.editor,this.name)),this.editor.commands.set(this.name,new M(this.editor))}},class extends t{constructor(e){super(e,"orderedlist")}init(){this.editor.elements.set(this.name,new k(this.editor,this.name,"ol")),this.editor.commands.set(this.name,new l(this.editor,this.name))}},class extends t{constructor(e){super(e,"paragraph")}init(){this.editor.elements.set(this.name,new d(this.editor,this.name,"p")),this.editor.commands.set(this.name,new l(this.editor,this.name))}},class extends t{constructor(e){super(e,"subheading")}init(){this.editor.elements.set(this.name,new d(this.editor,this.name,"h3")),this.editor.commands.set(this.name,new l(this.editor,this.name))}},class extends t{constructor(e){super(e,"table")}init(){this.editor.observe(new U(this.editor));const e=this.editor.config.base&&D[this.editor.config.base.lang]?D[this.editor.config.base.lang]:{};this.editor.translators.set(this.name,new s(this.name,e)),this.editor.elements.set(this.name,new R(this.editor)),this.editor.filters.set(this.name,new I(this.editor,this.name)),this.editor.dialogs.set(this.name,new S(this.editor,this.name)),this.editor.commands.set(this.name,new l(this.editor,this.name))}},class extends t{constructor(e){super(e,"unorderedlist")}init(){this.editor.elements.set(this.name,new k(this.editor,this.name,"ul")),this.editor.commands.set(this.name,new l(this.editor,this.name))}},class extends t{constructor(e){super(e,"video")}init(){const e=this.editor.config.base&&q[this.editor.config.base.lang]?q[this.editor.config.base.lang]:{};this.editor.translators.set(this.name,new s(this.name,e)),this.editor.elements.set(this.name,new c(this.editor,this.name,"video"));const t=this.editor.config[this.name]&&this.editor.config[this.name].browser?o:$;this.editor.dialogs.set(this.name,new t(this.editor,this.name)),this.editor.commands.set(this.name,new l(this.editor,this.name))}}],tags:[{name:"root",group:"root",children:["details","figure","heading","list","paragraph"]},{name:"p",group:"paragraph",children:["break","text"],editable:!0,enter:"p"},{name:"h2",group:"heading",editable:!0,enter:"p"},{name:"h3",group:"heading",editable:!0,enter:"p"},{name:"ul",group:"list",children:["listitem"]},{name:"ol",group:"list",children:["listitem"]},{name:"li",group:"listitem",children:["break","text"],editable:!0,enter:"li"},{name:"figure",group:"figure",attributes:["class"],children:["blockquote","caption","media","table"]},{name:"figcaption",group:"caption",children:["text"],editable:!0,enter:"p"},{name:"blockquote",group:"blockquote",children:["paragraph"]},{name:"img",group:"media",attributes:["alt","height","src","width"],empty:!0},{name:"video",group:"media",attributes:["controls","height","src","width"],empty:!0},{name:"audio",group:"media",attributes:["controls","height","src","width"],empty:!0},{name:"iframe",group:"media",attributes:["allowfullscreen","height","src","width"],empty:!0},{name:"table",group:"table",children:["tablesection"]},{name:"thead",group:"tablesection",children:["tablerow"]},{name:"tbody",group:"tablesection",children:["tablerow"]},{name:"tfoot",group:"tablesection",children:["tablerow"]},{name:"tr",group:"tablerow",children:["tablecell"]},{name:"th",group:"tablecell",children:["break","text"],editable:!0,empty:!0},{name:"td",group:"tablecell",children:["break","text"],editable:!0,empty:!0},{name:"details",group:"details",children:["figure","list","paragraph","summary"]},{name:"summary",group:"summary",editable:!0,enter:"p"},{name:"strong",group:"text"},{name:"i",group:"text"},{name:"a",group:"text",attributes:["href"]},{name:"br",group:"break",empty:!0}],toolbar:["bold","italic","link","paragraph","heading","subheading","unorderedlist","orderedlist","blockquote","image","video","audio","iframe","table","details"]}};export default B;
