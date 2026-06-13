import m from 'mithril';

import ImageButton from '../components/ImageButton';
import { ScoreMarks } from '../data/ScoreLiterals';
import styles from '../styles/ScreenStyles';
import { dims } from '../data/dimensionsStore';
import Config from '../data/Config';
import GridView from './GridView';
import RadioButtons from '../components/RadioButtons';
import { OctaveButtons } from '../data/ButtonDefinitions';
import AccidentalSelectView from './AccidentalSelectView';

export default function NoteSelectView() {
  let visibleOctave = 'ryo';

  function getButtonData() {
    const buttonData = [];
    for (const [key, value] of Object.entries(OctaveButtons)) {
      buttonData.push({
        id: key,
        image: value.glyph,
      });
    }
    return buttonData;
  }

  function getStyle(octave) {
    return octave === visibleOctave ? { display: 'flex' } : { display: 'none' };
  }

  return {
    view({ attrs }) {
      const { addNote, addAccidental, refresh } = attrs;

      const renderNoteButton = (item) =>
        m(ImageButton, {
          key: item.name,
          highlightColour: Config.inputButtonHighlightColour,
          image: item.glyph.source,
          onPress: () => {
            addNote(item);
            refresh();
          },
          style: [styles.input.octaveButton, dims.getNoteButtonStyle()],
        });

      return m('div.v.notes-panel', { style: { height: `${dims.getNoteButtonViewHeight()}px` } }, [
        m(RadioButtons, {
          buttonData: getButtonData(),
          onSelect: (octave) => {
            visibleOctave = octave;
          },
          buttonStyles: dims.getOctaveSelectorButtonStyle(styles.input.octaveSelectorButton),
          class: 'octave-selector',
        }),
        m('div.v.octave-view', [
          m('div.v.octaves-row', [
            m(GridView, {
              key: 'ryo',
              noRows: 5,
              items: ScoreMarks.notes.ryo,
              renderItem: renderNoteButton,
              style: getStyle('ryo'),
            }),
            m(GridView, {
              key: 'kan',
              noRows: 4,
              items: ScoreMarks.notes.kan,
              renderItem: renderNoteButton,
              style: getStyle('kan'),
            }),
            m(GridView, {
              key: 'daikan',
              noRows: 3,
              items: ScoreMarks.notes.daikan,
              renderItem: renderNoteButton,
              style: getStyle('daikan'),
            }),
          ]),
          m(AccidentalSelectView, { addAccidental, refresh }),
        ]),
      ]);
    },
  };
}
