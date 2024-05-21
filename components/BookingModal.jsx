import { View, Text, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalLine from './HorizontalLine'
import { fDateTime } from '../utils/format-time'
import { fCurrency } from '../utils/format-currency';
import { fAddress } from '../utils/format-address';
import { addMinutes } from 'date-fns';

const BookingModal = ({ visible, onClose, onSelect, service, activity }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { id, createdAt, duration, note, dateTime, totalPrice, address, bookingPackage, bookingExtraService } = activity;
  
  const handleClose = () => {
    onClose();
  };
  return (
    <Modal animationType='slide' visible={visible}>
      <SafeAreaView className='flex-1 bg-primary h-full'>
        <View className='flex my-6 px-4 space-y-6'>
          <View className='flex-row'>
            <View className='flex-1'>
              <Text className='text-white font-pmedium text-base'>
                Chi tiết lịch đặt
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <Image source={icons.close} className='w-4 h-4' />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className='px-4 my-4'>
          <View className='space-y-2'>
            <View className='flex-row space-x-2'>
              <Image
                source={icons.location}
                className='w-5 h-5'
                resizeMode='contain'
              />
              <Text className='text-base text-gray-100 font-pmedium'>
                Thông tin chi tiết
              </Text>
            </View>
            <View className='w-full py-4 px-4 bg-black-100 rounded-2xl justify-start items-start'>
            {/* ĐỊA CHỈ */}
              <Text className='text-sm text-gray-100 font-pregular mb-1'>
                Địa chỉ
              </Text>
              <Text className='text-base text-white font-pmedium'>
                {fAddress(address)}
              </Text>
              <HorizontalLine />
            {/* NGÀY ĐẶT LỊCH */}
              <Text className='text-sm text-gray-100 font-pregular mb-1'>
                Ngày đặt lịch
              </Text>
              <Text className='text-base text-white font-pmedium'>
                {fDateTime(createdAt)}
              </Text>
              <HorizontalLine />
            {/* THỜI GIAN BẮT ĐẦU */}
              <Text className='text-sm text-gray-100 font-pregular mb-1'>
                Thời gian bắt đầu
              </Text>
              <Text className='text-base text-white font-pmedium'>
                {fDateTime(dateTime)}
              </Text>
              <HorizontalLine />
            {/* THỜI GIAN KẾT THÚC DỰ KIẾN */}
              <Text className='text-sm text-gray-100 font-pregular mb-1'>
                Thời gian kết thúc dự kiến
              </Text>
              <Text className='text-base text-white font-pmedium'>
                {fDateTime(addMinutes(dateTime, duration))}
              </Text>
              <HorizontalLine />
            {/* GÓI DỊCH VỤ */}
              <Text className='text-sm text-gray-100 font-pregular mb-1'>
                Gói dịch vụ
              </Text>
              {bookingPackage.map((item) => (
                <View key={item.id} className='flex-row justify-between items-center w-11/12 my-1'>
                  <Text className='text-base text-white font-pmedium'>
                    {item.package.name}
                  </Text>
                  {item.quantity > 1 && (
                    <Text className='text-base text-white font-pmedium'>
                      x {item.quantity}
                    </Text>
                  )}
                </View>
              ))}
              {/* GÓI DỊCH VỤ THÊM */}
              {bookingExtraService.length > 0 && (
                <>
                  <HorizontalLine />
                  <Text className='text-sm text-gray-100 font-pregular mb-1'>
                    Gói dịch vụ thêm
                  </Text>
                  {bookingExtraService.map((item) => (
                    <View key={item.id} className='flex-row justify-between items-center w-11/12 my-1'>
                      <Text className='text-base text-white font-pmedium'>
                        {item.name}
                      </Text>
                    </View>
                  ))}
                </>
              )}
              <HorizontalLine />
            {/* GHI CHÚ */}
              <Text className='text-sm text-gray-100 font-pregular mb-1'>
                Ghi chú
              </Text>
              <Text className='text-base text-white font-pmedium'>
                {note || 'Không có'}
              </Text>
            </View>
          </View>
          <View className='space-y-2 mt-6'>
            <View className='flex-row space-x-2'>
              <Image
                source={icons.location}
                className='w-5 h-5'
                resizeMode='contain'
              />
              <Text className='text-base text-gray-100 font-pmedium'>
                Chi phí
              </Text>
            </View>
            <View className='w-full py-4 px-4 bg-black-100 rounded-2xl justify-start items-start'>
            {/* PHÍ DỊCH VỤ */}
              <Text className='text-base text-white font-pmedium mb-1'>
                Phí dịch vụ
              </Text>
              {bookingPackage.map((item) => (
                <View key={item.id} className='flex-row justify-between items-center w-11/12 my-1'>
                  <Text className='text-sm text-gray-100 font-pregular'>
                    • {item.package.name} {item.quantity > 1 ? `x ${item.quantity}` : ''}
                  </Text>
                  <Text className='text-sm text-gray-100 font-pregular'>
                    {fCurrency(Number(item.package.price) * item.quantity)}
                  </Text>
                </View>
              ))}
            {/* PHÍ DỊCH VỤ THÊM */}
              {bookingExtraService.length > 0 && (
                <>
                  <HorizontalLine />
                  <Text className='text-base text-white font-pmedium mb-1'>
                    Phí dịch vụ thêm
                  </Text>
                  {bookingExtraService.map((item) => (
                    <View key={item.id} className='flex-row justify-between items-center w-11/12 my-1'>
                      <Text className='text-sm text-gray-100 font-pregular'>
                        • {item.name}
                      </Text>
                      <Text className='text-sm text-gray-100 font-pregular'>
                        {fCurrency(Number(item.price))}
                      </Text>
                    </View>
                  ))}
                </>
              )}
              <HorizontalLine />
            {/* TỔNG CỘNG */}
              <View className='flex-row justify-between items-center w-11/12 my-1'>
                <Text className='text-lg text-secondary font-psemibold'>
                  TỔNG CỘNG
                </Text>
                <Text className='text-lg text-secondary font-psemibold'>
                  {fCurrency(Number(totalPrice))}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default BookingModal;
