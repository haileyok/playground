import { Button, ScrollView, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export function IndexScreen({ navigation }: NativeStackScreenProps<any>) {
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Button
          title="Giphy Search"
          onPress={() => {
            navigation.navigate('GiphySearch')
          }}
        />
        <Button
          title="Animated Buttons"
          onPress={() => {
            navigation.navigate('AnimatedButtons')
          }}
        />
      </View>
    </ScrollView>
  )
}
