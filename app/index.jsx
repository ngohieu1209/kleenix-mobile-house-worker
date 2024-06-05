import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGlobalContext } from '../context/GlobalProvider';
import { images } from '../constants';

import LoadingScreen from '../components/LoadingScreen';
import CustomButton from '../components/CustomButton';

export default function App() {
  const { authenticated, loading, user } = useGlobalContext();
  
  if(!loading && authenticated) {
    if(user) {
      return <Redirect href='/schedule'/>
    }
  }
  
  return (
    <>
      {loading ? <LoadingScreen /> : (
        <SafeAreaView className='bg-primary h-full'>
          <ScrollView contentContainerStyle={{ height: '100%'}}>
            <View className='w-full justify-center items-center min-h-[85vh] px-4'>
              <Image
                source={images.logo}
                className='w-[130px] h-[84px]'
                resizeMode='contain'
              />
              
              <Image 
                source={images.cards}
                className='max-w-[380px] w-full h-[300px]'
                resizeMode='contain'
              />
              
              <View className='relative mt-5'>
                <Text className='text-3xl text-black font-bold text-center'>
                  Khám phá dịch vụ không giới hạn với{' '}
                  <Text className='text-secondary-200'>Kleenix</Text>
                </Text>
                <Image 
                  source={images.path}
                  className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
                  resizeMode='contain'
                />
              </View>
              
              <Text className='text-sm font-pregular text-black-200 mt-7 text-center'>
                Kleenix đặt giúp việc dễ dàng, uy tín, chuyên nghiệp và tiết kiệm
              </Text>
              
              <CustomButton 
                title="Khám phá"
                handlePress={() => router.push('/sign-in')}
                containerStyles='w-full mt-7'
              />
            </View>
          </ScrollView>
          
          <StatusBar backgroundColor='#161622' style='light'/>
        </SafeAreaView>
      )}
    </>
  )
}