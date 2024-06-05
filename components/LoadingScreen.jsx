import { View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React from 'react'

import { images } from '../constants'

const LoadingScreen = () => {
  return (
    <ImageBackground
      className='flex-1 justify-center items-center'
    >
      <Image 
        source={images.logo}
        className='w-[130px] h-[84px] mb-4'
        resizeMode='contain'
      />
      <ActivityIndicator size={25} color='#0066FF' />
    </ImageBackground>
  )
}

export default LoadingScreen