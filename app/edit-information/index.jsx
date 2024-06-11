import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'

import BackButtonHeader from '../../components/BackButtonHeader'
import FormField from '../../components/FormField'

import { userApi } from '../../services/api'
import LoadingScreen from '../../components/LoadingScreen'
import ChangePasswordModal from '../../components/ChangePasswordModal'
import CustomButton from '../../components/CustomButton'
import Toast from 'react-native-toast-message'

const EditInformation = () => {
  const { user, updateUser } = useGlobalContext();
  const [form, setForm] = useState({
    name: '',
  })
  const [isHandleLoading, setIsHandleLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  
  useEffect(() => {
    setForm({ ...form, name: user.name})
  }, [user])
  
  
  const handleSubmit = async () => {
    setIsHandleLoading(true)
    try {
      await userApi.editProfile(form)
      updateUser({
        name: form.name
      })
      router.replace('profile')
    } catch (error) {
      console.log('edit-profile-error', error)
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra khi đổi tên',
      });
    } finally {
      setIsHandleLoading(false)
    }
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <BackButtonHeader title={"Chỉnh sửa thông tin"} />
      <ScrollView>
        <View className='px-4 mt-6 justify-center items-center'>
          <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
            <Image 
              source={icons.profile}
              className='w-[90%] h-[90%] rounded-lg'
              resizeMode='cover'
            />
          </View>
          <FormField 
            title="Họ và tên"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e})}
            otherStyles='my-7'
          />
          
          <TouchableOpacity
            className='w-[50%] h-12 px-4 bg-secondary rounded-2xl justify-center items-center border-2 border-black-200 space-x-2'
            activeOpacity={0.7}
            onPress={() => setIsVisibleModal(!isVisibleModal)}
          >
            <Text className='text-white text-base font-bold'>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomButton 
        title={isHandleLoading ? <ActivityIndicator color={'#CDCDE0'} size={32} /> : 'Lưu'}
        handlePress={handleSubmit}
        containerStyles='mx-3 mb-4'
        isLoading={isHandleLoading || (user && form.name === user.name)}
      />
      <ChangePasswordModal 
        visible={isVisibleModal}
        onClose={() => setIsVisibleModal(false)}
        // onSelect={submit}
      />
    </SafeAreaView>
  )
}

export default EditInformation