import m from 'mithril';

import ImageButton from '../components/ImageButton';
import styles from '../styles/ScreenStyles';
import { OperationButtons } from '../data/ButtonDefinitions';
import { dims } from '../data/dimensionsStore';
import ConfirmClearDialog from '../components/ConfirmClearDialog';
import BusyDialog from '../components/BusyDialog';

export default function FileOperationsView() {
  let visible = false;

  return {
    view({ attrs }) {
      const { download, upload, toPDF, clear, isScoreNonEmpty } = attrs;
      const style = styles.input.operations;

      const toggleMenu = () => {
        visible = !visible;
      };

      const getRunAndCloseFunc = (buttonFunc) => () => {
        buttonFunc();
        toggleMenu();
      };

      const opStyle = (name) => [
        style[OperationButtons[name].style],
        dims.getSquareOperationButtonStyle(),
      ];

      return m('div.v', [
        m(ImageButton, {
          image: OperationButtons.menu.glyph,
          onPress: toggleMenu,
          style: opStyle('menu'),
        }),

        m('div.v.file-ops-menu' + (visible ? '.open' : ''), [
          m(ImageButton, {
            image: OperationButtons.download.glyph,
            onPress: getRunAndCloseFunc(download),
            style: opStyle('download'),
          }),
          m(ConfirmClearDialog, {
            isConfirmationRequired: isScoreNonEmpty,
            onYes: getRunAndCloseFunc(upload),
            onNo: toggleMenu,
            trigger: (open) =>
              m(ImageButton, {
                image: OperationButtons.upload.glyph,
                onPress: open,
                style: opStyle('upload'),
              }),
          }),
          m(BusyDialog, {
            message: 'Generating PDF',
            workFunc: getRunAndCloseFunc(toPDF),
            trigger: (start) =>
              m(ImageButton, {
                image: OperationButtons.pdf.glyph,
                onPress: start,
                style: opStyle('pdf'),
              }),
          }),
          m(ConfirmClearDialog, {
            isConfirmationRequired: isScoreNonEmpty,
            onYes: getRunAndCloseFunc(clear),
            onNo: toggleMenu,
            trigger: (open) =>
              m(ImageButton, {
                image: OperationButtons.clear.glyph,
                onPress: open,
                style: opStyle('clear'),
              }),
          }),
        ]),
      ]);
    },
  };
}
