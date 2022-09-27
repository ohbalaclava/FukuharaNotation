import React from 'react'
import { FlatList, View, ImageBackground } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import Cursor from '../components/Cursor'
import Mark from '../components/Mark'

ScoreView.propTypes = {
  score: PropTypes.shape({
    getLines: PropTypes.func.isRequired
  }).isRequired
}

export default function ScoreView (props) {
  return (
    <View style={ styles.score.view }>
      <ImageBackground style={styles.score.paper} source={require('../assets/flecked_paper.jpg')}>
        {props.score.getLines().map((line, index, lines) => {
          const PotentialCursor = () => (index === (lines.length - 1)) ? <Cursor/> : <noscript/>

          return (
            <View key={line.id} style={styles.score.line}>
              <FlatList
                numColumns='1'
                data={line}
                renderItem={({ item }) => <Mark mark={item} /> }
                keyExtractor={(item) => item.id}
              />
              <PotentialCursor/>
            </View>
          )
        })}
      </ImageBackground>
    </View>
  )
}
