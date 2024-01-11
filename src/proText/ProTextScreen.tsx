import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { ProText } from '../../modules/expo-pro-text'

export function ProTextScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightblue',
        justifyContent: 'space-evenly',
      }}
      pointerEvents="box-none"
    >
      <ProText selectable>
        <Text
          style={{ fontSize: 25, color: '#FF0000FF' }}
          onPress={() => {
            Alert.alert('pressed this part of text')
          }}
        >
          This is UITextView (custom module). I'm also pressable.
        </Text>
        <Text style={{ fontSize: 20 }}>I'm not pressable though :(</Text>
      </ProText>
      <Text
        style={{ color: '#FF0000FF', fontSize: 20 }}
        onPress={() => {
          Alert.alert('onPress')
        }}
      >
        This is UILabel (react native Text)
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
