describe('jquery-simple-tree-table', function() {
  beforeEach(function() {
    document.body.innerHTML = __html__['index.html'];
  });

  it('expands or collapses tree', function() {
    var $table = $('#basic');
    var $expander = $('#expander');
    var $collapser = $('#collapser');
    $table.simpleTreeTable({
      expander: $expander,
      collapser: $collapser
    });

    $collapser.click();
    expect($table.find('tr:visible').length).toEqual(2);
    $expander.click();
    expect($table.find('tr:hidden').length).toEqual(0);
  });

  it('opens or closes nodes', function() {
    var $table = $('#basic');
    $table.simpleTreeTable();

    $table.find('tr[data-node-id="1.1"] .tree-icon').click();
    expect($table.find('tr[data-node-id="1.1.1"]').is(':visible')).toEqual(false);
    expect($table.find('tr[data-node-id="1.1.2"]').is(':visible')).toEqual(false);

    $table.find('tr[data-node-id="1.1"] .tree-icon').click();
    expect($table.find('tr[data-node-id="1.1.1"]').is(':visible')).toEqual(true);
    expect($table.find('tr[data-node-id="1.1.2"]').is(':visible')).toEqual(true);
  });

  it('opens specified nodes by default', function() {
    var $table = $('#opened');
    $table.simpleTreeTable({
      opened: [1, 1.1]
    });

    expect($table.find('tr[data-node-id="1"]').is(':visible')).toEqual(true);
    expect($table.find('tr[data-node-id="1.1"]').is(':visible')).toEqual(true);
    expect($table.find('tr[data-node-id="1.1.1"]').is(':visible')).toEqual(true);
    expect($table.find('tr[data-node-id="1.2.1"]').is(':visible')).toEqual(false);
  });

  it('has callbacks', function() {
    var $table = $('#callback');
    var $message = $('#message');
    $table.simpleTreeTable().on('node:open', function(e, $node) {
      $message.append("opened " + $node.data('node-id') + " ");
    }).on('node:close', function(e, $node) {
      $message.append("closed " + $node.data('node-id') + " ");
    });

    $table.find('tr[data-node-id="1.1"] .tree-icon').click().click();
    expect($message.html()).toContain("opened 1.1");
    expect($message.html()).toContain("closed 1.1");
  });

  it('has icon position', function() {
    var $table = $('#icon_pos');
    $table.simpleTreeTable({
      iconPosition: 'td:last > span'
    });
    expect($table.find('tr > td:first > span > .tree-icon').length).toEqual(0);
    expect($table.find('tr > td:last > span > .tree-icon').length).toEqual(1);
  });
});
