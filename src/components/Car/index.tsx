import { useNetInfo } from '@react-native-community/netinfo'
import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Car as CarModel } from '../../database/models/Car'
import { getAccessoriesIcon } from '../../utils/getAccessoryIcon'

import { 
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles'

interface CarProps extends RectButtonProps {
  data: CarModel
}

export const Car = ({ data, ...rest }: CarProps) => {
  const netInfo = useNetInfo()
  const MotorIcon = getAccessoriesIcon(data.fuel_type)
  
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${netInfo.isConnected ? data.price : '...'}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage 
        source={{ uri: data.thumbnail }} 
        resizeMode="contain"
      />
    </Container>
  )
}