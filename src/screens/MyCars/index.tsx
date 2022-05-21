import React, { useState, useEffect } from 'react'
import { StatusBar, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import { Car } from '../../components/Car'
import { BackButton } from '../../components/BackButton'
import { AnimatedLoading } from '../../components/AnimatedLoading'
import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'
import { 
  Container,
  Header,
  Title, 
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles'

interface Cars {
  id: string
  user_id: string
  car: CarDTO
  startDate: string
  endDate: string
}

export const MyCars = () => {
  const [cars, setCars] = useState<Cars[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const theme = useTheme()
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/schedules_byuser?user_id=1')
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [])

  return (
    <Container>
      <StatusBar 
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      <Header>
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>   

        <Subtitle>Conforto, segurança e praticidade</Subtitle>     
      </Header>

      {isLoading ? (
        <AnimatedLoading />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  )
}