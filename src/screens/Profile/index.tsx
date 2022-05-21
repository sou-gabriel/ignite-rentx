import React, { useState } from 'react'
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import * as yup from 'yup'
import { useNetInfo } from '@react-native-community/netinfo'

import { BackButton } from '../../components/BackButton'
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles'

const schema = yup.object().shape({
  driverLicense: yup.string().required('CNH é obrigatória'),
  name: yup.string().required('Nome é obrigatório')
})

export const Profile = () => {
  const { user, signOut, updateUser } = useAuth()
  const netInfo = useNetInfo()

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [driverLicense, setDriverLicense] = useState(user.driver_license)

  const theme = useTheme()
  const navigation = useNavigation()

  const handleOptionChange = (optionSelected: 'dataEdit' | 'passwordEdit') => {
    if (!netInfo.isConnected && optionSelected === 'passwordEdit') {
      Alert.alert('Você está Offline', 'Para mudar a senha, conecte-se a internet!')
      return
    }

    setOption(optionSelected)
  }

  const handleAvatarSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1
    }) as ImagePicker.ImageInfo

    if (!result.cancelled) {
      setAvatar(result.uri)
    }
  }

  const handleProfileUpdate = async () => {
    try {
      const data = {
        name,
        driverLicense
      }

      await schema.validate(data)

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,        
        driver_license: driverLicense,
        avatar,
        token: user.token
      })

      Alert.alert('Perfil atualizado!')
    } catch (error) {
      if (error instanceof yup.ValidationError)  {
        return Alert.alert('Erro na atualização!', error.message)
      }
      Alert.alert('Não foi possível atualizar o perfil')
    }
  }

  const handleSignOut = () => {
    Alert.alert(
      'Tem certeza?', 
      'Se você sair, irá precisar de internet para conectar-se novamente.',
      [
        { 
          text: 'Cancelar', 
        },
        { 
          text: 'Sair',
          onPress() {
            signOut()
          },
        }
      ]
    )
  }

  console.log('Hello World')

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={navigation.goBack}
              />
              <HeaderTitle>Editar perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleOptionChange("dataEdit")}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>

              <Option
                active={option === "passwordEdit"}
                onPress={() => handleOptionChange("passwordEdit")}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </Section>
            )}

            <Button 
              title="Salvar alterações" 
              onPress={handleProfileUpdate}
            /> 
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}