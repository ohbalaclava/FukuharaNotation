import m from 'mithril';

import bambooPng from '../assets/bamboo.png';
import styles from '../styles/ScreenStyles';
import Background from '../components/Background';
import { createScore } from '../model/Score';
import ScoreTitle from '../components/ScoreTitle';
import { download, uploadJson } from '../tools/Persistence';
import { dims } from '../data/dimensionsStore';
import { toCSS } from '../styles/StyleUtils';
import ScoreMarksSelectView from './ScoreMarksSelectView';
import EditOperationsView from './EditOperationsView';
import ImageButton from '../components/ImageButton';
import { OperationButtons } from '../data/ButtonDefinitions';
import getPDFScore from '../model/PDFScore';

const border = {
  colour: 'grey',
  radius: 5,
  width: 1,
};

export default function InputView() {
  let visible = true;

  return {
    view({ attrs }) {
      const { score, refresh } = attrs;

      function toggleInput() {
        visible = !visible;
      }

      function setError(_name, _message) {
        // TODO
      }

      function getFilename(extension) {
        const title = score.getTitle();
        return `${title && title.length > 0 ? title : 'untitled'}.shinobue.${extension}`;
      }

      function downloadJson() {
        download({
          filename: getFilename('json'),
          mimeType: 'application/json',
          data: score.serialise(),
        });
      }

      function downloadPDF() {
        getPDFScore(score).save(getFilename('pdf'));
      }

      function upload() {
        uploadJson({
          onload: (json) => {
            json.join = score.getJoin();
            refresh(createScore(json));
          },
          onerror: (name, message) => {
            setError(name, message);
          },
        });
      }

      function clear() {
        score.clear();
        refresh();
      }

      return m('div.v', { style: { width: 'min-content' } }, [
        m(ImageButton, {
          image: OperationButtons.showhide.glyph,
          onPress: toggleInput,
          style: [
            styles.input.operations[OperationButtons.showhide.style],
            dims.getShowHideButtonStyle(),
            {
              transform: `translate(-50%, -50%) rotate(${visible ? 0 : 180}deg)`,
              transition: 'transform 0.3s ease',
            },
          ],
        }),

        m(
          'div.v.input-panel' + (visible ? '' : '.hidden'),
          { style: toCSS(dims.getInputViewStyle()) },
          [
            m(Background, { border, source: bambooPng }),
            m(ScoreTitle, {
              title: score.getTitle(),
              author: score.getAuthor(),
              notes: score.getNotes(),
              onOK: (title, author, notes) => {
                score.setTitle(title);
                score.setAuthor(author);
                score.setNotes(notes);
                refresh();
              },
            }),
            m(ScoreMarksSelectView, {
              addNote: score.addNote,
              addAccidental: score.addAccidental,
              addStroke: score.addStroke,
              addDecoration: score.addDecoration,
              setJoin: score.setJoin,
              refresh,
            }),
            m(EditOperationsView, {
              deleteMark: score.deleteMark,
              newline: score.newLine,
              refresh,
              download: downloadJson,
              upload,
              toPDF: downloadPDF,
              clear,
              isScoreNonEmpty: () => !score.isEmpty(),
            }),
          ]
        ),
      ]);
    },
  };
}
