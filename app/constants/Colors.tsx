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

    <StatusBar barStyle="light-content" backgroundColor='#00DEFE' />


     <View>
          <Text style={{textAlign: 'center', 
          marginTop: 100, 
          fontSize: 22, 
          fontWeight:'bold', 
          marginBottom: -7, 
          }}>Welcome trader!</Text>
          <Text style={{textAlign: 'center', fontSize: 14, fontWeight:'bold'}}>Login to your account</Text>        
     </View>



       <View style={styles.blackBox}>
      <View>
        <TextInput
        placeholderTextColor={'#00DEFE'}
        style={{borderRadius: 16, borderRightWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 6, borderColor: '#00DEFE', borderWidth: 2, width: '96%', marginHorizontal: 10, marginTop: 50, marginBottom: 20}}
          placeholder = 'Email'/>

            <TextInput
            placeholderTextColor={'#00DEFE'}
        style={{borderRadius: 16, borderRightWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 6, borderColor: '#00DEFE', borderWidth: 2, width: '96%', marginHorizontal: 10, marginBottom: 20}}
          placeholder = 'Password'/>

          <TouchableOpacity style={{alignItems:'flex-end'}}>
          <Link href = '/forget_password' style={{textAlign: 'center', fontSize: 12, color: '#00DEFE', fontWeight:'bold', marginBottom: 20,}}> 
          Forgot password?      
          </Link>                 
        </TouchableOpacity> 

          <TouchableOpacity style={{
            backgroundColor: '#00DEFE', 
            padding: 10, 
            borderWidth: 2, 
            width: '96%', 
            marginHorizontal: 10, 
            marginBottom: 20, 
            borderRadius: 16, 
            borderColor:'#00DEFE',
            borderLeftColor: '#f6f6f6ff',
            borderRightColor: '#f6f6f6ff',
            borderBottomColor: '#f6f6f6ff',
            borderRightWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 6,
            }}>

              <Link href='/home'>
            <Text  style={{textAlign: 'center', color: '#000000ff', fontSize: 14, fontWeight: 'bold'}}> Login </Text>
            </Link>
          </TouchableOpacity>
      </View>
       <View>

        <TouchableOpacity>
          <Link href = '/signup' style={{textAlign: 'center', fontSize: 12, color: '#00DEFE', fontWeight:'bold'}}> 
          Sign up instead       
          </Link>                 
        </TouchableOpacity> 
     </View>
     </View>

      
    </SafeAreaView>
    
    
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#00DEFE',
},

blackBox: {
  flex: 1,
  marginTop: 100,
  backgroundColor: '#000000ff',
  borderTopLeftRadius: 50,
  borderTopRightRadius: 50,
  padding: 20,
}
})