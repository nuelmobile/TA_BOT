// screens/TA_Screen.js
import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Linking,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

// --------------------
// SIGNAL METER (SVG)
// --------------------
const SignalMeter = ({ percentage = 82, size = 150 }) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(percentage, 100));
  const strokeDashoffset = circumference - (circumference * clamped) / 100;

  const labelColor = useMemo(() => {
    if (clamped >= 70) return '#00C853'; // strong buy
    if (clamped >= 40) return "#FFB347"; // neutral
    return "#FF4E50"; // sell
  }, [clamped]);

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size}>
        {/* background ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#0f1113"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* trail */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1b1e20"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
        {/* progress */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={labelColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
          fill="none"
        />
      </Svg>

      {/* centered label */}
      <View style={styles.meterLabel}>
        <Text style={[styles.meterPercent, { color: labelColor }]}>{clamped}%</Text>
        <Text style={styles.meterText}>
          {clamped >= 70 ? "Strong Buy" : clamped >= 40 ? "Neutral" : "Strong Sell"}
        </Text>
      </View>
    </View>
  );
};

// --------------------
// MAIN TA SCREEN
// --------------------
const TA_Screen = () => {
  const [signal] = useState({
    pair: "BTC/USDT",
    timeframe: "4H",
    strategy: "Signal Strategy: TrendX",
    entry: "$109,200 - $109,800",
    tp1: "$100,000",
    tp2: "$105,500",
    tp3: "$110,000",
    sl: "$108,800",
    rr: "1:3",
    reasons: [
      "Bullish Market Structure",
      "Demand Zone Bounce",
      "EMA 50/200 Crossover",
      "Strong Candle Confirmation",
    ],
    confidence: 82,
    buyLink: "https://www.binance.com/en/trade/BTC_USDT",
    sellLink: "https://www.bybit.com/en-US/trade/spot/BTCUSDT",
  });

  const [reasonsOpen, setReasonsOpen] = useState(true);

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else await Linking.openURL(url);
    } catch (err) {
      console.warn("Cannot open url", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor='#020105ff' />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Coin Tabs */}
        <View style={styles.coinTabs}>
          {["BTC", "ETH", "SOL", "BNB", "LINK"].map((c) => (
            <TouchableOpacity key={c} style={[styles.coinTab, c === "BTC" && styles.coinActive]}>
              <Text style={[styles.coinText, c === "BTC" && styles.coinActiveText]}>{c}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.creditsBox}>
            <Text style={styles.creditsText}>120 cred</Text>
          </View>
        </View>

        {/* Chart placeholder */}
        <View style={styles.chartCard}>
          <Text style={styles.chartPlaceholderText}>
            TradingView / Lightweight Chart Placeholder
          </Text>
        </View>

        {/* Timeframe selector */}
        <View style={styles.tfRow}>
          {["1H", "4H", "1D", "1M"].map((tf) => (
            <TouchableOpacity key={tf} style={[styles.tfBtn, tf === "4H" && styles.tfActive]}>
              <Text style={[styles.tfText, tf === "4H" && styles.tfActiveText]}>{tf}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SIGNAL SECTION */}
        <View style={styles.signalSection}>
          {/* Signal Header */}
          <View style={styles.signalHeader}>
            <Text style={styles.pairText}>{signal.pair}</Text>
            <Text style={styles.tfSmall}>{signal.timeframe}</Text>
            <Text style={styles.strategyText}>{signal.strategy}</Text>
          </View>

          {/* Signal Meter */}
          <View style={styles.meterBox}>
            <SignalMeter percentage={signal.confidence} size={150} />
          </View>

          {/* Signal Detail Card */}
          <View style={styles.signalDetailCard}>
            <Text style={{color:'#0b889bff', fontWeight: 600, fontSize: 16,paddingBottom:10}}>Signal Details:</Text>
            <Text style={styles.cardTitle}>Entry Zone</Text>
            <Text style={styles.cardValue}>{signal.entry}</Text>

            <Text style={styles.cardTitle}>Stop Loss</Text>
            <Text style={styles.cardValue}>{signal.sl}</Text>
            
            <Text style={[styles.cardTitle, { marginTop: 12 }]}>Take Profit</Text>
            <Text style={styles.tpText}>TP1: {signal.tp1}</Text>
            <Text style={styles.tpText}>TP2: {signal.tp2}</Text>
            <Text style={styles.tpText}>TP3: {signal.tp3}</Text>

            <Text style={styles.cardTitle}>Risk/Reward</Text>
            <Text style={styles.cardValue}>{signal.rr}</Text>
          </View>

          {/* Reasons */}
          <View style={styles.reasonRow}>
            <TouchableOpacity onPress={() => setReasonsOpen((s) => !s)}>
              <Text style={styles.reasonTitle}>Reasons {reasonsOpen ? "▾" : "▸"}</Text>
            </TouchableOpacity>
            {reasonsOpen && (
              <View style={styles.reasonsList}>
                {signal.reasons.map((r, i) => (
                  <View key={i} style={styles.reasonItem}>
                    <Text style={styles.reasonIcon}>✓</Text>
                    <Text style={styles.reasonText}>{r}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={{alignItems: 'center'}}>
              <Text style={styles.warningIcon}>⚠️</Text>
               </View>
                            <Text style={{textAlign: 'center', color: "#f0d8a7",}}>
                Always apply proper risk management (1–2% per trade)
              </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.buyBtn]}
              onPress={() => openLink(signal.buyLink)}
            >
              <Text style={styles.actionText}>BUY</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.sellBtn]}
              onPress={() => openLink(signal.sellLink)}
            >
              <Text style={styles.actionText}>SELL</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TA_Screen;

// --------------------
// Styles
// --------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020105ff', marginBottom: -50},

  /* coin tabs */
  coinTabs: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 12,
    gap: 8,
  },
  coinTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "transparent",
    marginRight: 8,
  },
  coinActive: {
    backgroundColor: "#07120f",
    borderWidth: 1,
    borderColor: "#013623",
  },
  coinText: { color: '#0b889bff', fontWeight: "700" },
  coinActiveText: { color:  '#0b889bff' },
  creditsBox: {
    marginLeft: "auto",
    backgroundColor: "#07120f",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  creditsText: { color: '#0b889bff', fontWeight: "700" },

  /* chart */
  chartCard: {
    margin: 12,
    borderRadius: 14,
    backgroundColor: '#020105ff',
    height: Math.round((width - 24) * 0.6),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
      borderColor: '#070518ff',
  },
  chartPlaceholderText: { color: "#6f7678" },

  /* timeframe */
  tfRow: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 10,
    justifyContent: "space-between",
  },
  tfBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: '#020105ff',
    borderRadius: 12,
  },
  tfActive: { backgroundColor: "#07120f", borderWidth: 1, borderColor: "#0f3624" },
  tfText: { color:  '#0b889bff' , fontWeight: "700" },
  tfActiveText: { color:"#00DEFE"},

  /* signal section */
  signalSection: {
    margin: 12,
    borderRadius: 14,
    backgroundColor: '#020105ff',
    padding: 14,
    borderWidth: 1,
     borderColor: '#070518ff',
  },

  signalHeader: { alignItems: "center", marginBottom: 12 },
  pairText: { color: '#0b889bff', fontSize: 22, fontWeight: "800" },
  tfSmall: { color: "#9aa2a0", marginTop: 4, fontWeight: "700" },
  strategyText: { marginTop: 6, color: "#9aa2a0" },

  meterBox: { alignItems: "center", marginVertical: 14 },

  meterLabel: { position: "absolute", alignItems: "center" },
  meterPercent: { fontSize: 24, fontWeight: "900" },
  meterText: { fontSize: 13, color: "#9aa2a0" },

  /* unified signal detail card */
  signalDetailCard: {
    marginTop: 10,
    backgroundColor: '#020105ff',
    padding: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderBottomWidth: 2,
     borderColor: '#070518ff',
  },
  cardTitle: { color: '#0b889bff', fontWeight: "700", paddingTop:10 },
  cardValue: { color: "#9aa2a0", fontWeight: "800", fontSize: 16, marginBottom: 10 },
  tpText: { color: "#9aa2a0", fontWeight: "700",},

  /* reasons */
  reasonRow: { marginTop: 16 },
  reasonTitle: { color: '#0b889bff', fontWeight: "700", fontSize: 16 },
  reasonsList: { marginTop: 8 },
  reasonItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  reasonIcon: { color: '#0b889bff', marginRight: 8, fontWeight: "900" },
  reasonText: { color: "#9aa2a0" },

  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
  },
  warningIcon: { marginRight: 8 },
  warningText: { color: "#f0d8a7", fontSize: 12 },

  /* action */
  actionRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  actionBtn: {
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    borderRadius: 14,
    alignItems: "center",
      borderColor: '#070518ff',
    justifyContent: "center",
  },

  buyBtn: { backgroundColor: '#00C853', borderWidth: 1, borderColor: "#00e07a" },
  sellBtn: { backgroundColor:'#FF0033', borderWidth: 1, borderColor: "#ff5c63" },
  actionText: { color: '#020105ff', fontWeight: "900", fontSize: 16 }
});
