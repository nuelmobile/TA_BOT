import React, {useState} from 'react';
import {
 
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import {Feather, MaterialIcons, FontAwesome5, Entypo} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dark-mode only Settings screen
// - No bottom navigation included
// - Appearance section removed
// - Uses StyleSheet (no NativeWind)
// - Grouped notification sub-options
// - Clean, rounded cards and separators

const ACCENT = "#9aa2a0";
const BG = '#020105ff'
const CARD = '#020105ff'
const BORDER = '#070518ff';
const TEXT = '#0b889bff';
const SUBTEXT = "grey";
const DANGER_BG = '#FF0033';
const DANGER_TEXT = '#020105ff';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // Notification toggles
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [sound, setSound] = useState<boolean>(true);
  const [vibration, setVibration] = useState<boolean>(false);

  // Mock user data
  const userTitle = 'Hello Trader!';
  const credits = 2450;

  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      Alert.alert('Unable to open link');
    }
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          // replace with your auth logic
          try {
            navigation.navigate('Auth' as never);
          } catch (e) {
            // if navigation not available, ignore
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile header */}
        <View style={styles.profileCard}>
          <View style={styles.profileLeft}>
            <View style={styles.avatar}>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userTitle}</Text>
              <Text style={styles.profileCredits}>{credits} Credits Available</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert('Edit profile')}>
            <Feather name="edit-2" size={18} color={ACCENT} />
          </TouchableOpacity>
        </View>

        {/* Notifications card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notifications</Text>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <MaterialIcons name="notifications-active" size={20} color={ACCENT} />
              <View style={styles.rowTextWrap}>
                <Text style={styles.rowTitle}>Push Notifications</Text>
                <Text style={styles.rowSub}>Receive signal alerts</Text>
              </View>
            </View>

            <Switch
              value={pushNotifications}
              onValueChange={value => setPushNotifications(value)}
              trackColor={{true: ACCENT, false: BORDER}}
              thumbColor='#0b889bff'
            />
          </View>

          <View style={styles.separator} />

          <View style={styles.subRow}>
            <View style={styles.rowLeft}>
              <Feather name="volume-2" size={18} color={ACCENT} />
              <Text style={styles.subLabel}>Sound</Text>
            </View>
            <Switch
              value={sound}
              onValueChange={val => setSound(val)}
              trackColor={{true: ACCENT, false: BORDER}}
              thumbColor='#0b889bff'
            />
          </View>

          <View style={styles.subRow}>
            <View style={styles.rowLeft}>
              <Feather name="smartphone" size={18} color={ACCENT} />
              <Text style={styles.subLabel}>Vibration</Text>
            </View>
            <Switch
              value={vibration}
              onValueChange={val => setVibration(val)}
              trackColor={{true: ACCENT, false: BORDER}}
              thumbColor='#0b889bff'
            />
          </View>
        </View>

        {/* Account card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account</Text>

          <TouchableOpacity style={styles.listItem} onPress={() => Alert.alert('Change Password')}>
            <View style={styles.rowLeft}>
              <Feather name="lock" size={18} color={ACCENT} />
              <Text style={styles.listText}>Change Password</Text>
            </View>
            <Entypo name="chevron-right" size={20} color={SUBTEXT} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => Alert.alert('Manage Subscription')}>
            <View style={styles.rowLeft}>
              <FontAwesome5 name="receipt" size={18} color={ACCENT} />
              <Text style={styles.listText}>Manage Subscription</Text>
            </View>
            <Entypo name="chevron-right" size={20} color={SUBTEXT} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => Alert.alert('Export Data')}>
            <View style={styles.rowLeft}>
              <Feather name="download" size={18} color={ACCENT} />
              <Text style={styles.listText}>Export Data</Text>
            </View>
            <Entypo name="chevron-right" size={20} color={SUBTEXT} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => Alert.alert('Update Email')}>
            <View style={styles.rowLeft}>
              <Feather name="mail" size={18} color={ACCENT} />
              <Text style={styles.listText}>Update Email</Text>
            </View>
            <Entypo name="chevron-right" size={20} color={SUBTEXT} />
          </TouchableOpacity>
        </View>

        {/* About card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>

          <View style={styles.versionRow}>
            <View>
              <Text style={styles.rowTitle}>App Version</Text>
              <Text style={styles.rowSub}>2.1.0</Text>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Changelog')}>
              <Text style={styles.linkText}>What's New</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.listItem} onPress={() => openLink('https://example.com/terms')}>
            <Text style={styles.listText}>Terms of Service</Text>
            <Entypo name="link" size={18} color={ACCENT} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => openLink('https://example.com/privacy')}>
            <Text style={styles.listText}>Privacy Policy</Text>
            <Entypo name="link" size={18} color={ACCENT} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => Linking.openURL('mailto:support@example.com')}>
            <Text style={styles.listText}>Contact Support</Text>
            <Feather name="mail" size={18} color={ACCENT} />
          </TouchableOpacity>
        </View>

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} activeOpacity={0.9}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* spacing so content isn't hidden under system UI */}
        <View style={{height: 64}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: BG},
  scrollContent: {padding: 16},

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CARD,
    borderColor: BORDER,
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 10,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
  },
  profileLeft: {flexDirection: 'row', alignItems: 'center'},
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginBottom: 10,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
  },
  avatarText: {color: '#001', fontWeight: '700'},
  profileInfo: {marginLeft: 12},
  profileName: {color: TEXT, fontWeight: '700', fontSize: 16},
  profileCredits: {color: SUBTEXT, fontSize: 12, marginTop: 2},
  iconButton: {padding: 8},

  card: {
    marginTop: 12,
    backgroundColor: CARD,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BORDER,
    padding: 14,
    marginBottom: 10,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
  },
  cardTitle: {color: ACCENT, fontWeight: '700', marginBottom: 8},

  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8},
  rowLeft: {flexDirection: 'row', alignItems: 'center'},
  rowTextWrap: {marginLeft: 10, maxWidth: 240},
  rowTitle: {color: TEXT, fontWeight: '600'},
  rowSub: {color: SUBTEXT, fontSize: 12, marginTop: 2},
  separator: {height: 1, backgroundColor: BORDER, marginVertical: 8},
  subRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6},
  subLabel: {color: TEXT, marginLeft: 10},

  listItem: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12},
  listText: {color: TEXT, marginLeft: 12},

  versionRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10},
  linkText: {color: ACCENT, fontWeight: '600'},

  signOutButton: {marginTop: 18, backgroundColor: DANGER_BG, borderRadius: 10, paddingVertical: 12, alignItems: 'center'},
  signOutText: {color: DANGER_TEXT, fontWeight: '700'},
});
