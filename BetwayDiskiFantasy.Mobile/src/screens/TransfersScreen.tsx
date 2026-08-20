import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  Alert,
} from 'react-native';

interface PlayerMarketItem {
  id: number;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  team: string;
  price: number; // in Millions, e.g. 7.5
  totalPoints: number;
}

const MARKET_PLAYERS: PlayerMarketItem[] = [
  { id: 101, name: 'Lucas Ribeiro', position: 'FWD', team: 'Mamelodi Sundowns', price: 9.5, totalPoints: 48 },
  { id: 102, name: 'Relebohile Mofokeng', position: 'MID', team: 'Orlando Pirates', price: 8.0, totalPoints: 42 },
  { id: 103, name: 'Patrick Maswanganyi', position: 'MID', team: 'Orlando Pirates', price: 8.5, totalPoints: 45 },
  { id: 104, name: 'Gaston Sirino', position: 'MID', team: 'Kaizer Chiefs', price: 7.5, totalPoints: 31 },
  { id: 105, name: 'Ronwen Williams', position: 'GK', team: 'Mamelodi Sundowns', price: 6.0, totalPoints: 38 },
  { id: 106, name: 'Fawaaz Basadien', position: 'DEF', team: 'Stellenbosch FC', price: 5.5, totalPoints: 34 },
  { id: 107, name: 'Tshegofatso Mabasa', position: 'FWD', team: 'Orlando Pirates', price: 8.5, totalPoints: 40 },
  { id: 108, name: 'Given Msimango', position: 'DEF', team: 'Kaizer Chiefs', price: 5.0, totalPoints: 22 },
];

export default function TransfersScreen() {
  const [bank, setBank] = useState<number>(1.5); // Remaining budget in Millions
  const [freeTransfers, setFreeTransfers] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPosFilter, setSelectedPosFilter] = useState<string>('ALL');
  const [pendingTransfer, setPendingTransfer] = useState<PlayerMarketItem | null>(null);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const filteredPlayers = MARKET_PLAYERS.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          player.team.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPos = selectedPosFilter === 'ALL' || player.position === selectedPosFilter;
    return matchesSearch && matchesPos;
  });

  const handleBuyPlayer = (player: PlayerMarketItem) => {
    if (player.price > bank) {
      showAlert('Insufficient Funds', `You need R${player.price}m but only have R${bank}m in the bank.`);
      return;
    }

    setPendingTransfer(player);
  };

  const confirmTransfer = () => {
    if (!pendingTransfer) return;
    setBank((prev) => parseFloat((prev - pendingTransfer.price).toFixed(1)));
    if (freeTransfers > 0) {
      setFreeTransfers((prev) => prev - 1);
    }
    showAlert('Transfer Complete', `Successfully signed ${pendingTransfer.name}!`);
    setPendingTransfer(null);
  };

  const renderMarketCard = ({ item }: { item: PlayerMarketItem }) => (
    <View style={styles.card}>
      <View style={styles.cardMain}>
        <View style={styles.posBadge}>
          <Text style={styles.posText}>{item.position}</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.playerName}>{item.name}</Text>
          <Text style={styles.teamName}>{item.team}</Text>
        </View>
        <View style={styles.statsCol}>
          <Text style={styles.priceText}>R{item.price.toFixed(1)}m</Text>
          <Text style={styles.ptsText}>{item.totalPoints} pts</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buyBtn} onPress={() => handleBuyPlayer(item)}>
        <Text style={styles.buyBtnText}>+ Sign Player</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Transfer Header Bar */}
      <View style={styles.header}>
        <View style={styles.headerBox}>
          <Text style={styles.headerLabel}>Bank</Text>
          <Text style={styles.headerVal}>R{bank.toFixed(1)}m</Text>
        </View>
        <View style={styles.headerBox}>
          <Text style={styles.headerLabel}>Free Transfers</Text>
          <Text style={styles.headerVal}>{freeTransfers}</Text>
        </View>
      </View>

      {/* Confirmation Banner */}
      {pendingTransfer && (
        <View style={styles.confirmBanner}>
          <Text style={styles.confirmText}>
            Sign <Text style={{ fontWeight: 'bold' }}>{pendingTransfer.name}</Text> for R{pendingTransfer.price}m?
          </Text>
          <View style={styles.bannerActions}>
            <TouchableOpacity style={styles.confirmBtn} onPress={confirmTransfer}>
              <Text style={styles.actionBtnText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setPendingTransfer(null)}>
              <Text style={styles.actionBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Search and Filters */}
      <View style={styles.filterSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search player or club..."
          placeholderTextColor="#8B949E"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.posRow}>
          {['ALL', 'GK', 'DEF', 'MID', 'FWD'].map((pos) => (
            <TouchableOpacity
              key={pos}
              style={[styles.filterChip, selectedPosFilter === pos && styles.filterChipActive]}
              onPress={() => setSelectedPosFilter(pos)}
            >
              <Text style={[styles.chipText, selectedPosFilter === pos && styles.chipTextActive]}>
                {pos}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Market Player List */}
      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMarketCard}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0E14' },
  header: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#21262D',
  },
  headerBox: { flex: 1, alignItems: 'center' },
  headerLabel: { color: '#8B949E', fontSize: 12 },
  headerVal: { color: '#00FF87', fontSize: 18, fontWeight: 'bold' },

  confirmBanner: {
    backgroundColor: '#1F2A38',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#00FF87',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  confirmText: { color: '#FFF', fontSize: 13, flex: 1 },
  bannerActions: { flexDirection: 'row' },
  confirmBtn: { backgroundColor: '#00FF87', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, marginRight: 6 },
  cancelBtn: { backgroundColor: '#30363D', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  actionBtnText: { color: '#000', fontWeight: 'bold', fontSize: 12 },

  filterSection: { padding: 12, backgroundColor: '#0B0E14' },
  searchInput: {
    backgroundColor: '#161B22',
    color: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#30363D',
    marginBottom: 10,
  },
  posRow: { flexDirection: 'row', justifyContent: 'space-between' },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#30363D',
  },
  filterChipActive: { backgroundColor: '#00FF87', borderColor: '#00FF87' },
  chipText: { color: '#8B949E', fontSize: 12, fontWeight: 'bold' },
  chipTextActive: { color: '#000' },

  listContainer: { padding: 12 },
  card: {
    backgroundColor: '#161B22',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#21262D',
  },
  cardMain: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  posBadge: {
    backgroundColor: '#30363D',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  posText: { color: '#00FF87', fontWeight: 'bold', fontSize: 11 },
  infoCol: { flex: 1 },
  playerName: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  teamName: { color: '#8B949E', fontSize: 12 },
  statsCol: { alignItems: 'flex-end' },
  priceText: { color: '#00FF87', fontSize: 15, fontWeight: 'bold' },
  ptsText: { color: '#8B949E', fontSize: 12 },

  buyBtn: {
    backgroundColor: '#21262D',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#30363D',
  },
  buyBtnText: { color: '#00FF87', fontWeight: 'bold', fontSize: 12 },
});