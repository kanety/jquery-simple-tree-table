import $ from 'jquery';

import SimpleTreeTable from './simple-tree-table';
import { NAMESPACE } from './consts';

$.fn.simpleTreeTable = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if ($elem.data(NAMESPACE)) $elem.data(NAMESPACE).destroy();
    $elem.data(NAMESPACE, new SimpleTreeTable($elem, options));
  });
};

$.SimpleTreeTable = SimpleTreeTable;
