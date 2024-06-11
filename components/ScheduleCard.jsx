import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router } from 'expo-router'
import { fDate } from '../utils/format-time';
import { fAddress } from '../utils/format-address';
import colorStatus from '../constants/color-status'
import ScheduleModal from './ScheduleModal';
import { assignmentApi } from '../services/api';
import Toast from 'react-native-toast-message';

const ScheduleCard = ({ schedule, refresh }) => {
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false)
  const [tempStatus, setTempStatus] = useState(null)
  
  const { assignedTime, startTime, endTime, booking } = schedule;
  const { id, address, status, bookingPackage, bookingExtraService } = booking;
  const { service } = bookingPackage[0].package;
  const { customer } = address;
  const { body: statusBody, color: statusColor } = colorStatus(tempStatus || status);
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    setTempStatus(status)
  }, [])
  
  const submit = async () => {
    setIsLoading(true)
    try {
      let data = null;
      if(status === 'WORKING') {
        data = await assignmentApi.completedBooking(id);
      } else {
        data = await assignmentApi.updateStatusBooking(id);
      }
      setTempStatus(data.status)
      setIsVisibleModalLocation(false)
    } catch (error) {
      console.log('update-status-booking-error', error)
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra khi cập nhật trạng thái',
      });
    } finally {
      setIsLoading(false)
    }
  }
  
  
  return (
    <View>
      <TouchableOpacity 
        className='mb-6 border-2 border-blue-400 px-4 py-3 space-y-1 rounded-lg'
        style={{ backgroundColor: statusColor }}
        activeOpacity={0.7}
        onPress={() => setIsVisibleModalLocation(true)}
      >
        <View className='flex-row items-center justify-between'>
          <Text className='text-base text-black font-pmedium'>{fDate(startTime, 'p')} - {fDate(endTime, 'p')}</Text>
          <Text className='text-base text-black font-pmedium'>{service.name}</Text>
        </View>
        <Text className='text-sm font-medium text-black'>Khách hàng: {customer.name}</Text>
        <Text className='text-sm font-medium text-black'>Số điện thoại: 0{customer.phoneNumber}</Text>
        <Text className='text-sm font-medium text-black'>Địa chỉ: {fAddress(address)}</Text>
        <Text className='text-sm font-medium text-black'>Trạng thái: {statusBody}</Text>
      </TouchableOpacity>
      <ScheduleModal
        schedule={schedule}
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={submit}
      />
    </View>
  )
}

export default ScheduleCard