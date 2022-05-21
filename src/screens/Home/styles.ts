import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'

import { Car } from '../../database/models/Car'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Header = styled.View`
  width: 100%;
  height: 113px;
  padding: 32px 24px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.header};
`

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`

export const CarList = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 24
  },
  showsVerticalHorizontalIndicator: false
})`` as React.ComponentType as new <Car>() => FlatList<Car>

export const MyCarsButton = styled(RectButton)`
  width: 60px;
  height: 60px;

  border-radius: 30px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.main};

  position: absolute;
  bottom: 13px;
  right: 22px;
`
