import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

interface IProps {
  isFocused: boolean
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(8)}px;
`

export const IconContainer = styled.View<IProps>`
  height: ${RFValue(56)}px;
  width: ${RFValue(55)}px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main}
  `}
`

export const InputText = styled.TextInput<IProps>`
  flex: 1;
  
  height: ${RFValue(56)}px;
  width: ${RFValue(55)}px;
  padding: ${RFValue(20)}px ${RFValue(23)}px ${RFValue(18)}px;

  border-left-width: 2px;
  border-left-color: ${({ theme }) => theme.colors.background_primary};

  background-color: ${({ theme }) => theme.colors.background_secondary};
  
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main}
  `}
`
