import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};

  padding-top: 66px;
`

export const LogoContainer = styled.View`
  height: 235px;
`

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
`

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  line-height: 25px;
  text-align: center;

  margin-top: 16px;
  margin-bottom: 80px;
`

export const Footer = styled.View`
  align-items: center;
  margin-bottom: ${getBottomSpace() + 46}px;
`
