import { View, Text, FlatList, Image, Pressable } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../../constants/images'
import { ScrollView } from 'react-native-gesture-handler'

import { assignmentApi } from '../../../services/api'
import useFetchData from '../../../services/useFetchData'

import ActivityCard from '../../../components/ActivityCard'
import LoadingScreen from '../../../components/LoadingScreen'

const tabs = ['Đang chờ', 'Đang thực hiện', 'Đã hoàn thành', 'Đã hủy']
const Activities = () => {
  const [activateTab, setActivateTab] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('PENDING');
  const { data: listActivity, isLoading, refetch } = useFetchData(assignmentApi.getListBooking(status, startDate, endDate));
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
        data={listActivity}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ActivityCard key={index} activity={item} />
        )}
        ListHeaderComponent={() => (
          <View className='flex my-6 px-4 space-y-2'>
            <View className="flex justify-between items-center flex-row">
              <View>
                <Text className="text-2xl font-psemibold text-white">
                  Hoạt động
                </Text>
              </View>

              <View className="">
                <Image
                  source={images.logo}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Activities