import m from 'mithril';

import { dims } from '../data/dimensionsStore';
import { getGlyph } from '../data/ScoreLiterals';
import { toCSS } from '../styles/StyleUtils';

export default {
  view({ attrs }) {
    const items = [];
    attrs.decorations &&
      attrs.decorations.forEach((decoration) => {
        items.push(
          m('div.v.score-decoration', {
            key: decoration.name,
            style: {
              ...toCSS(dims.getDecorationMarkStyle(decoration.name, attrs.hasAccidental)),
              backgroundImage: `url(${getGlyph(decoration.name).source})`,
            },
          })
        );
      });

    return m('div.v.score-decorations', items);
  },
};
