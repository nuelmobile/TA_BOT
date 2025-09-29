import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar,} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {useEffect} from 'react'

import * as NavigationBar from 'expo-navigation-bar';


import Fontisto from '@expo/vector-icons/Fontisto';
import { Link } from 'expo-router';

const Index = () => {
    
  useEffect (() => {
    NavigationBar.setBackgroundColorAsync ('#000000');
   },[])

  return (
    <SafeAreaView style={styles.container}>

    <StatusBar barStyle='dark-content'  backgroundColor='#020105ff' />


     <View>
          <Text style={{textAlign: 'center', 
          marginTop: 100, 
          fontSize: 26, 
          fontWeight:'bold', 
          marginBottom: -7, 
          color: '#0b889bff'
          }}>Welcome trader!</Text>
          <Text style={{textAlign: 'center', fontSize: 14, fontWeight:'bold', color: '#0b889bff', marginTop:5}}>Sign up a new account</Text>        
     </View>

      <View>
        <TextInput
        placeholderTextColor={'#6A6F70'}
        style={{borderRadius: 16, borderRightWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 6, borderColor: '#0b889bff', padding: 10, borderWidth: 2, width: '96%', marginHorizontal: 10, marginTop: 50, marginBottom: 20}}
          placeholder = 'Email'/>

            <TextInput
            placeholderTextColor={'#6A6F70'}
        style={{borderRadius: 16, borderRightWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 6, borderColor: '#0b889bff', borderWidth: 2, padding: 10, width: '96%', marginHorizontal: 10, marginBottom: 20}}
          placeholder = 'Password'/>

           <TouchableOpacity style={{
            backgroundColor:  '#0b889bff', 
            padding: 10, 
            borderWidth: 2, 
            width: '96%', 
            marginHorizontal: 10, 
            marginBottom: 20, 
            borderRadius: 16, 
            borderColor:'#0b889bff',
            // borderLeftColor: '#f6f6f6ff',
            // borderRightColor: '#f6f6f6ff',
            // borderBottomColor: '#f6f6f6ff',
            // borderRightWidth: 2,
            // borderLeftWidth: 2,
            // borderBottomWidth: 6,
            }}>

              <Link href='/home'>
            <Text  style={{textAlign: 'center', color: '#000000ff', fontSize: 14, fontWeight: 'bold'}}> Sign up </Text>
            </Link>
          </TouchableOpacity>
      </View>
       <View>

        <TouchableOpacity>
          <Link href = '/' style={{textAlign: 'center', fontSize: 12, color: '#0b889bff', fontWeight:'bold'}}> 
          Login instead       
          </Link>                 
        </TouchableOpacity> 
     </View>
    

      
    </SafeAreaView>
    
    
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#020105ff',
},
})