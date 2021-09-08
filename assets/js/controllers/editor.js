class Editor {
  constructor() {
    this._editorElement = document.querySelector("#editor");
    this._editorElement.textContent = `function echo(m) {\n\treturn m;\n}\nconsole.log(echo("Hello World"));`;
    this._editorElement.style.fontSize = "15px";
    this._editorObj = ace.edit("editor");
    this._editorObj.session.setMode("ace/mode/javascript");
    this._editorObj.setTheme("ace/theme/dracula");
    this._editorObj.session.setTabSize(4);
    this._editorObj.session.setUseWrapMode(true);
  }

  kbd(event) {
    if (event.key === "i") console.clear();
    if (event.key === "Enter") eval(editor.getValue());
  }

  setKeyShortcuts() {
    window.addEventListener("keydown", function (event) {
      if (event.key === "Control") window.addEventListener("keydown", kbd);
    });
    window.addEventListener("keyup", function (event) {
      if (event.key === "Control") window.removeEventListener("keydown", kbd);
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
}

let editor = new Editor();
editor.init();
