# jquery-simple-tree-table

A jquery plugin that attaches tree-like behaviour to table.

## Dependencies

* jquery

## Installation

Install from npm:

    $ npm install @kanety/jquery-simple-tree-table --save

## Usage

Add `data-node-id` and `data-node-pid` in your table:

```html
<table>
  <tr data-node-id="1">
    <td>1</td>
    <td>text of 1</td>
  </tr>
  <tr data-node-id="1.1" data-node-pid="1">
    <td>1.1</td>
    <td>text of 1.1</td>
  </tr>
  <tr data-node-id="1.1.1" data-node-pid="1.1">
    <td>1.1.1</td>
    <td>text of 1.1.1</td>
  </tr>
  <tr data-node-id="1.1.2" data-node-pid="1.1">
    <td>1.1.2</td>
    <td>text of 1.1.2</td>
  </tr>
</table>
```

Then run:

```javascript
$('table').simpleTreeTable();
```

### Options

Specify opened nodes:

```javascript
$('table').simpleTreeTable({
  opened: [1]
});
```

Add expand / collapse button:

```javascript
$('table').simpleTreeTable({
  expander: '#expander',
  collapser: '#collapser',
});
```

Store node states in sessionStorage or localStorage:

```javascript
$('table').simpleTreeTable({
  store: 'session', // or 'local'
  storeKey: 'KEY'
});
```

### Callbacks

Run Callbacks when a node is opened or closed:

```javascript
$('table').simpleTreeTable({
  ...
}).on('node:open', function(e, $node) {
  ...
}).on('node:close', function(e, $node) {
  ...
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
