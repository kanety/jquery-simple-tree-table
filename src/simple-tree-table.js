'use strict';

import { NAMESPACE } from './consts';
import Store from './store';

const DEFAULTS = {
  expander: null,
  collapser: null,
  collapsed: false,
  margin: 20,
  onOpen: null,
  onClose: null,
  storeState: false,
  storeKey: NAMESPACE,
  storeType: 'session'
};

export default class SimpleTreeTable {
  constructor(element, options = {}) {
    this.options = $.extend({}, DEFAULTS, options);

    this.$table = $(element);
    this.$expander = $(this.options.expander);
    this.$collapser = $(this.options.collapser);

    if (this.options.storeState) {
      this.store = new Store(this, this.options)
    }

    this.init();
  }

  init() {
    this.$table.addClass(NAMESPACE);
    this.build();
    this.bind();

    if (this.options.collapsed) {
      this.collapse();
    }

    this.loadState();
  }

  build() {
    this.nodes().each((i, node) => {
      let $node = $(node);
      if ($node.find('.tree-icon').length !== 0) {
        return;
      }

      let id = $node.data('node-id');
      let depth = this.depth($node, 0);
      let margin = this.options.margin * (depth - 1);
      let hasChildren = this.findChildren($node).length !== 0;

      let $icon = $('<span class="tree-icon" />').css('margin-left', `${margin}px`);
      if (hasChildren) {
        $icon.addClass('tree-opened')
      }
      $node.children(':first').prepend($icon);
    });
  }

  bind() {
    this.$expander.on(`click.${NAMESPACE}`, (e) => {
      this.expand();
    });

    this.$collapser.on(`click.${NAMESPACE}`, (e) => {
      this.collapse();
    });

    this.$table.on(`click.${NAMESPACE}`, 'tr .tree-icon', (e) => {
      let $icon = $(e.currentTarget);
      let $node = $icon.closest('tr');
      if ($icon.hasClass('tree-opened')) {
        this.close($node);
      } else {
        this.open($node);
      }
    });
  }

  unbind() {
    this.$expander.off(`.${NAMESPACE}`);
    this.$collapser.off(`.${NAMESPACE}`);
    this.$table.off(`.${NAMESPACE}`);
  }

  expand() {
    this.nodes().each((i, node) => {
      this.show($(node));
    });
    this.saveState();
  }

  collapse() {
    this.nodes().each((i, node) => {
      this.hide($(node));
    });
    this.saveState();
  }

  nodes() {
    return this.$table.find('tr[data-node-id]');
  }

  depth($node, depth) {
    depth += 1;
    let pid = $node.data('node-pid');
    let $parent = this.findByID(pid);
    if (pid && $parent) {
      return this.depth($parent, depth);
    } else {
      return depth;
    }
  }

  open($node) {
    this.show($node);
    this.saveState();

    if (this.options.onOpen) {
      this.options.onOpen($node);
    }
  }

  show($node) {
    let $icon = $node.find('.tree-icon');
    if ($icon.hasClass('tree-closed')) {
      $icon.removeClass('tree-closed').addClass('tree-opened');
      this.showDescs($node);
    }
  }

  showDescs($node) {
    let $children = this.findChildren($node);
    $children.each((i, child) => {
      let $child = $(child);
      let $icon = $child.find('.tree-icon');
      $child.show();
      if ($icon.hasClass('tree-opened')) {
        this.showDescs($child);
      }
    });
  }

  close($node) {
    this.hide($node);
    this.saveState();

    if (this.options.onClose) {
      this.options.onClose($node);
    }
  }

  hide($node) {
    let $icon = $node.find('.tree-icon');
    if ($icon.hasClass('tree-opened')) {
      $icon.removeClass('tree-opened').addClass('tree-closed');
      this.hideDescs($node);
    }
  }

  hideDescs($node) {
    let $children = this.findChildren($node);
    $children.each((i, child) => {
      let $child = $(child);
      $child.hide();
      this.hideDescs($child);
    });
  }

  findChildren($node) {
    let pid = $node.data('node-id');
    return this.$table.find(`tr[data-node-pid="${pid}"]`);
  }

  findDescendants($node, descendants) {
    let children = findChildren($node)
    descendants.push(children);
    children.each((i, child) => {
      findDescendants($(child), descs);
    })
    return descendants
  }

  findByID(id) {
    return this.$table.find(`tr[data-node-id="${id}"]`);
  }

  findChildrenByID(id) {
    let $node = this.findByID(id);
    return this.findChildren($node);
  }

  openByID(id) {
    let $node = this.findByID(id);
    this.open($node);
  }

  closeByID(id) {
    let $node = this.findByID(id);
    this.close($node);
  }

  loadState() {
    return this.store && this.store.load();
  }

  saveState() {
    return this.store && this.store.save();
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    $.extend(DEFAULTS, options);
  }
}
