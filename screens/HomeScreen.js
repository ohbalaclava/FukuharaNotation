import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, Button, View, ImageBackground } from 'react-native'

import { ScoreContext } from '../model/Score'
import styles from '../styles/ScreenStyles'
import ScoreView from '../views/ScoreView'
import NoteSelectView from '../views/NoteSelectView'
import AccidentalSelectView from './AccidentalSelectView.js'
import OperationsView from './OperationsView.js'

export default function HomeScreen ({ navigation }) {
  const { score, setDirty } = useContext(ScoreContext)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main.view}>
        <View style={styles.input.view}>
          <ImageBackground style={styles.input.bamboo} source={require('../assets/bamboo.png')}>
            <NoteSelectView addNote={score.addNote} setDirty={setDirty}/>
            <AccidentalSelectView addAccidental={score.addAccidental} setDirty={setDirty}/>
            <OperationsView delete={score.deleteMark} newline={score.newLine} setDirty={setDirty}/>
          </ImageBackground>
          <Button
            title='Phrases'
            onPress={() => navigation.navigate('Library')}
          />
        </View>
        <ScoreView score={score}/>
      </View>
    </SafeAreaView>
  )
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
