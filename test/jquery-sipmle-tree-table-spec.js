describe('jquery-simple-tree-table', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  describe('basic', () => {
    let $table, $node, $icon;
    let $expander, $collapser;

    beforeEach(() => {
      $table = $('#basic');
      $expander = $('#expander');
      $collapser = $('#collapser');
      $open1 = $('#open1');
      $close1 = $('#close1');
    });

    it('expands or collapses tree', () => {
      $collapser.click();
      expect($table.find('tr:visible').length).toEqual(2);
      $expander.click();
      expect($table.find('tr:hidden').length).toEqual(0);
    });

    it('opens or closes nodes', () => {
      $table.find('tr[data-node-id="1.1"] .tree-icon').click();
      expect($table.find('tr[data-node-id="1.1.1"]').is(':visible')).toEqual(false);
      expect($table.find('tr[data-node-id="1.1.2"]').is(':visible')).toEqual(false);
  
      $table.find('tr[data-node-id="1.1"] .tree-icon').click();
      expect($table.find('tr[data-node-id="1.1.1"]').is(':visible')).toEqual(true);
      expect($table.find('tr[data-node-id="1.1.2"]').is(':visible')).toEqual(true);
    });

    it('opens and closes by id', () => {
      $close1.click();
      expect($table.find('tr[data-node-id="1.1"]').is(':visible')).toEqual(false);
      $open1.click();
      expect($table.find('tr[data-node-id="1.1"]').is(':visible')).toEqual(true);
    });

    it('finds descendants', () => {
      let $node = $table.find('tr:first');
      expect($table.data('simple-tree-table').findDescendants($node).length).toEqual(7);
    });
  });

  describe('open', () => {
    let $table;

    beforeEach(() => {
      $table = $('#opened');
    });

    it('opens specified nodes by default', () => {
      expect($table.find('tr[data-node-id="1"]').is(':visible')).toEqual(true);
      expect($table.find('tr[data-node-id="1.1"]').is(':visible')).toEqual(true);
      expect($table.find('tr[data-node-id="1.1.1"]').is(':visible')).toEqual(true);
      expect($table.find('tr[data-node-id="1.2.1"]').is(':visible')).toEqual(false);
    });
  });

  describe('callback', () => {
    let $table, $message;

    beforeEach(() => {
      $table = $('#callback');
      $message = $('#message');
    });

    it('runs callbacks', () => {
      $table.find('tr[data-node-id="1.1"] .tree-icon').click().click();
      expect($message.html()).toContain("opened 1.1");
      expect($message.html()).toContain("closed 1.1");
    });
  });

  describe('icon', () => {
    let $table;

    beforeEach(() => {
      $table = $('#icon_pos');
    });

    it('customizable icon position', () => {
      expect($table.find('tr > td:first > span > .tree-icon').length).toEqual(0);
      expect($table.find('tr > td:last > span > .tree-icon').length).toEqual(1);
    });
  });
});
