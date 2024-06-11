import { View, Text, Modal, TouchableOpacity, Image, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { authApi } from '../services/api';

import FormField from './FormField';

const ChangePasswordModal = ({ visible, onClose, onSelect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const handleClose = () => {
    setForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    onClose();
  };
  
  const handleSubmit = async () => {
    if(!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      ToastAndroid.show('Hãy điền đầy đủ thông tin', ToastAndroid.SHORT);
      return
    }
    
    if(form.newPassword !== form.confirmPassword) {
      ToastAndroid.show('Xác nhận mật khẩu mới không khớp', ToastAndroid.SHORT);
      return
    }
    
    if(form.newPassword.length < 6) {
      ToastAndroid.show('Mật khẩu phải có ít nhất 6 ký tự', ToastAndroid.SHORT);
      return
    }
    setIsLoading(true)
    try {
      await authApi.changePassword({ oldPassword: form.oldPassword, newPassword: form.newPassword })
      handleClose()
    } catch (error) {
      console.log('winter-log: ChangePasswordModal -> error', error)
      ToastAndroid.show('Có lỗi xảy ra khi đổi mật khẩu', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Modal animationType='slide' visible={visible}>
      <SafeAreaView className='flex-1 bg-primary h-full'>
        <View className='flex my-6 px-4 space-y-6'>
          <View className='flex-row'>
            <View className='flex-1'>
              <Text className='text-black font-pmedium text-base'>
                Đổi mật khẩu
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <Image source={icons.close} className='w-4 h-4' tintColor='#1E1E2D' />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className='px-4 my-4'>
          <FormField 
            title="Mật khẩu cũ"
            value={form.oldPassword}
            handleChangeText={(e) => setForm({ ...form, oldPassword: e})}
            otherStyles='mt-7'
          />
          
          <FormField 
            title="Mật khẩu mới"
            value={form.newPassword}
            handleChangeText={(e) => setForm({ ...form, newPassword: e})}
            otherStyles='mt-7'
          />
          
          <FormField 
            title="Nhập lại mật khẩu"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e})}
            otherStyles='mt-7'
          />
        </ScrollView>
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.7}
          className={`mx-3 rounded-xl min-h-[62px] justify-center items-center mt-4 mb-4 ${!form.newPassword || !form.confirmPassword || !form.oldPassword ? 'bg-black-200 opacity-50' : 'bg-secondary'}`}
          disabled={!form.newPassword || !form.confirmPassword || !form.oldPassword}
        >
          <Text className={`text-primary font-psemibold text-lg mx-4`}>
            {isLoading ? <ActivityIndicator color={'#CDCDE0'} size={32} /> :  'Đổi mật khẩu' }
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default ChangePasswordModal;
