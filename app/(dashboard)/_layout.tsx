import { Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';


const DashboardLayout = () => {
 
  return (
    <Tabs
    screenOptions={{headerShown: false, tabBarStyle: {
      backgroundColor: '#000000ff',
      marginBottom: 7,
      height: 80,

    },
    tabBarActiveTintColor: '#0b889bff',
    tabBarInactiveTintColor: "grey"
  }}>

    <Tabs.Screen 
    name ='home' options={{title: 'Home', tabBarIcon: ({focused}) => (
    <Feather name="home" size={22} color="black" color={focused ? '#0b889bff' : 'grey'}/>   
    )}}/>

      <Tabs.Screen 
    name ='market' options={{title: 'Market', tabBarIcon: ({focused}) => (
    <MaterialCommunityIcons name="chart-box-outline" size={22} color="black" color={focused ? '#0b889bff' : 'grey'}/>
    
    )}}/>

      <Tabs.Screen 
    name ='ta' options={{title: 'TA', tabBarIcon: ({focused}) => (
    <MaterialIcons name="candlestick-chart" size={22} color="black" color={focused ? '#0b889bff' : 'grey'}/>
    )}}/>


      <Tabs.Screen 
    name ='news' options={{title: 'News',tabBarIcon: ({focused}) => (
    <Entypo name="news" size={22} color="black" color={focused ? '#0b889bff' : 'grey'}/> 
    )}}/>

      <Tabs.Screen 
    name ='settings' options={{title: 'Settings', tabBarIcon: ({focused}) => (
    <Feather name="settings" size={22} color="black" color={focused ? '#0b889bff' : 'grey'}/>
    )}}/>
    </Tabs>
)
}

export default  DashboardLayout