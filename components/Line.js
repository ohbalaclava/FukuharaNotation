import React, { useContext } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native-web'
import PropTypes from 'prop-types'

import Mark from './Mark'
import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import Cursor from './Cursor'

Line.propTypes = {
  line: PropTypes.array.isRequired,
  onPressMark: PropTypes.func.isRequired,
  cursorIndex: PropTypes.number.isRequired,
  markLengths: PropTypes.number.isRequired
}

const paddingButtonStyles = StyleSheet.create({
  container: {
    flex: 'auto'
  },
  top: {
    flex: 'initial',
    borderTopColor: 'white',
    borderTopStyle: 'dashed',
    borderTopWidth: '1px'
  },
  bottom: {
    flex: 'auto',
    borderBottomColor: 'white',
    borderBottomStyle: 'dashed',
    borderBottomWidth: '1px'
  }
})

export default function Line ({ line, onPressMark, cursorIndex, markLengths }) {
  const { dimensions } = useContext(DimensionsContext)
  const defaultButtonSize = {
    width: dimensions.getLineWidth(),
    height: dimensions.getLineEndButtonHeight(),
    marginRight: dimensions.getLineSeparation()
  }

  return (
    <View style={paddingButtonStyles.container}>
      <Pressable style={[paddingButtonStyles.top, defaultButtonSize]} onPress={() => onPressMark(0)}>
        <View/>
      </Pressable>
      <FlatList
        style={[styles.score.line, { paddingRight: dimensions.getLinePaddingRight() }]}
        numColumns='1'
        data={line}
        renderItem={({ item, index }) => <Mark mark={item} onPress={() => onPressMark(index + 1)}/> }
        keyExtractor={(item) => item.id}
      />
      <Pressable style={[paddingButtonStyles.bottom, defaultButtonSize]} onPress={() => onPressMark()}>
        <View/>
      </Pressable>
      {(cursorIndex >= 0) ? <Cursor markLengths={markLengths}/> : <noscript/>}
    </View>
  )
}
