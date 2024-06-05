import { ScrollView, View, Text, Image, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { useGlobalContext } from '../../context/GlobalProvider'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { authApi } from '../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignIn = () => {
  const { login } = useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const submit = async () => {
    if(!form.username || !form.password) {
      Alert.alert('Error', 'Please fill in all fields')
    }
    setIsSubmitting(true)
    
    try {
      await login(form.username, form.password)
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[83vh] px-4 my-6'>
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[115px]'
          />
          
          <Text
            className='text-2xl text-black mt-10 font-psemibold'
          >
            Đăng nhập Kleenix
          </Text>
          
          <Text
            className='text-xl text-secondary mt-2 font-psemibold'
          >
            dành cho giúp việc
          </Text>
          
          <FormField 
            title="Tên đăng nhập"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e})}
            otherStyles='mt-7'
          />
          
          <FormField 
            title="Mật khẩu"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles='mt-7'
          />
          
          <CustomButton 
            title='Đăng nhập'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn