import { 
  createContext, 
  useState, 
  ReactNode, 
  useEffect 
} from 'react'

import { api } from '../services/api'
import { database } from '../database'
import { User } from '../database/models/User'

export interface IUser {
  id: string
  user_id: string
  email: string
  name: string
  driver_license: string
  avatar: string
  token: string
}

interface ISignInCredentials {
  email: string
  password: string
}

interface IAuthContextData {
  user: IUser
  isLoadingUser: boolean
  signIn: (credentials: ISignInCredentials) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (user: IUser) => Promise<void>
}

interface IAuthProviderProps {
  children: ReactNode | ReactNode[]
}

export const AuthContext = createContext({} as IAuthContextData)

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [data, setData] = useState<IUser>({} as IUser)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  const signIn = async ({ email, password }: ISignInCredentials) => {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      })
  
      const { token, user } = response.data  
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  
      const userCollection = database.get<User>('users')

      await database.write(async () => {
        await userCollection.create(newUser => {
          newUser.id = user.id
          newUser.user_id = user.id
          newUser.name = user.name
          newUser.email = user.email
          newUser.driver_license = user.driver_license 
          newUser.avatar = user.avatar
          newUser.token = token
        })
      })

      setData({ ...user, token })
    } catch (error) {
      throw new Error(error)
    }
  }

  const signOut = async () => {
    try {
      const userCollection = database.get<User>('users')
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id)
        await userSelected.destroyPermanently()
      })

      setData({} as User)
    } catch (error) {
      throw new Error(error)
    }
  }

  const updateUser = async (user: IUser) => {
    try {
      const userCollection = database.get<User>('users')
      
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id)
        await userSelected.update(userData => {
          userData.name = user.name
          userData.driver_license = user.driver_license
          userData.avatar = user.avatar
        })

        setData(user)
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    const loadUserData = async () => {
      const userCollection = database.get<User>('users')
      const response = await userCollection.query().fetch()

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
        
        setData(userData)
        setIsLoadingUser(false)
      }
    }

    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user: data, 
      isLoadingUser,
      signIn, 
      signOut,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}
