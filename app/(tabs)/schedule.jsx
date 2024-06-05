import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  FlatList,
  RefreshControl,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, addDays, addWeeks, startOfWeek, startOfDay, endOfDay, subDays } from 'date-fns';
import Swiper from 'react-native-swiper';
import ScheduleCard from '../../components/ScheduleCard';
import { scheduleApi } from '../../services/api';
import useFetchData from '../../services/useFetchData';
import LoadingScreen from '../../components/LoadingScreen';
import { fDate, fConvertDays } from '../../utils/format-time';
import EmptyState from '../../components/EmptyState';
import { useGlobalContext } from '../../context/GlobalProvider';

export default function Schedule() {
  const { authenticated } = useGlobalContext()
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [startDate, setStartDate] = useState(subDays(new Date(), 1));
  const [endDate, setEndDate] = useState(subDays(new Date(), 1));
  const { data: listSchedule, isLoading, refetch } = useFetchData(authenticated ? scheduleApi.getListSchedule(startDate, endDate) : null);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    refetch()
  }, [startDate, endDate])
  
  const handleChangDay = (date) => {
    setValue(date);
    setStartDate(date);
    setEndDate(date);
  }

  const weeks = useMemo(() => {
    const start = startOfWeek(addWeeks(new Date(), week), { weekStartsOn: 1 });
  
    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = addDays(addWeeks(start, adj), index);
  
        return {
          weekday: fConvertDays(fDate(date, 'eee')),
          date: date,
        };
      });
    });
  }, [week]);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className='h-full'>
      <View className='flex-1 py-6'>
        <View className='px-4'>
          <Text className='text-secondary-100 mb-3 text-3xl font-psemibold'>Công việc</Text>
        </View>

        <View className='flex-1 px-3 flex-row items-center max-h-16'>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(addWeeks(value, newIndex));
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
            {weeks.map((dates, index) => (
              <View className='w-full flex-row items-start justify-between px-3' key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => handleChangDay(item.date)}>
                      <View
                        className='flex-1 h-14 mx-1 items-center flex-col border border-blue-400 rounded-lg px-1 py-1'
                        style={[
                          isActive && {
                            backgroundColor: '#111',
                            borderColor: '#111',
                          },
                        ]}>
                        <Text
                          className='text-[#737373] mb-1 text-xs font-pregular'
                          style={[
                            isActive && { color: '#fff' },
                          ]}
                        >
                          {item.weekday}
                        </Text>
                        <Text
                          className='text-[#111] text-sm font-pmedium'
                          style={[
                            isActive && { color: '#fff' },
                          ]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>

        <View className='flex-1 px-4 pt-6'>
          <Text className='text-secondary-200 mb-3 text-base font-pmedium'>{fDate(value.toDateString(), 'PPPP')}</Text>
          <FlatList 
            data={listSchedule}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <ScheduleCard key={index} schedule={item} refresh={onRefresh}/>
            )}
            ListEmptyComponent={() => (
              <View className='mt-12'>
                <EmptyState 
                  title="Không có công việc nào!"
                  subtitle="Vui lòng quay lại sau!"
                />
              </View>
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
          
        </View>
      </View>
    </SafeAreaView>
  );
}