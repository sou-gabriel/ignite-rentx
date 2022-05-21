/**
 * O código executado pelo react-native-reanimated é executado numa thread separada, na thread da UI. 
 **/

import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'

import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated'

import {
  Container
} from './styles'

export const Splash = () => {
  const navigation = useNavigation()
  const splashAnimation = useSharedValue(0)

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {translateX: interpolate(splashAnimation.value, [0, 50], [0, -50], Extrapolate.CLAMP)}
      ]
    }
  })
  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1]),
      transform: [
        {translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0], Extrapolate.CLAMP)}
      ]
    }
  })

  const startApp = () => {
    navigation.navigate('SignIn')
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50, 
      { duration: 1000 }, 
      () => {
        'worklet'
        runOnJS(startApp)() // Redirecionando a chamada da função startApp para a main thread do JavaScript. 
      }
    )
  }, [])

  return (
    <Container>

    </Container>
  )
}
