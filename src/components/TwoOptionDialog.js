import m from 'mithril';

import Modal from './Modal';

// `trigger` replaces React.cloneElement injection: call sites pass
// trigger: (open) => m(ImageButton, { onPress: open, ... })

export default function TwoOptionDialog() {
  let dialogVisible = false;

  return {
    view({ attrs }) {
      const openDialog = () => {
        dialogVisible = true;
      };
      const closeDialog = () => {
        dialogVisible = false;
      };

      return m('div.v', [
        attrs.trigger(openDialog),
        m(
          Modal,
          { visible: dialogVisible },
          m('div.v.dialog-view', [
            m('span.dialog-message', attrs.message),
            m('div.v.dialog-buttons', [
              m(
                'button.dialog-btn',
                {
                  onclick: () => {
                    closeDialog();
                    attrs.onOptionOne && attrs.onOptionOne();
                  },
                },
                attrs.optionOneLabel
              ),
              m(
                'button.dialog-btn',
                {
                  onclick: () => {
                    closeDialog();
                    attrs.onOptionTwo && attrs.onOptionTwo();
                  },
                },
                attrs.optionTwoLabel
              ),
            ]),
          ])
        ),
      ]);
    },
  };
}
