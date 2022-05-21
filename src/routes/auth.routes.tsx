import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

import { Splash } from '../screens/Splash'
import { SignIn } from '../screens/SignIn'
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep'
import { SignUpSecondsStep } from '../screens/SignUp/SignUpSecondStep'
import { Confirmation } from '../screens/Confirmation'

import { RootStackParamList } from '../@types/navigation'

export const AuthRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen
        name="Splash"
        component={Splash}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondsStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}