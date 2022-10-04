import React from 'react'
import { useWindowDimensions } from 'react-native-web'
import Dimensions, { DimensionsContext } from './data/Dimensions'

import HomeScreen from './screens/HomeScreen'

export default function App () {
  const dimensions = Dimensions(useWindowDimensions())

  return (
    <DimensionsContext.Provider value = { { dimensions } }>
      <HomeScreen/>
    </DimensionsContext.Provider>
  )
}
