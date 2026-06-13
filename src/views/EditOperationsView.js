import m from 'mithril';

import ImageButton from '../components/ImageButton';
import styles from '../styles/ScreenStyles';
import { OperationButtons } from '../data/ButtonDefinitions';
import { dims } from '../data/dimensionsStore';
import FileOperationsView from './FileOperationsView';

export default {
  view({ attrs }) {
    const { deleteMark, newline, download, upload, toPDF, clear, isScoreNonEmpty, refresh } = attrs;
    const style = styles.input.operations;

    return m(
      'div.v.ops-panel',
      m('div.v.edit-ops', [
        m(ImageButton, {
          image: OperationButtons.delete.glyph,
          onPress: () => {
            deleteMark();
            refresh();
          },
          style: [style[OperationButtons.delete.style], dims.getSquareOperationButtonStyle()],
        }),
        m(ImageButton, {
          image: OperationButtons.newline.glyph,
          onPress: () => {
            newline();
            refresh();
          },
          style: [style[OperationButtons.newline.style], dims.getSquareOperationButtonStyle()],
        }),
        m(FileOperationsView, { download, upload, toPDF, clear, isScoreNonEmpty }),
      ])
    );
  },
};
