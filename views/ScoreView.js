import React, { useContext } from 'react'
import { View, FlatList } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import Cursor from '../components/Cursor'
import Line from '../components/Line'
import { DimensionsContext } from '../data/Dimensions'

ScoreView.propTypes = {
  score: PropTypes.shape({
    getLines: PropTypes.func.isRequired,
    getLineCount: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    getCurrentLineIndex: PropTypes.func.isRequired,
    getCurrentMarkIndex: PropTypes.func.isRequired,
    goto: PropTypes.func.isRequired
  }).isRequired,
  refresh: PropTypes.func.isRequired
}

function renderLine ({ line, index, goto, refresh }) {
  return (
    <Line line={line} onPressMark={(markIndex) => { goto(index, markIndex); refresh() }}/>
  )
}

export default function ScoreView ({ score, refresh }) {
  const { dimensions } = useContext(DimensionsContext)

  const lineWidth = dimensions.getLineFullWidth()

  return (
    <View style={styles.score}>
      <FlatList
        style={styles.score.lines}
        contentContainerStyle={[styles.score.lines.content, { paddingRight: lineWidth * 1.5 }]}
        horizontal
        inverted
        data={score.getLines()}
        renderItem={({ item, index }) => {
          return renderLine({
            line: item,
            index,
            goto: score.goto,
            refresh
          })
        }}
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => ({ length: lineWidth, offset: lineWidth * index, index })}
        ref={(ref) => {
          score.onEdit(() => {
            ref.scrollToIndex({
              index: score.getCurrentLineIndex()
            })
          })
        }}
        onScroll={(event) => {
          dimensions.setScoreScrollOffset(event.nativeEvent.contentOffset.x)
        }}
        pagingEnabled
      />
      <Cursor line={score.getCurrentLineIndex()} mark={score.getCurrentMarkIndex()}/>
    </View>
  )
}
