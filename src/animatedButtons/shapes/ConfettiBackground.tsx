import React from 'react'
import Animated from 'react-native-reanimated'
import { ConfettiItem } from './ConfettiItem'
import { StyleSheet } from 'react-native'

interface IProps {
  size: number
  diamondStartColor: string
  diamondEndColor: string
  circleStartColor: string
  circleEndColor: string
}

export function ConfettiBackground({
  size,
  diamondStartColor,
  diamondEndColor,
  circleStartColor,
  circleEndColor,
}: IProps) {
  const translationOne = size * 0.7
  const translationTwo = size * 0.5

  return (
    <Animated.View style={[styles.container]}>
      <ConfettiItem
        translation={{ x: 0, y: translationOne }}
        startColor={diamondStartColor}
        endColor={diamondEndColor}
        type="diamond"
      />
      <ConfettiItem
        translation={{ x: translationOne, y: 0 }}
        startColor={diamondStartColor}
        endColor={diamondEndColor}
        type="diamond"
      />
      <ConfettiItem
        translation={{ x: 0, y: -translationOne }}
        startColor={diamondStartColor}
        endColor={diamondEndColor}
        type="diamond"
      />
      <ConfettiItem
        translation={{ x: -translationOne, y: 0 }}
        startColor={diamondStartColor}
        endColor={diamondEndColor}
        type="diamond"
      />
      <ConfettiItem
        translation={{ x: translationTwo, y: translationTwo }}
        startColor={circleStartColor}
        endColor={circleEndColor}
        type="circle"
      />
      <ConfettiItem
        translation={{ x: -translationTwo, y: -translationTwo }}
        startColor={circleStartColor}
        endColor={circleEndColor}
        type="circle"
      />
      <ConfettiItem
        translation={{ x: -translationTwo, y: translationTwo }}
        startColor={circleStartColor}
        endColor={circleEndColor}
        type="circle"
      />
      <ConfettiItem
        translation={{ x: translationTwo, y: -translationTwo }}
        startColor={circleStartColor}
        endColor={circleEndColor}
        type="circle"
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
