import React, { useContext, useState } from 'react'
import { SafeAreaView, View } from 'react-native-web'

import { createEmptyScore } from '../model/Score'
import styles from '../styles/ScreenStyles'
import ScoreView from '../views/ScoreView'
import InputView from '../views/InputView'
import { DimensionsContext } from '../data/Dimensions'

export default function HomeScreen () {
  const [score, setScore] = useState(() => createEmptyScore())
  const { dimensions } = useContext(DimensionsContext)
  const refresh = (newScore) => setScore(newScore || score.clone())

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.main.view, ...dimensions.getWindowStyle() }}>
        <ScoreView score={score} refresh={refresh}/>
        <InputView score={score} refresh={refresh}/>
      </View>
    </SafeAreaView>
  )
}
