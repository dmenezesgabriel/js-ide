import { Editor } from "../models/editor.js";
import { EditorList } from "../models/editorList.js";
import { EditorView } from "../views/editor.js";
import { TabView } from "../views/tab.js";

export class EditorController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._content = "";
    this._currentEditorId = 0;
    this._currentEditor;
    // controller
    this._editorList = new EditorList();
    this._editorView = new EditorView($("#editorView"));
    this._tabView = new TabView($("#tabView"));

    $("#save-current-editor-content").onclick = this._saveEditorText;
    $("#add-new-editor").onclick = this._addEditor.bind(this);
    $("#execute-btn").onclick = this._runCode.bind(this);
    $("#clear-btn").onclick = function () {
      console.clear();
    };
  }

  _createEditor() {
    this._currentEditorId++;
    return new Editor(
      this._currentEditorId,
      `untitled-${this._currentEditorId}`,
      this._content
    );
  }

  _addEditor() {
    // if editor exists, store editor content before change tabs
    if (typeof this._currentEditor !== "undefined") {
      this._currentEditor.content = this._getEditorText();
    }
    let editor = this._createEditor();
    this._editorList.add(editor);
    this._editorView.update(this._editorList);
    this._tabView.update(this._editorList);
    this._initEditor();
    this._currentEditor = editor;
  }

  _initEditor() {
    this._editorElement = document.querySelector(
      `#editor-${this._currentEditorId}`
    );
    this._editorElement.textContent = `function echo(m) {\n\treturn m;\n}\nconsole.log(echo("Hello World ${this._currentEditorId}"));`;
    this._editorElement.style.fontSize = "15px";

    this._ace = ace.edit(`editor-${this._currentEditorId}`);
    this._ace.session.setMode("ace/mode/javascript");
    this._ace.setTheme("ace/theme/dracula");
    this._ace.session.setTabSize(4);
    this._ace.session.setUseWrapMode(true);
    this._editorElement.style.display = "block";
    document.querySelector(`#tab-editor-${this._currentEditorId}`).className +=
      " active-tab";
  }

  _getEditorText() {
    return this._ace.getValue();
  }

  _saveEditorText() {
    let textContent = editorController._getEditorText();
    var downloadableLink = document.querySelector(
      "#save-current-editor-content"
    );
    downloadableLink.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(textContent)
    );
    downloadableLink.download = "script" + ".js";
    downloadableLink.target = "_blank";
  }

  kbd(event) {
    if (event.key === "i") console.clear();
    if (event.key === "Enter") eval(this._ace.getValue());
  }

  setKeyShortcuts() {
    var kbd = this.kbd.bind(this);

    window.addEventListener("keydown", function (event) {
      if (event.key === "Control") {
        window.addEventListener("keydown", kbd);
      }
    });
    window.addEventListener("keyup", function (event) {
      if (event.key === "Control") {
        window.removeEventListener("keydown", kbd);
      }
    });
  }

  _runCode() {
    eval(this._ace.getValue());
  }

  init() {
    this.setKeyShortcuts();
    this._addEditor();
  }
}

let editorController = new EditorController();
editorController.init();
