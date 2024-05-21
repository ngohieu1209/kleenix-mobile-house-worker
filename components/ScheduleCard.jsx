import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { fDate } from '../utils/format-time';
import { fAddress } from '../utils/format-address';
import ScheduleModal from './ScheduleModal';

const ScheduleCard = ({ schedule }) => {
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false)
  
  const { id, assignedTime, startTime, endTime, booking } = schedule;
  const { address, status, bookingPackage, bookingExtraService } = booking;
  const { service } = bookingPackage[0].package;
  const { customer } = address;
  return (
    <View>
      <TouchableOpacity 
        className='border-b border-gray-200 py-3 space-y-1'
        activeOpacity={0.7}
        onPress={() => setIsVisibleModalLocation(true)}
      >
        <View className='flex-row items-center justify-between'>
          <Text>{fDate(startTime, 'p')} - {fDate(endTime, 'p')}</Text>
          <Text>{service.name}</Text>
        </View>
        <Text>Khách hàng: {customer.name}</Text>
        <Text>Số điện thoại: 0{customer.phoneNumber}</Text>
        <Text>Địa chỉ: {fAddress(address)}</Text>
      </TouchableOpacity>
      <ScheduleModal
        schedule={schedule}
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={val => console.log('winter-val', val)}
      />
    </View>
  )
}

export default ScheduleCard