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
          }}>Hey trader!</Text>
          <Text style={{textAlign: 'center', fontSize: 14, fontWeight:'bold', color: '#0b889bff', marginTop:5}}>Let's recover your password</Text>        
     </View>

      <View>
        <TextInput
        placeholderTextColor={'#6A6F70'}
        style={{borderRadius: 16, borderRightWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 6, borderColor: '#0b889bff', padding: 10, borderWidth: 2, width: '96%', marginHorizontal: 10, marginTop: 50, marginBottom: 20}}
          placeholder = 'Email'/>

  
           <TouchableOpacity style={{
            backgroundColor:  '#0b889bff', 
            padding: 10, 
            borderWidth: 2, 
            width: '96%', 
            marginHorizontal: 10, 
            marginBottom: 20, 
            borderRadius: 16, 
            borderColor:'#0b889bff',
            }}>

              <Link href='/home'>
            <Text  style={{textAlign: 'center', color: '#000000ff', fontSize: 14, fontWeight: 'bold'}}>Recover password</Text>
            </Link>
          </TouchableOpacity>
      </View>
       <View>

        <TouchableOpacity>
          <Link href = '/login' style={{textAlign: 'center', fontSize: 12, color: '#0b889bff', fontWeight:'bold'}}> 
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