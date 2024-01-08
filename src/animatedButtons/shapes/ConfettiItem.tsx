import React from 'react'
import Animated, {
  Easing,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native'

interface Translation {
  x: number
  y: number
}

interface IProps {
  translation: Translation
  startColor: string
  endColor: string
  type: 'circle' | 'diamond'
}

export function ConfettiItem({
  translation,
  startColor,
  endColor,
  type,
}: IProps) {
  const x = useSharedValue(0)
  const y = useSharedValue(0)
  const opacity = useSharedValue(1)
  const scale = useSharedValue(1)
  const backgroundColor = useSharedValue(startColor)

  const runAnimation = () => {
    'worklet'
    // Move the star to the selected position
    x.value = withTiming(translation.x, {
      duration: 250,
      easing: Easing.out(Easing.poly(4)),
    })
    y.value = withTiming(translation.y, {
      duration: 250,
      easing: Easing.out(Easing.poly(4)),
    })

    // Shrink the stars
    scale.value = withTiming(0.5, { duration: 250 })
    // Change the background color
    backgroundColor.value = withDelay(
      50,
      withTiming(endColor, { duration: 250 }),
    )
    // Fade out the confetti
    opacity.value = withDelay(250, withTiming(0, { duration: 200 }))
  }

  // Run the animation on mount
  React.useEffect(() => {
    runOnUI(runAnimation)()
  }, [])

  const posStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
      { rotate: `${Math.random() * 360}deg` },
    ],
    opacity: opacity.value,
    backgroundColor: backgroundColor.value,
  }))

  if (type === 'diamond') {
    return <Animated.View style={[styles.diamond, posStyle]} />
  }

  return <Animated.View style={[styles.circle, posStyle]} />
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    borderRadius: 100,
    height: 4,
    width: 4,
  },
  diamond: {
    position: 'absolute',
    height: 6,
    width: 3,
  },
})
