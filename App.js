import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { createEmptyScore, ScoreContext } from './model/Score'
import HomeScreen from './screens/HomeScreen'
import LibraryScreen from './screens/LibraryScreen'

const Stack = createNativeStackNavigator()

export default function App () {
  const [score, setScore] = useState(createEmptyScore())
  const setDirty = () => {
    setScore(score.clone())
  }

  return (
    <ScoreContext.Provider value = { { score, setDirty } }>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Shinobue Score' }}
          />
          <Stack.Screen
            name="Library"
            component={LibraryScreen}
            options={{ title: 'Phrases' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ScoreContext.Provider>
  )
}
