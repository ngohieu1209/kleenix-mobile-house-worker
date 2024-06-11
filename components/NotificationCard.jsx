import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'

import { fCurrency } from '../utils/format-currency'
import { fMinutesToHours, fDateTime, fDate } from '../utils/format-time'
import { getSocketInstance } from '../services/socket/socket-connection'

const NotificationCard = ({ notification }) => {
  const { id, body, booking, createdAt, isMark, type } = notification;
  
  const markAsRead = () => {
    const socket = getSocketInstance();
    socket.emit('mark-notification', { notificationId: id})
    router.push('activities')
  }
  
  return (
    <View>
      <TouchableOpacity
        className={`mb-6 mx-4 p-4 bg-white rounded-2xl ${isMark ? '' : 'border-secondary-200 border'}`}
        activeOpacity={0.7}
        onPress={markAsRead}
      >
        <View className='flex-row justify-between items-center'>
          <View className='flex-row items-center space-x-2'>
            <Text className='text-base text-black font-psemibold'>{type}</Text>
          </View>
          <View>
            {/* <Text className='text-base text-white font-psemibold'>ngày</Text> */}
          </View>
        </View>
        <View className='space-y-1 mt-2'>
          <Text className='text-black text-sm'>{body}</Text>
          <Text style={{ color: '#008DFF' }} className={`text-sm`}>{fDate(createdAt, 'Pp')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default NotificationCard