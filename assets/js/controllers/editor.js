import { Editor } from "../models/editor.js";
import { EditorList } from "../models/editorList.js";
import { EditorView } from "../views/editor.js";
import { TabView } from "../views/tab.js";

export class EditorController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._content = "";
    this._currentEditorId = 0;
    // controller
    this._editorList = new EditorList();
    this._editorView = new EditorView($("#editorView"));
    this._tabView = new TabView($("#tabView"));
  }

  _createEditor() {
    this._currentEditorId++;
    return new Editor(
      this._currentEditorId,
      `untitled-${this._currentEditorId}`,
      this._content
    );
  }

  initEditor() {
    this._editorElement = document.querySelector(
      `#editor-${this._currentEditorId}`
    );
    this._editorElement.textContent = `function echo(m) {\n\treturn m;\n}\nconsole.log(echo("Hello World ${this._currentEditorId}"));`;
    this._editorElement.style.fontSize = "15px";

    this._currentEditor = ace.edit(`editor-${this._currentEditorId}`);
    this._currentEditor.session.setMode("ace/mode/javascript");
    this._currentEditor.setTheme("ace/theme/dracula");
    this._currentEditor.session.setTabSize(4);
    this._currentEditor.session.setUseWrapMode(true);
    this._editorElement.style.display = "block";
    this._editorElement.style.display = "block";
    document.querySelector(`#tab-editor-${this._currentEditorId}`).className +=
      " active-tab";
  }

  addEditor() {
    let editor = this._createEditor();
    this._editorList.add(editor);
    this._editorView.update(this._editorList);
    this._tabView.update(this._editorList);
    this.initEditor();
  }

  kbd(event) {
    if (event.key === "i") console.clear();
    if (event.key === "Enter") eval(this._currentEditor.getValue());
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

  setButtonActions() {
    document
      .querySelector("#execute-btn")
      .addEventListener("click", this.runCode.bind(this));
    document.querySelector("#clear-btn").addEventListener("click", function () {
      console.clear();
    });
  }

  runCode() {
    eval(this._currentEditor.getValue());
  }

  init() {
    this.setKeyShortcuts();
    this.setButtonActions();
    this.addEditor();
  }

  getEditorText() {
    return this._currentEditor.getValue();
  }
}

let editorController = new EditorController();
editorController.init();

document.querySelector("#save-file").onclick = saveEditorText;
document.querySelector("#new-editor").onclick = newEditor;

function saveEditorText() {
  let textContent = editorController.getEditorText();
  var downloadableLink = document.querySelector("#save-file");
  downloadableLink.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(textContent)
  );
  downloadableLink.download = "script" + ".js";
  downloadableLink.target = "_blank";
}

function newEditor() {
  editorController.addEditor();
}
