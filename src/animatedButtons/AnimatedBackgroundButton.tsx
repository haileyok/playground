import React from 'react'
import { ColorValue, Pressable, StyleSheet } from 'react-native'
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
  mainBackgroundColor: ColorValue
  secondaryBackgroundColor: ColorValue
}

export function AnimatedBackgroundButton({
  onPress,
  mainBackgroundColor,
  secondaryBackgroundColor,
  children,
}: IProps) {
  const backgroundOpacity = useSharedValue(0)
  const borderWidth = useSharedValue(20)
  const scale = useSharedValue(1)

  const onPressWrapper = React.useCallback(() => {
    onPress?.()

    runOnUI(runAnimation)()
  }, [onPress, mainBackgroundColor, secondaryBackgroundColor])

  const reset = () => {
    'worklet'
    backgroundOpacity.value = withTiming(0, { duration: 200 }, () => {
      borderWidth.value = 20
    })
  }

  const runAnimation = () => {
    'worklet'
    scale.value = withSequence(
      withTiming(1.2, { duration: 150 }),
      withTiming(1, { duration: 200 }),
    )

    backgroundOpacity.value = withTiming(0.75, { duration: 200 }, () => {
      borderWidth.value = withTiming(0, { duration: 300 }, reset)
    })
  }

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity.value}`,
    transform: [{ scale: scale.value }],
  }))

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
    borderWidth: borderWidth.value,
  }))

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[
          backgroundStyle,
          styles.background,
          {
            backgroundColor: mainBackgroundColor,
            borderColor: secondaryBackgroundColor,
          },
        ]}
      />
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
  background: {
    position: 'absolute',
    borderRadius: 100,
    height: 40,
    width: 40,
  },
})
