import m from 'mithril';

// Fullscreen overlay replacing react-native-web's <Modal animationType="fade">.

export default {
  view({ attrs, children }) {
    return attrs.visible ? m('div.v.modal-overlay', children) : null;
  },
};
