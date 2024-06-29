import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'

import { assignmentApi } from '../../services/api'
import useFetchData from '../../services/useFetchData'
import { useGlobalContext } from '../../context/GlobalProvider'

import { Dropdown } from 'react-native-element-dropdown'

import EmptyState from '../../components/EmptyState'

import ActivityCard from '../../components/ActivityCard'
import FieldDateTimePicker from '../../components/FieldDateTimePicker'
import icons from '../../constants/icons'

const tabs = [
  {
    id: 1,
    name: 'Đang chờ',
  },
  {
    id: 2,
    name: 'Đang thực hiện',
  },
  {
    id: 3,
    name: 'Đã hoàn thành',
  },
  {
    id: 4,
    name: 'Đã hủy',
  },
]

const Activities = () => {
  const [activateTab, setActivateTab] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('PENDING');
  const [isFilter, setIsFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { authenticated } = useGlobalContext()
  
  const { data: listActivity, isLoading, refetch } = useFetchData(authenticated ? assignmentApi.getListBooking(status, startDate, endDate) : null);
  const handleListActivity = (activateTab) => {
    setActivateTab(activateTab)
    if(activateTab === 1) setStatus('PENDING');
    if(activateTab === 2) setStatus('CONFIRMED,DELIVERY,WORKING');
    if(activateTab === 3) setStatus('COMPLETED');
    if(activateTab === 4) setStatus('CANCELLED_BY_CUSTOMER,CANCELLED_BY_KLEENIX');
  }
  
  const handleCloseFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setIsFilter(false);
  }
  
  useFocusEffect(
    useCallback(() => {
      if(authenticated) {
        refetch();
      }
    }, [authenticated, status, startDate, endDate])
  )
  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  
  return (
    <SafeAreaView className='h-full'>
      <FlatList 
        data={listActivity}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          if(isLoading) {
            return (
              <View className='mt-12'>
                <ActivityIndicator key={index} color={'#0066FF'} size={32} />
              </View>
            )
          }
          return <ActivityCard key={index} activity={item} />
        }}
        ListHeaderComponent={() => (
          <View className='flex my-6 px-4 space-y-2'>
            <View className="flex justify-between items-center flex-row">
              <View>
                <Text className="text-2xl font-psemibold text-secondary-100">
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
            
            {isFilter ? (
              <View className='items-center'>
                <FieldDateTimePicker
                  title='Từ ngày'
                  value={startDate}
                  mode="date"
                  handleChangeDateTime={(selectedDate) => setStartDate(selectedDate)}
                />
                <FieldDateTimePicker 
                  title='Đến ngày'
                  value={endDate}
                  mode="date"
                  handleChangeDateTime={(selectedDate) => setEndDate(selectedDate)}
                  otherStyles='mt-4'
                />
                <TouchableOpacity
                  className='mt-4'
                  activeOpacity={0.7}
                  onPress={handleCloseFilter}
                >
                  <Image
                    source={icons.closeRound}
                    className='w-6 h-6'
                    resizeMode='contain'
                    tintColor='#232533'
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View className='flex-row justify-between'>
                <Dropdown 
                  className='w-[55%] h-12 px-4 bg-[#00B3FF] rounded-2xl justify-center items-center border-2 border-white space-x-2'
                  data={tabs}
                  labelField="name"
                  valueField="id"
                  value={activateTab}
                  containerStyle={{ backgroundColor: 'white', borderRadius: 10, borderColor: '#008DFF'}}
                  itemTextStyle={{ color: 'black' }}
                  activeColor='white'
                  itemContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                  selectedTextStyle={{ color: 'black', fontWeight: '600', borderRadius: 10 }}
                  onChange={item => {
                    handleListActivity(item.id)
                  }}
                />
                
                <TouchableOpacity
                  className='w-[40%] h-12 px-4 bg-[#00B3FF] rounded-2xl justify-center items-center border-2 border-white space-x-2'
                  activeOpacity={0.7}
                  onPress={() => setIsFilter(!isFilter)}
                >
                  <Text className='text-black text-base font-bold'>Lọc theo ngày</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={() => (
          <View className='mt-12'>
            <EmptyState 
              title="Không tìm thấy dữ liệu"
              subtitle="Không có hoạt động nào!"
            />
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Activities