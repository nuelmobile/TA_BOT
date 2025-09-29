import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { router } from "expo-router";

import {AntDesign, FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";


const index = () => {

  return (
    <SafeAreaView style={styles.container}>
     
      <View>
        <MaterialCommunityIcons name="hand-coin-outline" size={150} color='#0b889bff' style={styles.icon}/>
       
      <Text style={styles.text}>
     Signal Credits
      </Text>

      <Text style={styles.subText}>
       Watch and Earn more credits to unlock premium signals and features.
      </Text>

      </View>

      <View style={styles.progressContainer}>
            <FontAwesome name="circle" size={24} color='#6A6F70' />
            <FontAwesome name="circle" size={24} color='#6A6F70' />
           <FontAwesome name="circle" size={24} color='#0b889bff'/>
          </View>  

      <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 100, paddingHorizontal: 40}}>
        <TouchableOpacity onPress={() => {
                            router.push('/onboarding2');
                          }}>
          <AntDesign name="left" size={24} color='#0b889bff' />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
                            router.push('/login');
                          }}>
          <Text style={{
            color: '#0b889bff', fontSize: 18, fontWeight: "bold",
          }}> Skip
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
                            router.push('/login');
                          }}>
          <AntDesign name="right" size={24} color='#0b889bff' />
        </TouchableOpacity>

      </View>

      </SafeAreaView>
   
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#020105ff',
},

icon: {
    marginVertical: 20,
    alignSelf: 'center',
    marginTop: 150

  },
  text: {
    color: '#0b889bff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subText: {
    color: '#0b889bff',
    textAlign: 'center',
    fontSize: 14,
    marginHorizontal: 10
  },

  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // center horizontally
    alignItems: 'center',
    gap: 16,                  // spacing between dots
    marginTop: 40,
              // fix the width of container
  },
});
