import React, { useContext, useState } from 'react'
import { View } from 'react-native-web'
import { animated, config, useSpring } from 'react-spring'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import Background from '../components/Background'
import { createScore } from '../model/Score'
import ScoreTitle from '../components/ScoreTitle'
import { download, uploadJson } from '../tools/Persistence'
import { DimensionsContext } from '../data/Dimensions'
import ScoreMarksSelectView from './ScoreMarksSelectView'
import EditOperationsView from './EditOperationsView'
import ImageButton from '../components/ImageButton'
import { OperationButtons } from '../data/ButtonDefinitions'
import getPDFScore from '../model/PDFScore'

InputView.propTypes = {
  score: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
}

const AnimatedView = animated(View)

export default function InputView ({ score, refresh }) {
  const { dimensions } = useContext(DimensionsContext)
  const [visible, setVisible] = useState(true)

  const { transform, opacity, width } = useSpring({
    width: visible ? 350 : 20,
    opacity: visible ? 1 : 0,
    transform: `perspective(600px) rotateY(${visible ? 90 : 0}deg)`,
    transformShowHide: `rotate(${visible ? 180 : 0}deg)`,
    config: config.default
  })

  const border = {
    colour: 'grey',
    radius: 5,
    width: 1
  }

  function toggleInput () {
    setVisible(!visible)
  }

  function setError (name, message) {
    // TODO
  }

  function getFilename (extension) {
    const title = score.getTitle()
    return `${(title && title.length > 0) ? title : 'untitled'}.shinobue.${extension}`
  }

  function downloadJson () {
    download({ filename: getFilename('json'), mimeType: 'application/json', data: score.serialise() })
  }

  function downloadPDF () {
    getPDFScore(score).save(getFilename('pdf'))
  }

  function upload () {
    uploadJson({
      onload: (json) => {
        refresh(createScore(json))
      },
      onerror: (name, message) => {
        setError(name, message)
      }
    })
  }

  function clear () {
    score.clear()
    refresh()
  }

  return (
    <View style={{ width: 'min-content' }}>
      <ImageButton
        image={OperationButtons.showhide.glyph}
        onPress={toggleInput}
        style={Object.assign(
          {},
          styles.input.operations[OperationButtons.showhide.style],
          dimensions.getShowHideButtonStyle(),
          { transform: `translate(-50%, -50%) rotate(${visible ? 0 : 180}deg)` }
        )}
      />

      <AnimatedView style={Object.assign({}, styles.input.view, dimensions.getInputViewStyle(), { opacity, width, transform, rotateY: '-90deg' })}>
        <Background border={border} source={require('../assets/bamboo.png')}/>
        <ScoreTitle
          title={score.getTitle()}
          notes={score.getNotes()}
          onOK={(title, notes) => { score.setTitle(title); score.setNotes(notes); refresh() }}
        />
        <ScoreMarksSelectView
          addNote={score.addNote}
          addAccidental={score.addAccidental}
          addStroke={score.addStroke}
          addDecoration={score.addDecoration}
          setJoin={score.setJoin}
          refresh={refresh}
        />
        <EditOperationsView
          deleteMark={score.deleteMark}
          newline={score.newLine}
          refresh={refresh}
          download={downloadJson}
          upload={upload}
          toPDF={downloadPDF}
          clear={clear}
          isScoreNonEmpty={() => !score.isEmpty()}
        />
      </AnimatedView>
    </View>
  )
}
