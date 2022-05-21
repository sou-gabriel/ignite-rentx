import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import {
  Container,
  IconContainer,
  InputText
} from './styles'

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
  value?: string
}

export const Input = ({ iconName, value, ...rest }: IInputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  
  const theme = useTheme()

  const handleInputFocus = () => {
    setIsFocused(true)
  }

  const handleInputBlur = () => {
    setIsFocused(false)
    setIsFilled(!!value)
  }
  
  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
         isFocused={isFocused}
        {...rest} 
      />
    </Container>
  )
}