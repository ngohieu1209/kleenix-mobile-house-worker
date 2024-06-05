import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { useGlobalContext } from '../../context/GlobalProvider'

import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'

import HorizontalLine from '../../components/HorizontalLine'

const Profile = () => {
  const { logout, user } = useGlobalContext()
  
  const handleLogout = async () => {
    try {
      await logout();
      router.replace('sign-in')
    } catch (error) {
      console.log('logout-error', error.message)
    }
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='w-full justify-center items-center mt-6 px-4'>
        <View className='w-full flex-row justify-end mb-10'>
          <TouchableOpacity
            onPress={handleLogout}
          >
            <Image 
              source={icons.logout}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
        
        <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
          <Image 
            source={icons.profile}
            className='w-[90%] h-[90%] rounded-lg'
            resizeMode='cover'
          />
        </View>
        
        <InfoBox 
          title={user && user.name}
          containerStyles='mt-5'
          titleStyles='text-lg'
        />
        
      </View>
      <View className='mt-4'>
        <HorizontalLine />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('edit-information')}
        >
          <View className='w-full h-6 rounded-lg flex-row justify-between'>
            <View className='flex-row justify-center items-center space-x-2 ml-2'>
              <Image 
                source={icons.pen}
                className='w-5 h-5'
                resizeMode='contain'
              />
              <Text className='text-black text-base font-pmedium'>
                Chỉnh sửa thông tin
              </Text>
            </View>
            <Image 
              source={icons.rightContinue}
              tintColor='#1E1E2D'
              className='w-4 h-4 mr-2'
              resizeMode='contain'
            />
          </View>
        </TouchableOpacity>
        <HorizontalLine />
        <TouchableOpacity
          activeOpacity={0.7}
        >
          <View className='w-full h-6 rounded-lg flex-row justify-between'>
            <View className='flex-row justify-center items-center space-x-2 ml-2'>
              <Image 
                source={icons.helpDesk}
                className='w-6 h-6'
                resizeMode='contain'
              />
              <Text className='text-black text-base font-pmedium'>
                Trợ giúp
              </Text>
            </View>
            <Image 
              source={icons.rightContinue}
              className='w-4 h-4 mr-2'
              tintColor='#1E1E2D'
              resizeMode='contain'
            />
          </View>
        </TouchableOpacity>
        <HorizontalLine />
      </View>
      <View className='flex-row mt-4 justify-center space-x-10'>
        <Image 
          source={icons.facebook}
          className='w-8 h-8'
          resizeMode='contain'
        />
        <Image 
          source={icons.tiktok}
          className='w-9 h-9'
          resizeMode='contain'
        />
        <Image 
          source={icons.zalo}
          className='w-9 h-9'
          resizeMode='contain'
        />
      </View>
    </SafeAreaView>
  )
}

export default Profile