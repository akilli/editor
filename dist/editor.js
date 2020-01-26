class e{constructor(e,t,n=""){if(!(e instanceof S)||"function"!=typeof t||"string"!=typeof n)throw"Invalid argument";this.editor=e,this.save=t,this.html=n}open(e={}){this.editor.document.querySelectorAll("dialog.editor-dialog").forEach(e=>e.parentElement.removeChild(e));const t=this.editor.window.getSelection(),n=t.rangeCount>0?t.getRangeAt(0):null,i=this.editor.document.createElement("dialog"),r=this.editor.document.createElement("form"),o=this.editor.document.createElement("fieldset"),a=this.editor.document.createElement("button"),s=this.editor.document.createElement("button"),l=()=>{n&&(t.removeAllRanges(),t.addRange(n)),i.parentElement.removeChild(i)};i.appendChild(r),i.classList.add("editor-dialog"),i.addEventListener("click",e=>{e.target===i&&l()}),"boolean"!=typeof i.open&&Object.defineProperty(i,"open",{get:function(){return this.hasAttribute("open")},set:function(e){e?this.setAttribute("open",""):this.removeAttribute("open")}}),i.open=!0,o.insertAdjacentHTML("beforeend",this.html),Object.getOwnPropertyNames(e).forEach(t=>{o.elements[t]&&(o.elements[t].value=e[t])}),r.appendChild(o),r.addEventListener("submit",e=>{e.preventDefault(),l();const t={};Array.from(o.elements).forEach(e=>t[e.name]=e.value),this.save(t)}),a.textContent=this.editor.i18n("Cancel"),a.type="button",a.setAttribute("data-action","cancel"),a.addEventListener("click",l),r.appendChild(a),s.textContent=this.editor.i18n("Save"),s.setAttribute("data-action","save"),r.appendChild(s),this.editor.element.appendChild(i)}}class t{constructor(t,n=null,i=null){let r;if(!(t instanceof S)||n&&!(r=t.getTag(n))||i&&!(i instanceof e.constructor))throw"Invalid argument";this.editor=t,this.tag=r,this.dialog=i?new i(this.editor,e=>this.insert(e)):null}execute(){this.dialog?this.dialog.open(this.oldData()):this.insert()}insert(e={}){throw"Not implemented"}oldData(){return{}}}class n{constructor(e={}){this.lang=e.lang,this.i18n=e.i18n||{},this.media=e.media||{}}}class i{convert(e){throw"Not implemented"}}class r{constructor(e){if(!(e instanceof S))throw"Invalid editor";this.editor=e}filter(e,t=!1){throw"Not implemented"}}class o{constructor(e){if(!(e instanceof S))throw"Invalid editor";this.editor=e}observe(e){throw"Not implemented"}}class a{constructor({name:e=null,group:t=null,attributes:n=[],children:i=[],editable:r=!1,empty:o=!1,enter:a=null}={}){if(!e||"string"!=typeof e)throw"Invalid tag";this.name=e,this.group=t&&"string"==typeof t?t:e,this.children=Array.isArray(i)?i:[],this.attributes=Array.isArray(n)?n:[],this.editable=Boolean(r),this.empty=Boolean(o),this.enter=a&&"string"==typeof a?a:null}}class s extends t{constructor(e,t,n=null){if(super(e,t,n),!this.tag||"text"!==this.tag.group)throw"No text element"}insert(e={}){this.editor.formatText(this.editor.document.createElement(this.tag.name))}}class l extends t{insert(e={}){const t=this.editor.document.createElement("figure"),n=this.editor.document.createElement("blockquote");t.classList.add("quote"),t.appendChild(n),t.appendChild(this.editor.document.createElement("figcaption")),n.appendChild(this.editor.document.createElement("p")),this.editor.insert(t)}}class d extends t{insert(e={}){const t=this.editor.document.createElement("details");t.appendChild(this.editor.document.createElement("summary")),t.appendChild(this.editor.document.createElement("p")),this.editor.insert(t)}}class c extends t{execute(){this.editor.element.classList.contains("editor-fullscreen")?(this.editor.element.classList.remove("editor-fullscreen"),this.editor.document.documentElement.removeAttribute("data-fullscreen")):(this.editor.element.classList.add("editor-fullscreen"),this.editor.document.documentElement.setAttribute("data-fullscreen",""))}}class m extends t{constructor(e,t){if(super(e,t),!this.tag||"heading"!==this.tag.group)throw"No heading element"}insert(e={}){this.editor.insert(this.editor.document.createElement(this.tag.name))}}class h extends e{constructor(e,t){super(e,t),this.html=`\n            <legend>${this.editor.i18n("Link")}</legend>\n            <div data-attr="href">\n                <label for="editor-href">${this.editor.i18n("URL")}</label>\n                <input id="editor-href" name="href" type="text" pattern="(https?|/).+" placeholder="${this.editor.i18n("Insert URL to add a link or leave empty to unlink")}" />\n            </div>\n        `}}class u extends s{constructor(e){super(e,"a",h)}insert({href:e=null}={}){const t=this.editor.getSelectedElement(),n=t instanceof HTMLAnchorElement?t:null;if(e&&n)n.setAttribute("href",e);else if(e){const t=this.editor.document.createElement(this.tag.name);t.setAttribute("href",e),this.editor.formatText(t)}else n&&n.parentElement.replaceChild(this.editor.document.createTextNode(n.textContent),n)}oldData(){const e=this.editor.getSelectedElement();return e instanceof HTMLAnchorElement?{href:e.getAttribute("href")}:{}}}class f extends t{constructor(e,t){if(super(e,t),!this.tag||"list"!==this.tag.group)throw"No list element"}insert(e={}){const t=this.editor.document.createElement(this.tag.name);t.appendChild(this.editor.document.createElement("li")),this.editor.insert(t)}}const g=`alwaysRaised=yes,dependent=yes,height=${window.screen.height},location=no,menubar=no,minimizable=no,modal=yes,resizable=yes,scrollbars=yes,toolbar=no,width=${window.screen.width}`;const p={audio:{id:"audio",element:"audio",mime:["audio/aac","audio/flac","audio/mp3","audio/mpeg","audio/mpeg3","audio/ogg","audio/wav","audio/wave","audio/webm","audio/x-aac","audio/x-flac","audio/x-mp3","audio/x-mpeg","audio/x-mpeg3","audio/x-pn-wav","audio/x-wav"]},iframe:{id:"iframe",element:"iframe",mime:["text/html"]},image:{id:"image",element:"img",mime:["image/gif","image/jpeg","image/png","image/svg+xml","image/webp"]},video:{id:"video",element:"video",mime:["video/mp4","video/ogg","video/webm"]}};class b{static ids(){return Object.getOwnPropertyNames(p)}static get(e){return p[e]||null}static fromElement(e){const t=b.ids();for(let n=0;n<t.length;++n)if(p[t[n]].element===e)return p[t[n]];return null}static async fromUrl(e){let t;try{t=await fetch(e,{method:"HEAD",mode:"no-cors"})}catch(e){return null}if(t.ok){const e=t.headers.get("content-type").split(";")[0].trim(),n=b.ids();for(let t=0;t<n.length;++t)if(p[n[t]].mime.includes(e))return p[n[t]]}return null}}class E extends e{constructor(e,t){super(e,t),this.html=`\n            <legend>${this.editor.i18n("Media element")}</legend>\n            <div data-attr="src">\n                <label for="editor-src">${this.editor.i18n("URL")}</label>\n                <input id="editor-src" name="src" type="text" pattern="(https?|/).+" placeholder="${this.editor.i18n("Insert URL to media element")}" />\n            </div>\n            <div data-attr="alt">\n                <label for="editor-alt">${this.editor.i18n("Alternative text")}</label>\n                <input id="editor-alt" name="alt" type="text" placeholder="${this.editor.i18n("Replacement text for use when media elements are not available")}" />\n            </div>\n            <div data-attr="width">\n                <label for="editor-width">${this.editor.i18n("Width")}</label>\n                <input id="editor-width" name="width" type="number" />\n            </div>\n            <div data-attr="height">\n                <label for="editor-height">${this.editor.i18n("Height")}</label>\n                <input id="editor-height" name="height" type="number" />\n            </div>\n        `}}class w extends t{constructor(e,t){let n;if(super(e,t,E),!this.tag||"media"!==this.tag.group||!(n=b.fromElement(this.tag.name)))throw"No media element";this.type=n}execute(){const e=this.editor.config.media[this.type.id];e?class{static open(e,t,n,i="browser",r=null){if(!t||"function"!=typeof n||!i)return;r=r||g;const o=e.document,a=e.open(t,i,r),s=o.createElement("a");s.href=t;const l=s.origin;e.addEventListener("message",e=>{e.origin===l&&e.source===a&&(n(e.data),a.close())},!1)}}.open(this.editor.window,e,e=>this.insert(e)):super.execute()}async insert(e={}){if(!e.src)return;const t=this.editor.document.createElement("a"),n=this.editor.window.origin||this.editor.window.location.origin;let i;if(t.href=e.src,e.src=t.origin===n?t.pathname:t.href,e.type&&e.type===this.type.id||(i=await b.fromUrl(e.src))&&i.id===this.type.id||!i&&t.origin!==n){const t=this.editor.document.createElement("figure"),n=this.editor.document.createElement(this.type.element),i=this.editor.document.createElement("figcaption");t.classList.add(this.type.id),t.appendChild(n),this.tag.attributes.forEach(t=>{["allowfullscreen","controls"].includes(t)?n.setAttribute(t,t):e[t]&&n.setAttribute(t,e[t])}),i.innerHTML=e.caption||"",t.appendChild(i),this.editor.insert(t)}}}class v extends t{insert(e={}){this.editor.insert(this.editor.document.createElement("p"))}}class y extends e{constructor(e,t){super(e,t),this.html=`\n            <legend>${this.editor.i18n("Table")}</legend>\n            <div data-attr="rows" data-required>\n                <label for="editor-rows">${this.editor.i18n("Rows")}</label>\n                <input id="editor-rows" name="rows" type="number" value="1" required="required" min="1" />\n            </div>\n            <div data-attr="cols" data-required>\n                <label for="editor-cols">${this.editor.i18n("Columns")}</label>\n                <input id="editor-cols" name="cols" type="number" value="1" required="required" min="1" />\n            </div>\n        `}}class T extends t{constructor(e){super(e,null,y)}insert({rows:e=1,cols:t=1}={}){if(e<=0||t<=0)return;const n=this.editor.document.createElement("figure"),i=this.editor.document.createElement("table");n.classList.add("table"),n.appendChild(i),n.appendChild(this.editor.document.createElement("figcaption")),["thead","tbody","tfoot"].forEach(n=>{const r=this.editor.document.createElement(n),o="thead"===n?"th":"td",a="tbody"===n?e:1;let s;i.appendChild(r);for(let e=0;e<a;e++){s=this.editor.document.createElement("tr"),r.appendChild(s);for(let e=0;e<t;++e)s.appendChild(this.editor.document.createElement(o))}}),this.editor.insert(n)}}const L={fullscreen:e=>new c(e),bold:e=>new s(e,"strong"),italic:e=>new s(e,"i"),definition:e=>new s(e,"dfn"),quote:e=>new s(e,"q"),cite:e=>new s(e,"cite"),mark:e=>new s(e,"mark"),keyboard:e=>new s(e,"kbd"),link:e=>new u(e),paragraph:e=>new v(e),heading:e=>new m(e,"h2"),subheading:e=>new m(e,"h3"),unorderedlist:e=>new f(e,"ul"),orderedlist:e=>new f(e,"ol"),blockquote:e=>new l(e),image:e=>new w(e,"img"),video:e=>new w(e,"video"),audio:e=>new w(e,"audio"),iframe:e=>new w(e,"iframe"),table:e=>new T(e),details:e=>new d(e)};class x extends i{constructor(e){if(super(),!e)throw"Missing replacement tag";this.name=e}convert(e){const t=e.ownerDocument.createElement(this.name);return t.innerHTML=e.innerHTML,t}}class C extends i{convert(e){return e.ownerDocument.createTextNode(e.textContent)}}const N={abbr:new C,b:new x("strong"),code:new C,data:new C,div:new x("p"),em:new x("i"),ins:new C,samp:new C,small:new C,span:new C,time:new C,u:new C,var:new x("i")};const M=[class extends r{filter(e,t=!1){const n=t||this.editor.content.isSameNode(e),i=t?"root":this.editor.getTagName(e);e.normalize(),Array.from(e.childNodes).forEach(t=>{if(t instanceof HTMLElement&&(t=this.editor.convert(t)),t instanceof HTMLElement){const r=t.tagName,o=this.editor.getTag(r),a=t.textContent.trim();if(o)if(this.editor.allowed(r,i)||n&&"text"===o.group)if(Array.from(t.attributes).forEach(e=>{o.attributes.includes(e.name)||t.removeAttribute(e.name)}),t.hasChildNodes()&&this.editor.filter(t),t.hasChildNodes()||o.empty||t instanceof HTMLTableCellElement){if(n&&"text"===o.group){const n=this.editor.document.createElement("p");n.innerHTML=t.outerHTML,e.replaceChild(n,t)}}else e.removeChild(t);else if(n&&a){const n=this.editor.document.createElement("p");n.textContent=a,e.replaceChild(n,t)}else a?e.replaceChild(this.editor.document.createTextNode(a),t):e.removeChild(t);else e.removeChild(t)}else if(t instanceof Text)if(n&&t.textContent.trim()){const n=this.editor.document.createElement("p");n.textContent=t.textContent.trim(),e.replaceChild(n,t)}else n&&e.removeChild(t);else e.removeChild(t)})}},class extends r{filter(e,t=!1){let n;for(;(n=e.firstChild)&&n instanceof HTMLBRElement||(n=e.lastChild)&&n instanceof HTMLBRElement;)e.removeChild(n)}},class extends r{filter(e,t=!1){e.querySelectorAll("figure > figcaption:only-child").forEach(e=>e.parentElement.removeChild(e))}},class extends r{filter(e,t=!1){if(e instanceof HTMLTableRowElement&&!e.querySelector("th:not(:empty), td:not(:empty)")||e instanceof HTMLTableElement&&e.querySelector("thead, tfoot")&&!e.querySelector("tbody"))for(;e.firstChild;)e.removeChild(e.firstChild)}}];const A=[class extends o{constructor(e){super(e),this.editables=[...this.editor.tags].reduce((e,t)=>(t[1].editable&&e.push(t[1].name),e),[])}observe(e){e.forEach(e=>e.addedNodes.forEach(e=>{e instanceof HTMLElement&&this.editables.includes(e.tagName.toLowerCase())?this.toEditable(e):e instanceof HTMLElement&&e.querySelectorAll(this.editables.join(", ")).forEach(e=>this.toEditable(e))}))}toEditable(e){e.contentEditable="true",e.focus(),e.addEventListener("keydown",e=>{this.onKeyDownEnter(e),this.onKeyDownBackspace(e)}),e.addEventListener("keyup",e=>this.onKeyUpEnter(e))}onKeyDownEnter(e){"Enter"!==e.key||e.shiftKey&&this.editor.allowed("br",e.target.tagName)||(e.preventDefault(),e.cancelBubble=!0)}onKeyUpEnter(e){let t;if("Enter"===e.key&&!e.shiftKey&&(t=this.editor.getTag(e.target.tagName))&&t.enter){let n,i=e.target;e.preventDefault(),e.cancelBubble=!0;do{if(n=this.editor.getTagName(i.parentElement),this.editor.allowed(t.enter,n)){const e=this.editor.document.createElement(t.enter);this.editor.insert(e,i);break}}while((i=i.parentElement)&&this.editor.content.contains(i)&&!this.editor.content.isSameNode(i))}}onKeyDownBackspace(e){const t=this.editor.getSelectedWidget(),n=["blockquote","details","ol","ul"].includes(e.target.parentElement.tagName.toLowerCase());if("Backspace"===e.key&&!e.shiftKey&&!e.target.textContent&&t&&(t.isSameNode(e.target)||n)){const i=t.isSameNode(e.target)||n&&!e.target.matches(":only-child")?e.target:t;i.previousElementSibling&&this.editor.focusEnd(i.previousElementSibling),i.parentElement.removeChild(i),e.preventDefault(),e.cancelBubble=!0}}},class extends o{observe(e){e.forEach(e=>e.addedNodes.forEach(e=>{e instanceof HTMLDetailsElement?this.initDetails(e):e instanceof HTMLElement&&"summary"===e.tagName.toLowerCase()?this.initSummary(e):e instanceof HTMLElement&&e.querySelectorAll("details").forEach(e=>this.initDetails(e))}))}initDetails(e){let t=e.firstElementChild;if(t instanceof HTMLElement&&"summary"===t.tagName.toLowerCase())this.initSummary(t),1===e.childElementCount&&e.appendChild(this.editor.document.createElement("p"));else if(t instanceof HTMLElement){const n=this.editor.document.createElement("summary");e.insertBefore(n,t),this.initSummary(n)}}initSummary(e){const t=()=>{e.textContent.trim()||(e.textContent=this.editor.i18n("Details"))};t(),e.addEventListener("blur",t),e.addEventListener("keydown",e=>{" "===e.key&&(e.preventDefault(),e.cancelBubble=!0)}),e.addEventListener("keyup",e=>{" "===e.key&&(e.preventDefault(),e.cancelBubble=!0,this.editor.insertText(" "))})}},class extends o{observe(e){e.forEach(e=>e.addedNodes.forEach(e=>{e instanceof HTMLElement&&"figure"===e.tagName.toLowerCase()&&!e.querySelector(":scope > figcaption")&&e.appendChild(this.editor.document.createElement("figcaption"))}))}},class extends o{observe(e){e.forEach(e=>e.addedNodes.forEach(e=>{e instanceof HTMLTableElement?this.initTable(e):e instanceof HTMLElement&&e.querySelectorAll("table").forEach(e=>this.initTable(e))}))}initTable(e){this.sections(e),this.keyboard(e)}sections(e){if(e.tBodies.length>0&&e.tBodies[0].rows[0]&&(!e.tHead||!e.tFoot)){const t=e.tBodies[0].rows[0].cells.length;let n;if(!e.tHead){n=e.createTHead().insertRow();for(let e=0;e<t;e++)n.appendChild(this.editor.document.createElement("th"))}if(!e.tFoot){n=e.createTFoot().insertRow();for(let e=0;e<t;e++)n.insertCell()}}}keyboard(e){e.addEventListener("keydown",t=>{const n=t.target,i=n.parentElement,r=i.parentElement;if(n instanceof HTMLTableCellElement&&i instanceof HTMLTableRowElement&&(r instanceof HTMLTableElement||r instanceof HTMLTableSectionElement)&&(t.altKey||t.ctrlKey)&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(t.key)){const o=i.cells.length,a=r.rows.length,s=r instanceof HTMLTableElement?i.rowIndex:i.sectionRowIndex;let l;if(t.altKey&&("ArrowLeft"===t.key&&n.cellIndex>0||"ArrowRight"===t.key&&n.cellIndex<o-1))l=n.cellIndex+("ArrowLeft"===t.key?-1:1),Array.from(e.rows).forEach(e=>e.deleteCell(l));else if(t.altKey&&("ArrowUp"===t.key&&s>0||"ArrowDown"===t.key&&s<a-1))l=s+("ArrowUp"===t.key?-1:1),r.deleteRow(l);else if(!t.ctrlKey||"ArrowLeft"!==t.key&&"ArrowRight"!==t.key){if(t.ctrlKey&&("ArrowUp"===t.key||"ArrowDown"===t.key)){l=s+("ArrowUp"===t.key?0:1);const e=r.insertRow(l);for(let t=0;t<o;t++)e.insertCell()}}else l=n.cellIndex+("ArrowLeft"===t.key?0:1),Array.from(e.rows).forEach(e=>{e.querySelector(":scope > td")?e.insertCell(l):e.insertBefore(this.editor.document.createElement("th"),e.cells[l])});t.preventDefault(),t.cancelBubble=!0}})}},class extends o{observe(e){e.forEach(e=>e.addedNodes.forEach(e=>{e instanceof HTMLElement&&e.parentElement instanceof HTMLElement&&e.parentElement.isSameNode(this.editor.content)&&(e.tabIndex=0,this.keyboard(e),this.dragndrop(e))}))}keyboard(e){e.addEventListener("keyup",t=>{this.editor.document.activeElement.isSameNode(e)&&("Delete"!==t.key||e.isContentEditable?e.draggable&&"ArrowUp"===t.key&&e.previousElementSibling?(e.previousElementSibling.insertAdjacentHTML("beforebegin",e.outerHTML),e.parentElement.removeChild(e),t.preventDefault(),t.cancelBubble=!0):e.draggable&&"ArrowDown"===t.key&&e.nextElementSibling&&(e.nextElementSibling.insertAdjacentHTML("afterend",e.outerHTML),e.parentElement.removeChild(e),t.preventDefault(),t.cancelBubble=!0):(e.parentElement.removeChild(e),t.preventDefault(),t.cancelBubble=!0))})}dragndrop(e){const t="text/x-editor-name",n=()=>{const t=e.hasAttribute("draggable");this.editor.content.querySelectorAll("[draggable]").forEach(e=>{e.removeAttribute("draggable"),e.hasAttribute("contenteditable")&&e.setAttribute("contenteditable","true")}),t||(e.setAttribute("draggable","true"),e.hasAttribute("contenteditable")&&e.setAttribute("contenteditable","false"))},i=n=>{const i=n.dataTransfer.getData(t);i&&this.editor.allowed(i,"root")&&(n.preventDefault(),e.setAttribute("data-dragover",""),n.dataTransfer.dropEffect="move")};e.addEventListener("dblclick",n),e.addEventListener("dragstart",n=>{n.dataTransfer.effectAllowed="move",n.dataTransfer.setData(t,e.tagName.toLowerCase()),n.dataTransfer.setData("text/x-editor-html",e.outerHTML)}),e.addEventListener("dragend",t=>{"move"===t.dataTransfer.dropEffect&&e.parentElement.removeChild(e),n()}),e.addEventListener("dragenter",i),e.addEventListener("dragover",i),e.addEventListener("dragleave",()=>e.removeAttribute("data-dragover")),e.addEventListener("drop",n=>{const i=n.dataTransfer.getData(t),r=n.dataTransfer.getData("text/x-editor-html");n.preventDefault(),e.removeAttribute("data-dragover"),i&&this.editor.allowed(i,"root")&&r&&e.insertAdjacentHTML("beforebegin",r)})}}],H=[{name:"root",children:["details","figure","heading","list","p"]},{name:"p",children:["br","text"],editable:!0,enter:"p"},{name:"h2",group:"heading",editable:!0,enter:"p"},{name:"h3",group:"heading",editable:!0,enter:"p"},{name:"ul",group:"list",children:["li"]},{name:"ol",group:"list",children:["li"]},{name:"li",children:["br","text"],editable:!0,enter:"li"},{name:"figure",attributes:["class"],children:["blockquote","figcaption","media","table"]},{name:"figcaption",children:["text"],editable:!0,enter:"p"},{name:"blockquote",children:["p"]},{name:"img",group:"media",attributes:["alt","height","src","width"],empty:!0},{name:"video",group:"media",attributes:["controls","height","src","width"],empty:!0},{name:"audio",group:"media",attributes:["controls","height","src","width"],empty:!0},{name:"iframe",group:"media",attributes:["allowfullscreen","height","src","width"],empty:!0},{name:"table",children:["tablesection"]},{name:"thead",group:"tablesection",children:["tr"]},{name:"tbody",group:"tablesection",children:["tr"]},{name:"tfoot",group:"tablesection",children:["tr"]},{name:"tr",children:["tablecell"]},{name:"th",group:"tablecell",children:["br","text"],editable:!0},{name:"td",group:"tablecell",children:["br","text"],editable:!0},{name:"details",children:["figure","list","p","summary"]},{name:"summary",editable:!0,enter:"p"},{name:"strong",group:"text"},{name:"i",group:"text"},{name:"dfn",group:"text"},{name:"kbd",group:"text"},{name:"mark",group:"text"},{name:"q",group:"text"},{name:"cite",group:"text"},{name:"a",group:"text",attributes:["href"]},{name:"br",empty:!0}],k={de:{"Alternative text":"Alternativtext",Cancel:"Abbrechen",Columns:"Spalten",Details:"Details","Element is not allowed here":"Element ist hier nicht erlaubt",Height:"Höhe","Insert URL to add a link or leave empty to unlink":"URL eingeben um zu verlinken oder leer lassen um Link zu entfernen","Insert URL to media element":"URL zum Medienelement eingeben","Invalid argument":"Ungültiges Argument","Invalid command":"Ungültiger Befehl","Invalid constructor":"Ungültiger Konstruktor","Invalid converter":"Ungültiger Konverter","Invalid editor":"Ungültiger Editor","Invalid observer":"Ungültiger Beobachter",Link:"Link","Media element":"Medienelement","Missing replacement tag":"Fehlender Ersatz-Tag","No heading element":"Kein Überschriftenelement","No HTML element":"Kein HTML-Element","No list element":"Kein Listenelement","No media element":"Kein Medienelement","No text element":"Kein Textelement","Not implemented":"Nicht implementiert","Replacement text for use when media elements are not available":"Ersatztext, falls Medienelemente nicht verfügbar sind",Rows:"Zeilen",Save:"Speichern",Table:"Tabelle",URL:"URL",Width:"Breite"}};class S{constructor(e,t={}){if(!(e instanceof HTMLElement))throw"No HTML element";const i=e.ownerDocument.createElement("div"),a=e.ownerDocument.createElement("div"),s=e.ownerDocument.createElement("div"),l=e.ownerDocument.createElement("div");i.classList.add("editor"),a.classList.add("editor-content"),s.classList.add("editor-toolbar","editor-toolbar-main"),l.classList.add("editor-toolbar","editor-toolbar-editable"),e.hidden=!0,e.insertAdjacentElement("afterend",i),i.appendChild(s),i.appendChild(a),i.appendChild(l),this.orig=e,this.document=e.ownerDocument,this.window=this.document.defaultView,this.config=new n(t),this.element=i,this.content=a,this.toolbarMain=s,this.toolbarEditable=l,this.tags=this.createTags(H),this.converters=this.createConverters(N),this.commands=this.createCommands(L),this.observers=this.create(A,o),this.filters=this.create(M,r)}create(e,t){return e.map(e=>{if(!("function"==typeof e&&(e=new e(this))&&e instanceof t))throw"Invalid constructor";return e})}createTags(e){const t=new Map;return e.forEach(e=>{const n=new a(e);return t.set(n.name,n)}),t}createConverters(e){const t=new Map;return Object.getOwnPropertyNames(e).forEach(n=>{if(!(e[n]instanceof i))throw"Invalid converter";t.set(n,e[n])}),t}createCommands(e){const n=new Map;return Object.getOwnPropertyNames(e).forEach(i=>{let r;if(!("function"==typeof e[i]&&(r=e[i](this))&&r instanceof t))throw"Invalid command";return n.set(i,r)}),n}init(){this.observers.forEach(e=>this.register(t=>e.observe(t))),this.initContent(),this.initToolbar()}initContent(){this.orig instanceof HTMLTextAreaElement?(this.content.innerHTML=this.orig.value.replace("/&nbsp;/g"," "),this.orig.form.addEventListener("submit",()=>this.save())):this.content.innerHTML=this.orig.innerHTML,this.filter(this.content)}initToolbar(){this.content.addEventListener("selectstart",()=>{const e=this.document.activeElement;e.isContentEditable&&this.allowedGroup("text",e.tagName)&&(this.toolbarEditable.classList.add("editor-toolbar-active"),this.toolbarEditable.style.top=e.offsetTop+e.offsetParent.offsetTop-this.toolbarEditable.clientHeight+"px")}),this.document.addEventListener("selectionchange",()=>{const e=this.document.activeElement;!this.window.getSelection().isCollapsed&&e.isContentEditable&&this.content.contains(e)||(this.toolbarEditable.classList.remove("editor-toolbar-active"),this.toolbarEditable.removeAttribute("style"))});for(let e of this.commands.entries()){const t=this.document.createElement("button");t.setAttribute("type","button"),t.setAttribute("data-cmd",e[0]),t.setAttribute("title",e[0]),t.textContent=e[0],t.addEventListener("click",()=>{this.window.getSelection().containsNode(this.content,!0)||this.content.focus(),e[1].execute()}),e[1]instanceof s?this.toolbarEditable.appendChild(t):this.toolbarMain.appendChild(t)}}register(e,t={childList:!0,subtree:!0}){if("function"!=typeof e)throw"Invalid observer";new MutationObserver(e).observe(this.content,t)}execute(e){const t=this.commands.get(e);if(!t)throw"Invalid command";t.execute()}getData(){const e=this.content.cloneNode(!0);return this.filter(e,!0),e.innerHTML}save(){this.orig instanceof HTMLTextAreaElement?this.orig.value=this.getData():this.orig.innerHTML=this.getData()}insert(e,t=null){if(!(e instanceof HTMLElement)||t&&!(t instanceof HTMLElement))throw"Invalid HTML element";const n=t?t.parentElement:this.content,i=this.getTagName(n);if(!this.content.contains(n)||!this.allowed(e.tagName,i))throw"Element is not allowed here";n.insertBefore(e,t?t.nextElementSibling:null)}insertText(e){this.document.execCommand("inserttext",!1,e)}formatText(e){if(!(e instanceof HTMLElement))throw"Invalid HTML element";const t=this.window.getSelection(),n=t.anchorNode instanceof Text?t.anchorNode.parentElement:t.anchorNode,i=this.getSelectedEditable();if(t.isCollapsed||!t.toString().trim()||!(n instanceof HTMLElement)||!i)return;const r=t.getRangeAt(0),o=this.getTag(n.tagName),a=o&&"text"!==o.group?n:n.parentElement;r.startContainer instanceof Text&&!r.startContainer.parentElement.isSameNode(a)&&r.setStartBefore(r.startContainer.parentElement),r.endContainer instanceof Text&&!r.endContainer.parentElement.isSameNode(a)&&r.setEndAfter(r.endContainer.parentElement);const s=r.toString(),l=r.cloneContents().childNodes;let d=Array.from(l).every(t=>t instanceof Text&&!t.textContent.trim()||t instanceof HTMLElement&&t.tagName===e.tagName);r.deleteContents(),!(a.isContentEditable&&this.allowed(e.tagName,a.tagName)&&s.trim())||o&&d?r.insertNode(this.document.createTextNode(s)):(e.textContent=s,r.insertNode(e)),a.normalize()}getSelectedElement(){const e=this.window.getSelection(),t=e.anchorNode instanceof Text?e.anchorNode.parentElement:e.anchorNode,n=e.focusNode instanceof Text?e.focusNode.parentElement:e.focusNode;return t instanceof HTMLElement&&n instanceof HTMLElement&&t.isSameNode(n)&&this.content.contains(t)?t:null}getSelectedEditable(){const e=this.window.getSelection(),t=e.anchorNode instanceof Text?e.anchorNode.parentElement:e.anchorNode,n=e.focusNode instanceof Text?e.focusNode.parentElement:e.focusNode;if(t instanceof HTMLElement&&n instanceof HTMLElement){const e=t.closest("[contenteditable=true]"),i=n.closest("[contenteditable=true]");if(e instanceof HTMLElement&&i instanceof HTMLElement&&e.isSameNode(i)&&this.content.contains(e))return e}return null}getSelectedWidget(){const e=this.getSelectedElement();return e?e.closest("div.editor-content > *"):null}focusEnd(e){if(!(e instanceof HTMLElement))throw"No HTML element";const t=this.document.createRange(),n=this.window.getSelection();e.focus(),t.selectNodeContents(e),t.collapse(),n.removeAllRanges(),n.addRange(t)}filter(e,t=!1){if(!(e instanceof HTMLElement))throw"No HTML element";this.filters.forEach(n=>n.filter(e,t))}getTagName(e){if(!(e instanceof HTMLElement))throw"No HTML element";return this.content.isSameNode(e)?"root":e.tagName}getTag(e){return this.tags.get(e.toLowerCase())||null}allowed(e,t){const n=this.getTag(e),i=this.getTag(t);return n&&i&&i.children.includes(n.group)}allowedGroup(e,t){const n=this.getTag(t);return n&&n.children.includes(e)}convert(e){if(!(e instanceof HTMLElement))throw"No HTML element";const t=this.converters.get(e.tagName.toLowerCase());if(!t)return e;const n=t.convert(e);return e.parentElement.replaceChild(n,e),n}i18n(e,...t){e=this.config.i18n[e]?this.config.i18n[e]:e;for(let n=0;n<t.length;n++)e=e.replace(/%s/,t[n]);return e}static create(e,t={}){t.lang&&(t.i18n=k[t.lang]||{});const n=new S(e,t);return n.init(),n}}export default S;