export class Editor {
  constructor(content) {
    this._content = content;
  }

  get content() {
    return this._content;
  }

  set content(content) {
    this._content = content;
  }
}
