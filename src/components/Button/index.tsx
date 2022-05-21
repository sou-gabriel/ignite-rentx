import React from 'react'
import { ActivityIndicator } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'

import {
  Container,
  Title
} from './styles'

interface IButtonProps extends RectButtonProps {
  title: string
  color?: string
  isLoading?: boolean
  light?: boolean
}

export const Button = ({ 
  title, 
  enabled = true, 
  isLoading = false, 
  light = false,
  ...rest 
}: IButtonProps) => {
  const theme = useTheme()

  return (
    <Container
      enabled={enabled}
      style={{ opacity: !enabled || isLoading ? 0.5 : 1 }}
      {...rest}
    >
      {isLoading 
        ? <ActivityIndicator color={theme.colors.shape} /> 
        : <Title light={light}>{title}</Title>
      }
    </Container>
  )
}