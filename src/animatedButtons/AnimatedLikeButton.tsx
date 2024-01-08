import React from 'react'

import { Pressable, StyleSheet } from 'react-native'
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { ConfettiBackground } from './shapes/ConfettiBackground'

interface IProps {
  onPress: () => void
  unlikedColor: string
  backgroundColor: string
  size: number
  liked: boolean
  diamondStartColor: string
  diamondEndColor: string
  circleStartColor: string
  circleEndColor: string
}

export function AnimatedLikeButton({
  onPress,
  unlikedColor,
  size,
  backgroundColor,
  liked,
  diamondStartColor,
  diamondEndColor,
  circleStartColor,
  circleEndColor,
}: IProps) {
  const [isLikedIcon, setIsLikedIcon] = React.useState(liked)
  const [showConfetti, setShowConfetti] = React.useState(false)

  const prev = React.useRef(liked)

  const backgroundOpacity = useSharedValue(0)
  const borderWidth = useSharedValue(size * 0.8)
  const scale = useSharedValue(1)
  const iconScale = useSharedValue(1)

  const onPressWrapper = React.useCallback(() => {
    onPress()
  }, [onPress])

  React.useEffect(() => {
    if (prev.current === liked) return
    prev.current = liked
    runOnUI(runAnimation)(liked)
  }, [liked])

  const runConfettiAnimation = () => {
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
    }, 500)
  }

  const runAnimation = (liked: boolean) => {
    'worklet'
    // First we run the scale animation
    scale.value = withSequence(
      withTiming(1.2, { duration: 150 }),
      withTiming(1, { duration: 150 }),
    )

    // We next run the icon animation after 150ms
    iconScale.value = withDelay(
      150,
      withSequence(
        withTiming(1.2, { duration: 50 }, () => {
          // We show the confetti and change the icon here
          runOnJS(setIsLikedIcon)(liked)
          if (liked) {
            runOnJS(runConfettiAnimation)()
          }
        }),
        withTiming(1.5, { duration: 20 }),
        withTiming(1, { duration: 80 }),
      ),
    )

    // Run the background animation then reset once finished
    if (liked) {
      backgroundOpacity.value = withTiming(0.6, { duration: 50 })
      borderWidth.value = withTiming(0, { duration: 200 }, () => {
        backgroundOpacity.value = 0
        borderWidth.value = size * 0.8
      })
    }
  }

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity.value}`,
    transform: [{ scale: scale.value }],
  }))

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
    borderWidth: borderWidth.value,
  }))

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }))

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[
          styles.background,
          {
            borderColor: backgroundColor,
            height: size * 1.25,
            width: size * 1.25,
          },
          backgroundStyle,
        ]}
      />
      {showConfetti && (
        <ConfettiBackground
          size={size}
          diamondStartColor={diamondStartColor}
          diamondEndColor={diamondEndColor}
          circleStartColor={circleStartColor}
          circleEndColor={circleEndColor}
        />
      )}
      <Pressable onPress={onPressWrapper}>
        <Animated.View style={iconStyle}>
          {!isLikedIcon ? (
            <Ionicons name="heart-outline" size={size} color={unlikedColor} />
          ) : (
            <Ionicons name="heart" size={size} color="red" />
          )}
        </Animated.View>
      </Pressable>
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
    backgroundColor: 'transparent',
  },
})
