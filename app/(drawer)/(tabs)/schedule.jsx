import React, { useState, useRef, useMemo } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, addDays, addWeeks, startOfWeek } from 'date-fns';
import Swiper from 'react-native-swiper';
import ScheduleCard from '../../../components/ScheduleCard';
import { scheduleApi } from '../../../services/api';
import useFetchData from '../../../services/useFetchData';
import LoadingScreen from '../../../components/LoadingScreen';

export default function Schedule() {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { data: listSchedule, isLoading, refetch } = useFetchData(scheduleApi.getListSchedule(startDate, endDate));
  

  const weeks = useMemo(() => {
    const start = startOfWeek(addWeeks(new Date(), week), { weekStartsOn: 1 });
  
    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = addDays(addWeeks(start, adj), index);
  
        return {
          weekday: format(date, 'eee'),
          date: date,
        };
      });
    });
  }, [week]);
  
  if(isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className='h-full'>
      <View className='flex-1 py-6'>
        <View className='px-4'>
          <Text className='text-[#1d1d1d] mb-3 text-3xl font-psemibold'>Your Schedule</Text>
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
                      onPress={() => setValue(item.date)}>
                      <View
                        className='flex-1 h-14 mx-1 items-center flex-col border border-gray-200 rounded-lg px-1 py-1'
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

        <View className='flex-1 px-4 py-6'>
          <Text className='text-[#999999] mb-3 text-base font-pmedium'>{value.toDateString()}</Text>
          <FlatList 
            data={listSchedule}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <ScheduleCard key={index} schedule={item} />
            )}
          />
          
        </View>
      </View>
    </SafeAreaView>
  );
}