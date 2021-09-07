// initialize the content of the text editor to some Javascript
const editorElement = document.querySelector("#editor");
editorElement.textContent = `function echo(m) {\n\treturn m;\n}\nconsole.log(echo("Hello World"));`;

// initialize the editor environment using the ace library

var editor = ace.edit("editor");
editor.session.setMode("ace/mode/javascript"); // editor language
editor.setTheme("ace/theme/dracula"); // editor theme
editor.session.setTabSize(4);
editor.session.setUseWrapMode(true);
document.getElementById("editor").style.fontSize = "15px";

// For our custom clear and execute shortcuts Ctrl-Enter and Ctrl-I
function kbd(event) {
  if (event.key === "i") console.clear();
  if (event.key === "Enter") eval(editor.getValue());
}

window.addEventListener("keydown", function (event) {
  if (event.key === "Control") window.addEventListener("keydown", kbd);
});
window.addEventListener("keyup", function (event) {
  if (event.key === "Control") window.removeEventListener("keydown", kbd);
});
// For phones and devices without a control key
document.querySelector("#execute-btn").addEventListener("click", function () {
  eval(editor.getValue());
});
document.querySelector("#clear-btn").addEventListener("click", function () {
  console.clear();
});
