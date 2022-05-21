import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import * as yup from 'yup'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { PasswordInput } from '../../../components/PasswordInput'
import { Button } from '../../../components/Button'
import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles'
import { api } from '../../../services/api'

interface IParams {
  user: {
    name: string
    email: string
    driverLicense: string
  }
}

const schema = yup.object().shape({
  password: yup.string().required('Senha é obrigatória'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Senhas não conferem')
})

export const SignUpSecondsStep = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const navigation = useNavigation()
  const theme = useTheme()
  const route = useRoute()

  const { user } = route.params as IParams

  const handleCreateNewUser = async () => {
    try {
      await schema.validate({ password, passwordConfirm })
    
      const response = await api.post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })

      if (response.status !== 201) {
        throw new Error('Não foi possível cadastrar')
      }   
      
      navigation.navigate('Confirmation', {
        title: 'Conta criada!',
        message: 'Agora é sófazer login\ne aproveitar.',
        nextScreen: 'SignIn'
      })
    } catch (error) {
      if (error instanceof yup.ValidationError || error instanceof Error) {
        return Alert.alert('Erro', error.message)
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={navigation.goBack} />
            <Steps>
              <Bullet active={false} />
              <Bullet active={true} />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <Subtitle>Faça seu cadastro de {"\n"}forma rápida e fácil.</Subtitle>

          <Form>
            <FormTitle>02. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            onPress={handleCreateNewUser}
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}