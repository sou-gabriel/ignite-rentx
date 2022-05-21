import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { format } from 'date-fns'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'

import { getAccessoriesIcon } from '../../utils/getAccessoryIcon'
import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'
import { getPlatformDate } from '../../utils/getPlatformDate'

import { 
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles'

interface Params {
  car: CarDTO
  dates: string[]
}

interface IRentalPeriod {
  start: string
  end: string
}

export const SchedulingDetails = () => {
  const [rentalPeriod, setRentalPeriod] = useState({} as IRentalPeriod)
  const [isLoading, setIsLoading] = useState(false)

  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()

  const { car, dates } = route.params as Params

  const rentalTotal = dates.length * car.rent.price

  const handleConfirmRental = async () => {
    try {
      setIsLoading(true)
      
      const response = await api.get(`/schedules_bycars/${car.id}`)    
      const unavailable_dates = [
        ...response.data.unavailable_dates,
        ...dates
      ]

      await api.post('schedules_byuser', {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
      })
  
      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      })

      navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: 'Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.',
        nextScreen: 'Home'
      })
    } catch {
      Alert.alert('Não foi possível confirmar o agendamento')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>

            <Rent>
              <Period>{car.rent.period}</Period>
              <Price>R$ {car.rent.price}</Price>
            </Rent>
          </Description>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory 
              key={accessory.type} 
              name={accessory.name} 
              icon={getAccessoriesIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora" 
          color={theme.colors.success} 
          onPress={handleConfirmRental}
          enabled={!isLoading}
          isLoading={isLoading} 
        />
      </Footer>
    </Container>
  )
}