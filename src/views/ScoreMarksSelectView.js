import m from 'mithril';

import NoteSelectView from './NoteSelectView';
import StrokeSelectView from './StrokeSelectView';

export default {
  view({ attrs }) {
    const { addNote, addAccidental, addStroke, addDecoration, setJoin, refresh } = attrs;

    return m(
      'div.v.marks-row',
      m('div.v.marks-sections', [
        m(NoteSelectView, { addNote, addAccidental, refresh }),
        m(StrokeSelectView, { addStroke, addDecoration, setJoin, refresh }),
      ])
    );
  },
};
