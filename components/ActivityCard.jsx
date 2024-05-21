import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { REACT_APP_BASE_ICON_URL } from '@env'

import { fCurrency } from '../utils/format-currency'
import { fMinutesToHours, fDateTime } from '../utils/format-time'
import BookingModal from './BookingModal'
import { fAddress } from '../utils/format-address'
import { addMinutes } from 'date-fns'

const ActivityCard = ({ activity }) => {
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false)
  
  const { id, createdAt, duration, note, dateTime, totalPrice, address, bookingPackage, bookingExtraService } = activity;
  const { service } = bookingPackage[0].package;
  const iconURL = `${REACT_APP_BASE_ICON_URL}/${service.icon}`
  return (
    <View>
      <TouchableOpacity
        className='mb-6 mx-4 p-4 bg-black-100 rounded-2xl'
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
            <Text className='text-base text-white font-psemibold'>{service.name}</Text>
          </View>
          <View>
            <Text className='text-base text-white font-psemibold'>{fCurrency(Number(totalPrice))}</Text>
          </View>
        </View>
        <View className='space-y-1 mt-2'>
          <Text className='text-white text-sm'>Bắt đầu: {fDateTime(dateTime)}</Text>
          <Text className='text-white text-sm'>Kết thúc dự kiến: {fDateTime(addMinutes(new Date(dateTime), duration))}</Text>
          <Text className='text-white text-sm'>Thực hiện: {fMinutesToHours(duration)}</Text>
          <Text className='text-white text-sm'>Địa chỉ: {fAddress(address)}</Text>
        </View>
      </TouchableOpacity>
      <BookingModal
        service={service}
        activity={activity}
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={val => console.log('winter-val', val)}
      />
    </View>
  )
}

export default ActivityCard