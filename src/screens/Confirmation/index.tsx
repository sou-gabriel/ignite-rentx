import React from 'react'
import { StatusBar } from 'react-native'
import { useWindowDimensions } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { ConfirmButton } from '../ConfirmButton'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import { 
  Container,
  LogoContainer,
  Content,
  Title,
  Message, 
  Footer
} from './styles'

interface IParams {
  title: string
  message: string
  nextScreen: 'SignIn' | 'Home'
}

export const Confirmation = () => {
  const { width } = useWindowDimensions()
  const navigation = useNavigation()
  const route = useRoute()

  const { title, message, nextScreen } = route.params as IParams

  const handleConfirm = () => {
    navigation.navigate(nextScreen)
  }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoContainer>
        <LogoSvg width={width} />
      </LogoContainer>
      
      <Content>
        <DoneSvg width={88} height={88} />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>
      
      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  )
}