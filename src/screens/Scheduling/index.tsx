import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'


import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Calendar, IDayProps, IMarkedDateProps } from '../../components/Calendar'
import { generateInterval } from '../../components/Calendar/generateInterval'

import { CarDTO } from '../../dtos/CarDTO'

import { getPlatformDate } from '../../utils/getPlatformDate'

import ArrowSvg from '../../assets/arrow.svg'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles'

interface IRentalPeriod {
  startFormatted: string
  endFormatted: string
}

interface Params {
  car: CarDTO
}

export const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState({} as IDayProps)
  const [markedDates, setMarkedDates] = useState({} as IMarkedDateProps)
  const [rentalPeriod, setRentalPeriod] = useState({} as IRentalPeriod)

  const route = useRoute()
  const theme = useTheme()
  const navigation = useNavigation()

  const { car } = route.params as Params

  const handleConfirmRental = () => {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates)
    })
  }

  const handleBack = () => {
    navigation.goBack()
  }

  const handleChangeDate = (date: IDayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectedDate(end)

    const interval = generateInterval(start, end)

    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    })
  }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton onPress={handleBack} color={theme.colors.shape} />      

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue 
              isSelected={Boolean(rentalPeriod.startFormatted)}
            >
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue 
              isSelected={Boolean(rentalPeriod.endFormatted)}
            >
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button 
          title="Confirmar" 
          enabled={Boolean(rentalPeriod.startFormatted)}
          onPress={handleConfirmRental} 
        />
      </Footer>
    </Container>
  )
}