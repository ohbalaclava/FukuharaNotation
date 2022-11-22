import React, { useContext, useState } from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import { ScoreMarks } from '../data/ScoreLiterals'
import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import Config from '../data/Config'
import GridView from './GridView'
import RadioButtons from '../components/RadioButtons'
import { OctaveButtons } from '../data/ButtonDefinitions'
import AccidentalSelectView from './AccidentalSelectView'

NoteSelectView.propTypes = {
  addNote: PropTypes.func.isRequired,
  addAccidental: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function NoteSelectView ({ addNote, addAccidental, refresh }) {
  const [visibleOctave, setVisibleOctave] = useState(() => 'ryo')
  const { dimensions } = useContext(DimensionsContext)
  const style = styles.input.marks.sections.notes

  const renderNoteButton = ({ item }) => {
    return (
      <ImageButton
        key={item.name}
        highlightColour={Config.inputButtonHighlightColour}
        image={item.glyph.source}
        onPress={() => { addNote(item); refresh() }}
        style={[style.octaves.button, dimensions.getNoteButtonStyle()]}
      />
    )
  }

  function getButtonData () {
    const buttonData = []
    for (const [key, value] of Object.entries(OctaveButtons)) {
      buttonData.push({
        id: key,
        image: value.glyph
      })
    }
    return buttonData
  }

  function getStyle (octave) {
    return (octave === visibleOctave) ? { display: 'flex' } : { display: 'none' }
  }

  return (
    <View style={[style, { height: dimensions.getNoteButtonViewHeight() }]}>
      <RadioButtons
        buttonData={getButtonData()}
        onSelect={(octave) => setVisibleOctave(octave)}
        buttonStyles={dimensions.getOctaveSelectorButtonStyle(style.octaveSelector.button)}
        style={style.octaveSelector}
      />
      <View style={style.octaveView}>
        <View style={style.octaves}>
          <GridView
            noRows={5}
            items={ScoreMarks.notes.ryo}
            renderItem={renderNoteButton}
            style={getStyle('ryo')}
          />
          <GridView
            noRows={4}
            items={ScoreMarks.notes.kan}
            renderItem={renderNoteButton}
            style={getStyle('kan')}
          />
          <GridView
            noRows={3}
            items={ScoreMarks.notes.daikan}
            renderItem={renderNoteButton}
            style={getStyle('daikan')}
          />
        </View>
        <AccidentalSelectView addAccidental={addAccidental} refresh={refresh}/>
      </View>
    </View>
  )
}
