import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import { AnimatedScaleButton } from './AnimatedScaleButton'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { AnimatedBackgroundButton } from './AnimatedBackgroundButton'

export function AnimatedButtonsScreen({
  navigation,
}: NativeStackScreenProps<any>) {
  return (
    <View style={styles.container}>
      <Text>Simple scale</Text>
      <AnimatedScaleButton onPress={() => {}}>
        <Ionicons name="chatbubble-outline" size={24} color="black" />
      </AnimatedScaleButton>
      <Text>Animated Background</Text>
      <AnimatedBackgroundButton
        mainBackgroundColor="red"
        secondaryBackgroundColor="purple"
        onPress={() => {}}
      >
        <FontAwesome name="refresh" size={24} color="black" />
      </AnimatedBackgroundButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    paddingTop: 10,
  },
})
