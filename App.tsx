import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { IndexScreen } from './src/IndexScreen'
import { GiphySearchScreen } from './src/giphy/GiphySearchScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="GiphySearch" component={GiphySearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
