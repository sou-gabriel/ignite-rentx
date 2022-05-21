import React from 'react'
import LottieView from 'lottie-react-native'

import animatedCar from '../../assets/animated_car.json'

import { Container } from './styles'

export const AnimatedLoading = () => {
  return (
    <Container>
      <LottieView 
        source={animatedCar}
        autoPlay
        loop
        resizeMode="contain"
        style={{ height: 200 }}
      />
    </Container>
  )
}