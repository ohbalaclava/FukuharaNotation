import m from 'mithril';
import { toCSS } from '../styles/StyleUtils';

export default {
  view({ attrs }) {
    const imageStyle = {
      width: '100%',
      height: '100%',
      resizeMode: attrs.resizeMode || 'cover',
    };
    if (attrs.border) {
      imageStyle.borderRadius = attrs.border.radius;
      imageStyle.borderColor = attrs.border.colour;
      imageStyle.borderWidth = attrs.border.width;
      imageStyle.borderStyle = 'solid';
    }

    return m(
      'div.v',
      {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: attrs.width ? `${attrs.width}px` : '100%',
          height: attrs.height ? `${attrs.height}px` : '100%',
        },
      },
      m('img', {
        src: attrs.source,
        style: toCSS(imageStyle),
      })
    );
  },
};
