import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#0066FF',
          tabBarInactiveTintColor: '#161622',
          tabBarStyle: {
            backgroundColor: '#FFF5FF',
            borderTopWidth: 1,
            borderTopColor: '#FFE8F7',
            height: 84
          }
        }}
      >
        <Tabs.Screen
          name='schedule'
          options={{ 
            title: 'Schedule', 
            headerShown: false, 
            tabBarIcon: ({ color, focused}) => (
              <TabIcon icon={icons.calendar} color={color} name="Công việc" focused={focused} />
            )}}
        />
        <Tabs.Screen
          name='activities'
          options={{ 
            title: 'Activities', 
            headerShown: false, 
            tabBarIcon: ({ color, focused}) => (
              <TabIcon icon={icons.toDoList} color={color} name="Hoạt động" focused={focused} />
            )}}
        />
        <Tabs.Screen
          name='profile'
          options={{ 
            title: 'Profile', 
            headerShown: false, 
            tabBarIcon: ({ color, focused}) => (
              <TabIcon icon={icons.profile} color={color} name="Tài khoản" focused={focused} />
            )}}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout