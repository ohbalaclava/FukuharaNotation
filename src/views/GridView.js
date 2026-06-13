import m from 'mithril';

import { toCSS } from '../styles/StyleUtils';

// renderItem must return a keyed vnode: every column's children form a keyed
// fragment in mithril.

export default {
  view({ attrs }) {
    const { items, renderItem, style } = attrs;
    const noRows = attrs.noRows === undefined ? 1 : attrs.noRows;
    const noCols = Math.ceil(items.length / noRows);

    const columns = [];
    for (let i = 0; i < noCols; ++i) {
      const rows = [];
      for (let k = i * noRows, j = 0; j < noRows && k < items.length; ++k, ++j) {
        rows.push(renderItem(items[k]));
      }
      columns.push(m('div.v.grid-col', { key: i }, rows));
    }

    return m('div.v.grid-cols', { style: toCSS(style) }, columns);
  },
};
