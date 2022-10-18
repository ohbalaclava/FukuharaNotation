import React, { useContext } from 'react'
import { FlatList, View } from 'react-native-web'
import PropTypes from 'prop-types'

import { ScoreMarks } from '../data/ScoreLiterals'
import { DimensionsContext } from '../data/Dimensions'
import ImageButton from '../components/ImageButton'

StrokeSelectView.propTypes = {
  addUnit: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function StrokeSelectView ({ addUnit, refresh }) {
  const { dimensions } = useContext(DimensionsContext)

  const renderUnitButton = ({ item }) => {
    return (
      <ImageButton
        image={item.glyph.white}
        onPress={() => { addUnit(item); refresh() }}
        buttonStyleName='unitButton'
        styleGroup='units'
        otherStyle={dimensions.getUnitButtonStyle(item.glyph.height)}
      />
    )
  }

  return (
    <View>
      <FlatList
        data={ScoreMarks.units}
        renderItem={renderUnitButton}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}
