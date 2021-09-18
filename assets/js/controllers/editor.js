import { Editor } from "../models/editor.js";
import { EditorList } from "../models/editorList.js";

export class EditorController {
  constructor() {
    this._content = "";
    this._editorElement = document.querySelector("#editor");
    this._editorElement.textContent = `function echo(m) {\n\treturn m;\n}\nconsole.log(echo("Hello World"));`;
    this._editorElement.style.fontSize = "15px";
    this._editorObj = ace.edit("editor");
    this._editorObj.session.setMode("ace/mode/javascript");
    this._editorObj.setTheme("ace/theme/dracula");
    this._editorObj.session.setTabSize(4);
    this._editorObj.session.setUseWrapMode(true);
    //
    this._editorList = new EditorList();
  }

  _createEditor() {
    return new Editor(this._content);
  }

  addEditor(event) {
    event.preventDefault();
    let editor = this._createEditor();
    this._editorList.add(editor);
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
