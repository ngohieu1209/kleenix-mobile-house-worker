import { View, Text, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import { connectWithSocketServer, socketDisconnect, getSocketInstance } from '../../services/socket/socket-connection'

const TabIcon = ({ icon, color, name, focused, number }) => {
  return (
    <View>
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
      {(Number(number) > 0) && (
        <View className={`absolute right-3 -top-2 rounded-full border ${focused ? 'border-secondary-100 bg-blue-300' : 'border-gray-500 bg-gray-200'} h-5 w-5 items-center justify-center`}>
          <Text className={`font-psemibold text-xs text-black`}>
            {number}
          </Text>
        </View>
      )}
    </View>
  )
}

const TabsLayout = () => {
  const { user } = useGlobalContext();
  const [numberNotification, setNumberNotification] = useState(0);
  
  useEffect(() => {
    if(user) {
      connectWithSocketServer(user.id);
      const socket = getSocketInstance();
      socket.on('count-notification-unread', (payload) => {
        setNumberNotification(payload.count);
      });
      socket.emit('house-worker-notifications')
      return () => {
        socketDisconnect();
      }
    }
  }, [user])
  
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
          name='notification'
          options={{ 
            title: 'Notification', 
            headerShown: false, 
            tabBarIcon: ({ color, focused}) => (
              <TabIcon icon={icons.notification} color={color} name="Thông báo" focused={focused} number={numberNotification}/>
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