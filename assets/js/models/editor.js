export class Editor {
  constructor(name, content) {
    this._name = name;
    this._content = content;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get content() {
    return this._content;
  }

  set content(content) {
    this._content = content;
  }
}
