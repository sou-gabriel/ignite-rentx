import React from 'react'
import { SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components'

import {
  Container,
  Name,
} from './styles'

interface IAcessoryProps {
  name: string
  icon: React.FC<SvgProps>
}

export const Accessory = ({ name, icon: Icon }: IAcessoryProps) => {
  // const theme = useTheme()
  
  return (
    <Container>
      <Icon width={32} height={32} />
      <Name>{name}</Name>
    </Container>
  )
}