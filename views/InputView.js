import React, { useContext } from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import Background from '../components/Background'
import OperationsView from './OperationsView.js'
import { createScore } from '../model/Score'
import ScoreTitle from '../components/ScoreTitle'
import { downloadJson, uploadJson } from '../tools/Persistence'
import ScoreMarksView from './ScoreMarksView'
import { DimensionsContext } from '../data/Dimensions'

InputView.propTypes = {
  score: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function InputView ({ score, refresh }) {
  const { dimensions } = useContext(DimensionsContext)

  const border = {
    colour: 'grey',
    radius: 5,
    width: 1
  }

  function setError (name, message) {
    // TODO
  }

  function download () {
    const title = score.getTitle()
    const filename = `${(title && title.length > 0) ? title : 'untitled'}.shinobue.json`

    downloadJson({ filename, json: score.serialise() })
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

  function toPDF () {}

  return (
    <View style={[styles.input.view, dimensions.getInputViewStyle()]}>
      <Background border={border} source={require('../assets/bamboo.png')}/>
      <ScoreTitle
        title={score.getTitle()}
        notes={score.getNotes()}
        onOK={(title, notes) => { score.setTitle(title); score.setNotes(notes) }}
      />
      <ScoreMarksView
        addNote={score.addNote}
        addAccidental={score.addAccidental}
        addUnit={score.addUnit}
        addDecoration={score.addDecoration}
        refresh={refresh}/>
      <OperationsView deleteMark={score.deleteMark} newline={score.newLine} refresh={refresh} download={download} upload={upload} toPDF={toPDF}/>
    </View>
  )
}
