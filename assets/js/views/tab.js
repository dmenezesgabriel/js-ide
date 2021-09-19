import { View } from "../views/view.js";

export class TabView extends View {
  constructor(element) {
    super(element);
  }
  _template(model) {
    return `
              ${model.editors
                .map(
                  (editor) => `
                <a class="nav-btn">${editor.name}<span class="btn-close-tab">&times;</span></a>
              `
                )
                .join("")}
            `;
  }
}
