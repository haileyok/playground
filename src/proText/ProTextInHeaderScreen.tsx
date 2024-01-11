import React from 'react'
import { Tabs } from 'react-native-collapsible-tab-view'
import { Alert, ScrollView, Text, View } from 'react-native'

export function ProTextInHeaderScreen() {
  return (
    <Tabs.Container
      pagerProps={{
        scrollEnabled: false,
        offscreenPageLimit: 1,
      }}
      headerContainerStyle={{ backgroundColor: 'blue', padding: 0 }}
      renderHeader={() => (
        <View>
          <Text
            onPress={() => {
              Alert.alert('Press')
            }}
            onLongPress={() => {
              Alert.alert('Long Press')
            }}
          >
            Hello
          </Text>
          <Text>How are you</Text>
          <Text>Goodbye</Text>
        </View>
      )}
    >
      <Tabs.Tab name="Hello">
        <ScrollView style={{ height: '100%', backgroundColor: 'red' }}>
          <Text>Hello Tab</Text>
          <Text>Hello Tab</Text>
          <Text>Hello Tab</Text>
          <Text>Hello Tab</Text>
          <Text>Hello Tab</Text>
          <Text>Hello Tab</Text>
        </ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  )
}
