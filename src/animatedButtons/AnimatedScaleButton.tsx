import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface IProps {
  children: React.ReactNode
  onPress?: () => void
  growScale?: number
}

export function AnimatedScaleButton({
  onPress,
  growScale = 1.2,
  children,
}: IProps) {
  const scale = useSharedValue(1)

  const onPressWrapper = React.useCallback(() => {
    onPress?.()

    runOnUI(runAnimation)()
  }, [onPress, growScale])

  const runAnimation = () => {
    'worklet'

    scale.value = withSequence(
      withTiming(growScale, { duration: 100 }),
      withTiming(1, { duration: 200 }),
    )
  }

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={[styles.container, buttonStyle]}>
      <Pressable onPress={onPressWrapper}>{children}</Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
