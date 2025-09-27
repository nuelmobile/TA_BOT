import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Linking,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Categories (NFT removed)
const categories = ["All", "Bitcoin", "Ethereum", "DeFi", "Regulation"];

// Demo news (10 items)
const demoNews = [
  {
    id: "1",
    category: "Bitcoin",
    time: "2 hours ago",
    title: "Major Banking Institution Announces Bitcoin Integration",
    description:
      "Financial giant reveals plans to offer Bitcoin trading services to retail customers...",
    source: "CryptoNews",
    image:
      "https://cdn.pixabay.com/photo/2017/08/15/05/24/stock-2645476_960_720.jpg",
    link: "https://cryptonews.com",
  },
  {
    id: "2",
    category: "Ethereum",
    time: "4 hours ago",
    title: "Ethereum Network Sees Record Transaction Volume",
    description:
      "Daily transaction count reaches new highs as DeFi protocols and NFT marketplaces drive activity...",
    source: "DeFi Tribune",
    image:
      "https://cdn.pixabay.com/photo/2017/01/10/23/01/blockchain-1966550_960_720.jpg",
    link: "https://defitribune.com",
  },
  {
    id: "3",
    category: "DeFi",
    time: "6 hours ago",
    title: "New DeFi Protocol Launches with $50M TVL",
    description:
      "Revolutionary lending protocol secures significant total value locked within hours of launch...",
    source: "DeFi Pulse",
    image:
      "https://cdn.pixabay.com/photo/2017/12/13/18/06/bitcoin-3014614_960_720.jpg",
    link: "https://defipulse.com",
  },
  {
    id: "4",
    category: "Bitcoin",
    time: "7 hours ago",
    title: "Bitcoin Hashrate Hits Record High",
    description:
      "Bitcoin miners push the hashrate to an all-time high, showing network resilience...",
    source: "CoinDesk",
    image:
      "https://cdn.pixabay.com/photo/2017/12/13/18/06/bitcoin-3014614_960_720.jpg",
    link: "https://coindesk.com",
  },
  {
    id: "5",
    category: "Ethereum",
    time: "9 hours ago",
    title: "Ethereum Developers Announce Upgrade",
    description:
      "The next Ethereum hard fork is set to improve scalability and reduce fees...",
    source: "Ethereum Blog",
    image:
      "https://cdn.pixabay.com/photo/2018/01/23/09/50/ethereum-3108614_960_720.jpg",
    link: "https://ethereum.org",
  },
  {
    id: "6",
    category: "Regulation",
    time: "10 hours ago",
    title: "Government Considers Crypto Regulation Framework",
    description:
      "Policymakers are drafting a framework for regulating digital assets...",
    source: "Reuters",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/09/32/bitcoin-1862758_960_720.jpg",
    link: "https://reuters.com",
  },
  {
    id: "7",
    category: "Bitcoin",
    time: "12 hours ago",
    title: "Bitcoin Price Surges Above $30,000",
    description:
      "Strong buying interest pushes Bitcoin above key resistance levels...",
    source: "CryptoNews",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/09/32/bitcoin-1862758_960_720.jpg",
    link: "https://cryptonews.com",
  },
  {
    id: "8",
    category: "DeFi",
    time: "13 hours ago",
    title: "DeFi Lending Sees Record Inflows",
    description:
      "Major investors move funds into DeFi lending protocols, driving growth...",
    source: "DeFi Pulse",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/09/32/bitcoin-1862758_960_720.jpg",
    link: "https://defipulse.com",
  },
  {
    id: "9",
    category: "Ethereum",
    time: "14 hours ago",
    title: "Layer 2 Adoption Increases",
    description:
      "Ethereum scaling solutions see higher adoption as gas fees remain high...",
    source: "Blockworks",
    image:
      "https://cdn.pixabay.com/photo/2018/01/23/09/50/ethereum-3108614_960_720.jpg",
    link: "https://blockworks.co",
  },
  {
    id: "10",
    category: "Regulation",
    time: "16 hours ago",
    title: "Global Regulators Meet to Discuss Stablecoins",
    description:
      "International regulators meet to create guidelines for stablecoins...",
    source: "Financial Times",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/09/32/bitcoin-1862758_960_720.jpg",
    link: "https://ft.com",
  },
];

const NewsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const filteredNews =
    selectedCategory === "All"
      ? demoNews
      : demoNews.filter((item) => item.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      {/* Categories in horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.activeCategory,
            ]}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Loading Indicator */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00DEFE" />
          <Text style={styles.loadingText}>Loading News...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredNews}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.categoryLabel}>
                  {item.category} • {item.time}
                </Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.sourceText}>{item.source}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                    <Text style={styles.linkText}>Open ↗</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020105ff',
  },
  categoriesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    
  },
  categoryButton: {
    backgroundColor: '#020105ff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 12,
    borderColor: '#070518ff',
    borderWidth: 2,
    
  },
  activeCategory: {
    backgroundColor: "#07120f",

  },
  categoryText: {
    color: '#0b889bff',
    fontSize: 13,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#aaaaaaff",
  },
  card: {
    backgroundColor: '#020105ff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    overflow: "hidden",
    shadowRadius: 6,
    borderColor: '#070518ff',
    borderWidth: 1,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
  },
  cardImage: {
    width: "100%",
    height: 140, // reduced size
  },
  cardContent: {
    padding: 10,
  },
  categoryLabel: {
    color: "#888",
    fontSize: 11,
  },
  cardTitle: {
    color: '#0b889bff',
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 3,
  },
  cardDescription: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 3,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  sourceText: {
    color: "#666",
    fontSize: 11,
  },
  linkText: {
    color: "#00DEFE",
    fontSize: 11,
  },
});
