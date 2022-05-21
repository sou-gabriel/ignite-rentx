import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import { synchronize } from '@nozbe/watermelondb/sync'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useNetInfo } from '@react-native-community/netinfo'
import { useTheme } from 'styled-components'

import { Car } from '../../components/Car'
import { AnimatedLoading } from '../../components/AnimatedLoading'
import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'
import Logo from '../../assets/logo.svg'
import { database } from '../../database'
import { Car as CarModel } from '../../database/models/Car'
import {
  Container,
  Header,
  TotalCars,
  CarList,
} from './styles'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

export const Home = () => {
  const [cars, setCars] = useState<CarModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const netInfo = useNetInfo()
  const theme = useTheme()
  const navigation = useNavigation()
  
  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart (_, context: any) {
      context.positionX = positionX.value
      context.positionY = positionY.value
    },
    onActive (event, context: any) {
      positionX.value = context.positionX + event.translationX 
      positionY.value = context.positionY + event.translationY
    },
    onEnd () {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    }
  })

  const handleCarDetails = (car: CarModel) => {
    navigation.navigate('CarDetails', { car })
  }

  const handleOpenMyCars = () => {
    navigation.navigate('MyCars')
  }

  const offlineSynchronize = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(`/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)
        const { changes, latestVersion } = response.data
        
        return {
          changes,
          timestamp: latestVersion
        }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users
        await api.post('/users/sync', user)
      }      
    })
  }

  useEffect(() => {
    let isMounted = true

    const fetchCars = async () => {
      try {
        const carCollection = database.get<CarModel>('cars')
        const cars = await carCollection.query().fetch()

        if (isMounted) {
          setCars(cars)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    // fetchCars()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (netInfo.isConnected) {
      // offlineSynchronize()
    }
  }, [netInfo.isConnected])

  return (
    <Container>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent 
      />
      <Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        {!isLoading && (
          <TotalCars>
            Total de {cars.length} carros
          </TotalCars>
        )}
      </Header>

      {isLoading ? (
        <AnimatedLoading />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car
              data={item}
              onPress={() => handleCarDetails(item)}
            />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[
          myCarsButtonStyle,
          {
            position: 'absolute',
            bottom: 13,
            right: 22
          }
        ]}>
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
})