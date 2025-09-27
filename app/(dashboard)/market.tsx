// app/CryptoList.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, G } from "react-native-svg";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const CryptoList = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [globalData, setGlobalData] = useState<any>(null);
  const [fearGreed, setFearGreed] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch coins
  const fetchCoins = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 20,
            sparkline: false,
          },
        }
      );
      setCoins(response.data);
      setFilteredCoins(response.data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  // Fetch global data + BTC/ETH dominance
  const fetchGlobal = async () => {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/global");
      setGlobalData(response.data.data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching global data:", error);
    }
  };

  // Fetch Fear & Greed Index
  const fetchFearGreed = async () => {
    try {
      const response = await axios.get("https://api.alternative.me/fng/");
      setFearGreed(response.data.data[0]);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching Fear & Greed Index:", error);
    }
  };

  useEffect(() => {
    fetchCoins();
    fetchGlobal();
    fetchFearGreed();

    // Auto refreshers
    const coinsInterval = setInterval(fetchCoins, 30000); // every 30s
    const globalInterval = setInterval(fetchGlobal, 60000); // every 1m
    const fngInterval = setInterval(fetchFearGreed, 900000); // every 15m

    return () => {
      clearInterval(coinsInterval);
      clearInterval(globalInterval);
      clearInterval(fngInterval);
    };
  }, []);

  // Pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchCoins(), fetchGlobal(), fetchFearGreed()]);
    setRefreshing(false);
  };

  // coin row
  const renderItem = ({ item }: { item: Coin }) => {
    const priceChange = item.price_change_percentage_24h ?? 0;
    const priceColor = priceChange > 0 ? "#4CAF50" : "#F44336";
    const priceText =
      typeof item.current_price === "number"
        ? `$${item.current_price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "-";

    return (
      <View style={styles.coinCard}>
        <Image source={{ uri: item.image }} style={styles.coinImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.coinName}>{item.name}</Text>
          <Text style={styles.coinSymbol}>{item.symbol.toUpperCase()}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.coinPrice}>{priceText}</Text>
          <Text style={[styles.coinChange, { color: priceColor }]}>
            {Number(priceChange).toFixed(2)}%
          </Text>
        </View>
      </View>
    );
  };

  // Global Overview (now includes BTC/ETH dominance)
  const renderGlobalOverview = () => {
    if (!globalData) return null;
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Global Market Overview</Text>
        <Text style={styles.cardText}>
          Total Market Cap: $
          {(globalData.total_market_cap.usd / 1_000_000_000_000).toFixed(2)}T
        </Text>
        <Text style={styles.cardText}>
          24h Volume: ${(globalData.total_volume.usd / 1_000_000_000).toFixed(2)}B
        </Text>
        <Text style={styles.cardText}>
          24h Market Change:{" "}
          {globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%
        </Text>
        <Text style={styles.cardText}>
          BTC Dominance: {globalData.market_cap_percentage.btc.toFixed(2)}%
        </Text>
        <Text style={styles.cardText}>
          ETH Dominance: {globalData.market_cap_percentage.eth.toFixed(2)}%
        </Text>
        {lastUpdated && (
          <Text style={styles.lastUpdated}>
            Last Updated: {lastUpdated.toLocaleTimeString()}
          </Text>
        )}
      </View>
    );
  };

  // Gauge component
  const Gauge = ({
    value,
    size = 120,
    strokeWidth = 12,
    color = '#0b889bff',
    label = "",
  }: {
    value: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    label?: string;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, value));
    const strokeDashoffset = circumference * (1 - clamped / 100);

    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            width: size,
            height: size,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <G rotation="-90" origin={`${cx}, ${cy}`}>
              <Circle
                cx={cx}
                cy={cy}
                r={radius}
                stroke="#333"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <Circle
                cx={cx}
                cy={cy}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
              />
            </G>
          </Svg>

          <View style={styles.gaugeCenter}>
            <Text style={[styles.gaugeValue, { color }]}>{clamped}</Text>
            <Text style={styles.gaugeLabel}>{label}</Text>
          </View>
        </View>
      </View>
    );
  };

  // Fear & Greed
  const renderFearGreed = () => {
    if (!fearGreed) return null;

    const value = parseInt(fearGreed.value, 10) || 0;
    let color = "#FFA500";
    if (value <= 25) color = "#F44336"; // Fear
    else if (value <= 50) color = "#FF9800"; // Neutral/Fear
    else if (value <= 75) color = "#4CAF50"; // Greed
    else color = "#00DEFE"; // Extreme Greed

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fear & Greed Index</Text>
        <View style={styles.gaugeWrapper}>
          <Gauge
            value={value}
            color={color}
            label={fearGreed.value_classification}
          />
        </View>
        {lastUpdated && (
          <Text style={styles.lastUpdated}>
            Last Updated: {lastUpdated.toLocaleTimeString()}
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredCoins}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            {renderGlobalOverview()}
            {renderFearGreed()}
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#00DEFE"
          />
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
};

export default CryptoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#020105ff', marginBottom: -40
  },
  // ----- Cards -----
  card: {
    backgroundColor: '#020105ff',
    borderRadius: 12,
    borderColor: '#070518ff',
    borderWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#0e233fff",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#0b889bff',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#0b889bff',
    marginBottom: 2,
  },
  lastUpdated: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
    fontStyle: "italic",
  },
  // ----- Gauge styles -----
  gaugeWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 6,
  },
  gaugeCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  gaugeValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  gaugeLabel: {
    fontSize: 13,
    color: "#FFF",
    marginTop: 2,
    textTransform: "capitalize",
  },
  // ----- Coins -----
  coinCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:  '#020105ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderColor: '#070518ff',
    borderWidth: 1,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
    elevation: 4,
  },
 
  coinImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  coinName: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#0b889bff',
  },
  coinSymbol: {
    color: "#a8b0af",
    fontSize: 12,
  },
  coinPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: '#0b889bff',
  },
  coinChange: {
    fontSize: 14,
    fontWeight: "500",
  },
});
