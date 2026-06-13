import m from 'mithril';

import { toCSS } from '../styles/StyleUtils';

export default function RadioButtons() {
  let selectedItemId;

  return {
    oninit({ attrs }) {
      selectedItemId = attrs.initialSelected || attrs.buttonData[0].id;
    },
    view({ attrs }) {
      const { buttonData, onSelect, buttonStyles, allowUnselected } = attrs;

      const selectHandler = (item) => {
        if (selectedItemId === item.id && allowUnselected) {
          onSelect(RadioButtons.None);
          selectedItemId = RadioButtons.None;
        } else if (selectedItemId !== item.id) {
          onSelect(item.id);
          selectedItemId = item.id;
        }
      };

      const getButtonDisplay = (item, buttonStyle) => {
        if (item.image) {
          return m('div.v.bg-img', {
            style: {
              ...toCSS(buttonStyle.image),
              backgroundImage: `url(${item.image})`,
            },
          });
        }
        return m('span', { style: toCSS(buttonStyle.label) }, item.label);
      };

      return m(
        'div.v',
        { class: attrs.class },
        buttonData.map((item) => {
          const buttonStyle =
            item.id === selectedItemId ? buttonStyles.selected : buttonStyles.unselected;
          return m(
            'div.v.clickable',
            {
              key: item.id,
              style: toCSS(buttonStyle),
              onclick: () => selectHandler(item),
            },
            getButtonDisplay(item, buttonStyle)
          );
        })
      );
    },
  };
}

RadioButtons.None = '_NO_SELECTION_';
