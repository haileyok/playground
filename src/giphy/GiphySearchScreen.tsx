import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

export function GiphySearchScreen({ navigation }: NativeStackScreenProps<any>) {
  return (
    <View style={{ flex: 1 }}>
      <Text>Hello!</Text>
    </View>
  )
}
