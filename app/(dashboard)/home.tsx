import {React, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as NavigationBar from 'expo-navigation-bar';

// Icons
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const home = () => {


 useEffect (() => {
  NavigationBar.setBackgroundColorAsync ('#000000');
 },[])

  return (
    <SafeAreaView style={styles.container}>
      {/* Status bar */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScrollView>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Ionicons name="person-circle-outline" size={100} color='#0b889bff' />
          <Text style={styles.headerTitle}>Hey Trader!</Text>
          <Text style={styles.headerSubtitle}>Ready to trade smart?</Text>
        </View>

        {/* Signal Credits Card */}
        <View style={styles.creditCard}>
          <Text style={styles.creditText}>Signal Credits: 2,500</Text>

          {/* Buttons */}
          <View style={styles.creditButtonRow}>
            <TouchableOpacity style={styles.creditButton}>
              <MaterialCommunityIcons name="video-plus" size={28} color="black" />
              <Text style={styles.creditButtonText}>Watch & Earn</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.creditButton}>
              <FontAwesome6 name="cart-plus" size={18} color="black" />
              <Text style={styles.creditButtonText}>Buy Credit</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.dailyBonusText}>+20 Daily Bonus</Text>
        </View>

        {/* Tip of the Day */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>
            <MaterialCommunityIcons
              name="lightbulb-on"
              size={20}
              color="#FF9900"
            />{' '}
            Tip for the day
          </Text>
          <Text style={styles.tipDescription}>
            Never invest more than you can afford to lose. Always use stop loss
            orders to manage your risks effectively.
          </Text>
        </View>

        {/* Latest Signal Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest signal highlights</Text>
          <Text style={styles.viewAllText}>View all</Text>
        </View>

        {/* Example Signal Cards */}
        <TouchableOpacity style={styles.signalCard}>
          <View>
            <Text style={styles.signalPair}>BTC/USDT</Text>
            <Text style={styles.signalSource}>FlowX</Text>
          </View>
          <View>
            <View style={[styles.signalStatus, { backgroundColor: '#FF9900' }]}>
              <Text style={styles.signalStatusText}>WAIT</Text>
            </View>
            <Text style={styles.signalTime}>4:00 PM</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signalCard}>
          <View>
            <Text style={styles.signalPair}>SOL/USDT</Text>
            <Text style={styles.signalSource}>SmartX</Text>
          </View>
          <View>
            <View style={[styles.signalStatus, { backgroundColor: '#FF0033' }]}>
              <Text style={styles.signalStatusText}>SELL</Text>
            </View>
            <Text style={styles.signalTime}>Just now</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signalCard}>
          <View>
            <Text style={styles.signalPair}>DOGE/USDT</Text>
            <Text style={styles.signalSource}>TrendX</Text>
          </View>
          <View>
            <View style={[styles.signalStatus, { backgroundColor: '#00C853' }]}>
              <Text style={styles.signalStatusText}>BUY</Text>
            </View>
            <Text style={styles.signalTime}>Just now</Text>
          </View>
        </TouchableOpacity>

        {/* Watch & Earn Section */}
        <View style={styles.watchSection}>
          <Text style={styles.watchTitle}>
            Watch & earn more Signal Credits
          </Text>
        </View>

        {/* Video Category Buttons */}
        <View style={styles.videoCategoryRow}>

          <TouchableOpacity style={styles.videoCategoryButton}>
            <Text style={styles.videoCategoryText}>All Videos</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.videoCategoryButton}>
            <Text style={styles.videoCategoryText}>Getting Started</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.videoCategoryButton}>
            <Text style={styles.videoCategoryText}>Educational</Text>
          </TouchableOpacity>
        </View>

        {/* Video Cards */}
        <TouchableOpacity style={styles.videoCard}>
          <View>
            <Text style={styles.videoTitle}>
              Getting Started With Crypto Trading
            </Text>
            <Text style={styles.videoSubtitle}>5:30 - Getting Started</Text>
            <Text style={styles.videoReward}>+5 Credits</Text>
          </View>
          <FontAwesome6 name="greater-than" size={14} color="#00DEFE" />
        </TouchableOpacity>


        <TouchableOpacity style={styles.videoCard}>
          <View>
            <Text style={styles.videoTitle}>
              Getting Started With Crypto Trading
            </Text>
            <Text style={styles.videoSubtitle}>10:30 - Getting Started</Text>
            <Text style={styles.videoReward}>+10 Credits</Text>
          </View>
          <FontAwesome6 name="greater-than" size={14} color="#00DEFE" />
        </TouchableOpacity>
       

        <TouchableOpacity style={styles.videoCard}>
          <View>
            <Text style={styles.videoTitle}>
              Introduction to Crypto Currency
            </Text>
            <Text style={styles.videoSubtitle}>4:70 - Educational</Text>
            <Text style={styles.videoReward}>+5 Credits</Text>
          </View>
          <FontAwesome6 name="greater-than" size={14} color="#00DEFE" />
        </TouchableOpacity>


        <TouchableOpacity style={styles.videoCard}>
          <View>
            <Text style={styles.videoTitle}>
              Getting Started With Crypto Trading
            </Text>
            <Text style={styles.videoSubtitle}>9:30 - Getting Started</Text>
            <Text style={styles.videoReward}>+10 Credits</Text>
          </View>
          <FontAwesome6 name="greater-than" size={14} color="#00DEFE" />
        </TouchableOpacity>


        <TouchableOpacity style={styles.videoCard}>
          <View>
            <Text style={styles.videoTitle}>
              Getting Started With SMC Trading Strategy
            </Text>
            <Text style={styles.videoSubtitle}>11:03 - Getting Started</Text>
            <Text style={styles.videoReward}>+10 Credits</Text>
          </View>
          <FontAwesome6 name="greater-than" size={14} color="#00DEFE" />
        </TouchableOpacity>


        {/* You can repeat more video cards here... */}

        {/* Community Section */}
        <View style={styles.communitySection}>
          <Text style={styles.communityText}>
            Join our community & earn more credits.
          </Text>
        </View>

        <View style={styles.communityIcons}>
          <FontAwesome6 name="discord" size={30} color='#0b889bff' />
          <FontAwesome5 name="telegram-plane" size={30} color='#0b889bff' />
          <FontAwesome6 name="x-twitter" size={30} color='#0b889bff'/>
          <FontAwesome name="youtube-play" size={30} color='#0b889bff' />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;

/* ---------------------- Styles ---------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020105ff',
    paddingVertical: 15, marginBottom: -10
  },

  /* Header */
  headerContainer: { alignItems: 'center' },
  headerTitle: { color: '#0b889bff', fontSize: 22 },
  headerSubtitle: { color: '#0b889bff', fontSize: 12, marginBottom: 10 },

  /* Signal Credits */
  creditCard: {
    alignItems: 'center',
    backgroundColor:  '#020105ff',
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 16,
    borderColor: '#070518ff',
    borderWidth: 1,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
  },
  creditText: { fontWeight: 'bold', color: '#0b889bff', fontSize: 12 },
  creditButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  creditButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1.5,
    backgroundColor: '#0b889bff',
    padding: 5,
    marginHorizontal: 10,
    width: '44%',
    borderRadius: 16,
    borderColor: '#070518ff',
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  creditButtonText: {
    color: '#0c092dff',
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  dailyBonusText: {
    fontWeight: 'bold',
    color: '#00C853',
    fontSize: 12,
    padding: 5,
  },

  /* Tip */
  tipCard: {
    backgroundColor: '#020105ff',
       borderRadius: 16,
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 10,
    padding: 10,
  },
  
  tipTitle: {
    color: '#FF9900',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tipDescription: {
    color: '#0b889bff',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 10,
  },

  /* Section header */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
  sectionTitle: {
    color: '#0b889bff',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  viewAllText: {
    color: '#0b889bff',
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  /* Signal Card */
  signalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    backgroundColor: '#020105ff',
    padding: 5,
    borderRadius: 16,
    borderColor: '#070518ff',
    borderWidth: 2,
    marginBottom: 10,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
  },
  signalPair: { color: '#0b889bff', fontSize: 12 },
  signalSource: { color: "#9aa2a0", fontSize: 12, marginHorizontal: 5 },
  signalStatus: {
    borderRadius: 7,
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 5,
   
  },
  signalStatusText: {
    color: '#020105ff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  signalTime: { color: "#9aa2a0", fontSize: 12, marginHorizontal: 5 },

  /* Watch Section */
  watchSection: { marginTop: 10 },
  watchTitle: {
    color: '#0b889bff',
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 10,
    textAlign: 'left',
  },

  /* Video Category */
  videoCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   paddingRight: 20,
    marginBottom: 10,
    marginHorizontal: 10,

  },
  videoCategoryButton: {
    borderColor: '#070518ff',
    borderWidth: 1,
    borderRadius: 16,
    alignContent: 'center',
    marginHorizontal: 5,
  },    
 
  videoCategoryText: {
    color: '#0b889bff',
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 10,
  },

  /* Video Card */
  videoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#020105ff',
    padding: 5,
    alignItems: 'center',
    borderRadius: 16,
    borderColor: '#070518ff',
    borderWidth: 1,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
  },
  videoTitle: {
    color: '#0b889bff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
  },
  videoSubtitle: {
    color: "#9aa2a0",
    fontSize: 12,
    fontWeight: 'bold',
  },
  videoReward: {
    color: "#9aa2a0",
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  /* Community */
  communitySection: { marginTop: 10 },
  communityText: {
    color: '#0b889bff',
    fontSize: 12,
    marginHorizontal: 10,
    marginVertical: 10,
    textAlign: 'center',
  },
  communityIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
  },
});



