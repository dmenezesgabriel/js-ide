export class EditorList {
  constructor() {
    this._editors = [];
  }

  add(editor) {
    this._editors.push(editor);
  }

  get editors() {
    /**
     * getter for editor objects list
     * avoid unwanted modifications
     */
    return [].concat(this._editors);
  }
}
