import { View } from "../views/view.js";

export class TabView extends View {
  constructor(element) {
    super(element);
  }
  _template(model) {
    return `<ul class="tabs-list">
              ${model.editorList
                .map(
                  (editor) => `
                <li class="nav-btn">${editor.name}</li>
              `
                )
                .join("")}

            </ul>`;
  }
}
