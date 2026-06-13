import m from 'mithril';

import ImageButton from '../components/ImageButton';
import { ScoreMarks } from '../data/ScoreLiterals';
import styles from '../styles/ScreenStyles';
import { dims } from '../data/dimensionsStore';
import Config from '../data/Config';

export default {
  view({ attrs }) {
    const { addAccidental, refresh } = attrs;

    return m(
      'div.v.accidentals-panel',
      ScoreMarks.accidentals.map((item) =>
        m(ImageButton, {
          key: item.name,
          highlightColour: Config.inputButtonHighlightColour,
          image: item.glyph.source,
          onPress: () => {
            addAccidental(item);
            refresh();
          },
          style: [styles.input.accidentalButton, dims.getAccidentalButtonStyle()],
        })
      )
    );
  },
};
