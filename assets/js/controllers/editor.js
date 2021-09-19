import { Editor } from "../models/editor.js";
import { EditorList } from "../models/editorList.js";
import { EditorView } from "../views/editor.js";
import { TabView } from "../views/tab.js";

export class EditorController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._content = "";
    this._currentEditorId = 0;
    // view
    this._editorElement = document.querySelector("#editorx");
    this._editorElement.textContent = `function echo(m) {\n\treturn m;\n}\nconsole.log(echo("Hello World"));`;
    this._editorElement.style.fontSize = "15px";
    // view
    this._editorObj = ace.edit("editorx");
    this._editorObj.session.setMode("ace/mode/javascript");
    this._editorObj.setTheme("ace/theme/dracula");
    this._editorObj.session.setTabSize(4);
    this._editorObj.session.setUseWrapMode(true);
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

  addEditor() {
    let editor = this._createEditor();
    this._editorList.add(editor);
    console.log(this._editorList);
    this._editorView.update(this._editorList);
    this._tabView.update(this._editorList);
  }

  kbd(event) {
    if (event.key === "i") console.clear();
    if (event.key === "Enter") eval(this._editorObj.getValue());
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
    eval(this._editorObj.getValue());
  }

  init() {
    this.setKeyShortcuts();
    this.setButtonActions();
  }

  getEditorText() {
    return this._editorObj.getValue();
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
