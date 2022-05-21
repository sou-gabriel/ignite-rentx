import styled from 'styled-components/native'
import { ReactNode } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

interface IButtonProps {
  color?: string
  children: ReactNode | ReactNode[]
}

interface IButtonTextProps {
  light: boolean
}

export const Container = styled(RectButton)<IButtonProps>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color, theme }) => color || theme.colors.main};
  margin-bottom: 8px;
`

export const Title = styled.Text<IButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.shape};
`