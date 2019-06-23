describe('jquery-simple-tree-table', () => {
  it('config', () => {
    let defaults = $.SimpleTreeTable.getDefaults();
    expect(defaults.expander).toEqual(null);

    defaults = $.SimpleTreeTable.setDefaults({expander: 'test'});
    expect(defaults.expander).toEqual('test');
  });
});
