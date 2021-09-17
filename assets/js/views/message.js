import { View } from "../views/view.js";

export class MessageView extends View {
  constructor(element) {
    super(element);
  }
  _template(model) {
    return `<p class="alert alert-info">${model.text}</p>`;
  }
}
