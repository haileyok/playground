import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { IndexScreen } from './src/IndexScreen'
import { GiphySearchScreen } from './src/giphy/GiphySearchScreen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatedButtonsScreen } from './src/animatedButtons/AnimatedButtonsScreen'
import { ProTextScreen } from './src/proText/ProTextScreen'
import { ProTextInHeaderScreen } from './src/proText/ProTextInHeaderScreen'

const Stack = createNativeStackNavigator()
export const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Index" component={IndexScreen} />
          <Stack.Screen name="GiphySearch" component={GiphySearchScreen} />
          <Stack.Screen
            name="AnimatedButtons"
            component={AnimatedButtonsScreen}
          />
          <Stack.Screen name="ProText" component={ProTextScreen} />
          <Stack.Screen
            name="ProTextScrollHeader"
            component={ProTextInHeaderScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}
