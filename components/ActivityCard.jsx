import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { REACT_APP_BASE_ICON_URL } from '@env'

import { fCurrency } from '../utils/format-currency'
import { fMinutesToHours, fDateTime } from '../utils/format-time'
import BookingModal from './BookingModal'
import { fAddress } from '../utils/format-address'
import colorStatus from '../constants/color-status'
import { addMinutes } from 'date-fns'
import { assignmentApi } from '../services/api'

const ActivityCard = ({ activity }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false)
  const { id, createdAt, duration, note, dateTime, totalPrice, address, bookingPackage, bookingExtraService, status, paymentStatus } = activity;
  const { service } = bookingPackage[0].package;
  const { body: statusBody, color: statusColor } = colorStatus(status);
  const iconURL = `${REACT_APP_BASE_ICON_URL}/${service.icon}`
  
  const submit = async () => {
    setIsLoading(true)
    try {
      await assignmentApi.acceptBooking(id);
      router.replace('/schedule')
    } catch (error) {
      Alert.alert('Lỗi', error.message)
      console.log('winter-accept-error', error)  
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <View>
      <TouchableOpacity
        className='mb-6 mx-4 p-4 rounded-2xl border-2 border-blue-400'
        style={{ backgroundColor: statusColor }}
        activeOpacity={0.7}
        onPress={() => setIsVisibleModalLocation(true)}
        >
        <View className='flex-row justify-between items-center'>
          <View className='flex-row items-center space-x-2'>
            <Image 
              source={{ uri: iconURL }}
              className='w-6 h-6'
              resizeMode='cover'
            />
            <Text className='text-base text-black font-psemibold'>{service.name}</Text>
          </View>
          <View>
            <Text className='text-base text-black font-psemibold'>{paymentStatus === 'KPAY' ? fCurrency(Number(0)) : fCurrency(Number(totalPrice))}</Text>
          </View>
        </View>
        <View className='space-y-1 mt-2'>
          <Text className='text-black text-sm'>Bắt đầu: {fDateTime(dateTime)}</Text>
          <Text className='text-black text-sm'>Kết thúc dự kiến: {fDateTime(addMinutes(new Date(dateTime), duration))}</Text>
          <Text className='text-black text-sm'>Thực hiện: {fMinutesToHours(duration)}</Text>
          <Text className='text-black text-sm'>Địa chỉ: {fAddress(address)}</Text>
        </View>
      </TouchableOpacity>
      <BookingModal
        service={service}
        activity={activity}
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={submit}
      />
    </View>
  )
}

export default ActivityCard