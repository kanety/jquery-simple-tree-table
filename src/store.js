'use strict';

export default class Store {
  constructor(tree, options = {}) {
    this.tree = tree;
    this.key = Store.storage(options.storeKey);
    this.storage = Store.storage(options.storeType);
  }

  save() {
    let ids = this.tree.nodes().filter((i, node) => {
      return $(node).find('.tree-closed').length != 0;
    }).map((i, node) => {
      return $(node).data('node-id');
    }).get();

    Store.saveData(this.storage, this.key, ids)
  }

  load() {
    let ids = Store.loadData(this.storage, this.key);
    if (!ids) {
      return;
    }

    this.tree.expand();
    ids.forEach((id) => {
      this.tree.closeByID(id);
    });
  }

  static storage(type) {
    if (type === 'local') {
      return window.localStorage;
    } else {
      return window.sessionStorage;
    }
  }

  static saveData(storage, key, data) {
    let json = JSON.stringify(data);
    storage.setItem(key, json);
  }

  static loadData(storage, key) {
    let json = storage.getItem(key);
    if (!json) {
      return null;
    } else {
      return JSON.parse(json);
    }
  }
}
