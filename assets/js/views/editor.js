import { View } from "../views/view.js";

export class EditorView extends View {
  constructor(element) {
    super(element);
  }
  _template(model) {
    return `${model.editors
      .map(
        (editor) => `
                <div class="editor-content" id="editor-${editor.id}"></div>
              `
      )
      .join("")}
        `;
  }
}
