export class EditorList {
  constructor() {
    this._editors = [];
  }

  add(editor) {
    this._editors.push(editor);
  }

  _getEditorIndex(id) {
    return this._editors.findIndex((editor) => editor.id === id);
  }

  getEditor(id) {
    return this.editors[this._getEditorIndex(id)];
  }

  get editors() {
    /**
     * getter for editor objects list
     * avoid unwanted modifications
     */
    return [].concat(this._editors);
  }
}
