import React, { useState, useEffect } from 'react'
import { 
  StatusBar, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as yup from 'yup'
import { useTheme } from 'styled-components'

import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'

import {
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  Footer,
} from './styles'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('Digite um e-mail válido'),
  password: yup.string().required('Senha é obrigatória')
})

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()

  const navigation = useNavigation()
  const theme = useTheme()

  const handleSignIn = async () => {
    try {
      const credentials = {
        email,
        password
      }

      await schema.validate(credentials)
      await signIn(credentials)
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return Alert.alert('Erro na validação dos campos', error.message)
      } 

      Alert.alert(
        'Erro na autenticação', 
        'Ocorreu um erro ao realizar o login. Verifique as credenciais!'
      )
    }
  }

  const handleNewAccount = () => {
    navigation.navigate('SignUpFirstStep')
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <Subtitle>Faça seu login para começar{'\n'}uma experiência incrível.</Subtitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="phone-pad"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button title="Login" onPress={handleSignIn} isLoading={false} />
            <Button
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              isLoading={false}
              color={theme.colors.background_secondary}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}