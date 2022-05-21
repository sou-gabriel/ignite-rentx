import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '../hooks/useAuth'
import { AnimatedLoading } from '../components/AnimatedLoading'
import { AppTabRoutes } from './app.tab.routes'
import { AuthRoutes } from './auth.routes'

export const Routes = () => {
  const { user, isLoadingUser } = useAuth()

  return isLoadingUser ? (
    <AnimatedLoading />
  ) : (
    <NavigationContainer>
      {false ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}