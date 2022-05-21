import { Car } from '../database/models/Car'
import { CarDTO } from '../dtos/CarDTO'

export type RootStackParamList = {
  Splash: {}
  SignIn: {}
  SignUpFirstStep: {}
  SignUpSecondStep: {
    user: {
      name: string
      email: string
      driverLicense: string
    }
  }
  Home: {}
  CarDetails: {
    car: Car
  }
  Scheduling: {
    car: Car
  }
  SchedulingDetails: {
    car: Car
    dates: string[]
  }
  Confirmation: {}
  MyCars: {}
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}