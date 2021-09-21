export class Editor {
  constructor(id, name, content) {
    this._id = id;
    this._name = name;
    this._content = content;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
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
