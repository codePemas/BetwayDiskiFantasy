import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

interface Chip {
  id: string;
  name: string;
  description: string;
  isUsed: boolean;
  usedInGameweek?: number;
}

interface GameweekHistory {
  gameweek: number;
  points: number;
  rank: number;
}

export default function ProfileScreen() {
  const [managerName] = useState<string>('Liyema S.');
  const [teamName] = useState<string>('Diski Wizards');
  const [favouriteClub] = useState<string>('Arsenal FC');
  const [overallRank] = useState<number>(1420);
  const [totalPoints] = useState<number>(512);

  const [chips, setChips] = useState<Chip[]>([
    { id: 'wc1', name: 'Wildcard', description: 'Unlimited free transfers for a Gameweek', isUsed: false },
    { id: 'tc', name: 'Triple Captain', description: 'Captain points are tripled instead of doubled', isUsed: true, usedInGameweek: 3 },
    { id: 'bb', name: 'Bench Boost', description: 'Points scored by bench players are included', isUsed: false },
    { id: 'fh', name: 'Free Hit', description: 'Make unlimited temporary transfers for one Gameweek', isUsed: false },
  ]);

  const history: GameweekHistory[] = [
    { gameweek: 1, points: 64, rank: 2100 },
    { gameweek: 2, points: 58, rank: 1850 },
    { gameweek: 3, points: 82, rank: 1200 },
    { gameweek: 4, points: 49, rank: 1510 },
    { gameweek: 5, points: 71, rank: 1380 },
    { gameweek: 6, points: 59, rank: 1420 },
  ];

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handlePlayChip = (chip: Chip) => {
    if (chip.isUsed) {
      showAlert('Chip Used', `You already played ${chip.name} in Gameweek ${chip.usedInGameweek}.`);
      return;
    }

    setChips((prev) =>
      prev.map((c) => (c.id === chip.id ? { ...c, isUsed: true, usedInGameweek: 7 } : c))
    );
    showAlert('Chip Activated', `${chip.name} is now active for Gameweek 7!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Manager Header Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{managerName.charAt(0)}</Text>
          </View>
          <Text style={styles.teamTitle}>{teamName}</Text>
          <Text style={styles.managerSub}>{managerName} • {favouriteClub}</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Points</Text>
              <Text style={styles.statVal}>{totalPoints}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Overall Rank</Text>
              <Text style={styles.statVal}>#{overallRank.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Chips Section */}
        <Text style={styles.sectionHeader}>Available Chips</Text>
        <View style={styles.chipsGrid}>
          {chips.map((chip) => (
            <View key={chip.id} style={[styles.chipCard, chip.isUsed && styles.chipCardDisabled]}>
              <View style={styles.chipHeader}>
                <Text style={styles.chipName}>{chip.name}</Text>
                <Text style={[styles.chipStatus, chip.isUsed ? styles.statusUsed : styles.statusAvail]}>
                  {chip.isUsed ? `Used (GW${chip.usedInGameweek})` : 'Available'}
                </Text>
              </View>
              <Text style={styles.chipDesc}>{chip.description}</Text>
              <TouchableOpacity
                style={[styles.chipBtn, chip.isUsed && styles.chipBtnDisabled]}
                disabled={chip.isUsed}
                onPress={() => handlePlayChip(chip)}
              >
                <Text style={[styles.chipBtnText, chip.isUsed && styles.chipBtnTextDisabled]}>
                  {chip.isUsed ? 'Played' : 'Play Chip'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Gameweek History */}
        <Text style={styles.sectionHeader}>Gameweek History</Text>
        <View style={styles.historyBox}>
          <View style={styles.historyHeaderRow}>
            <Text style={[styles.historyCol, styles.colGw]}>GW</Text>
            <Text style={[styles.historyCol, styles.colPts]}>Points</Text>
            <Text style={[styles.historyCol, styles.colRank]}>Rank</Text>
          </View>
          {history.map((item) => (
            <View key={item.gameweek} style={styles.historyRow}>
              <Text style={[styles.historyVal, styles.colGw]}>GW{item.gameweek}</Text>
              <Text style={[styles.historyVal, styles.colPts, { color: '#00FF87' }]}>{item.points} pts</Text>
              <Text style={[styles.historyVal, styles.colRank]}>#{item.rank}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0E14' },
  scrollContent: { padding: 14 },

  profileCard: {
    backgroundColor: '#161B22',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#21262D',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00FF87',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: { color: '#000', fontSize: 24, fontWeight: 'bold' },
  teamTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  managerSub: { color: '#8B949E', fontSize: 13, marginTop: 2, marginBottom: 16 },

  statsGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#21262D',
    paddingTop: 12,
    width: '100%',
  },
  statBox: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: '#21262D' },
  statLabel: { color: '#8B949E', fontSize: 11 },
  statVal: { color: '#00FF87', fontSize: 18, fontWeight: 'bold', marginTop: 2 },

  sectionHeader: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },

  chipsGrid: { marginBottom: 16 },
  chipCard: {
    backgroundColor: '#161B22',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#21262D',
  },
  chipCardDisabled: { opacity: 0.6 },
  chipHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chipName: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  chipStatus: { fontSize: 11, fontWeight: 'bold' },
  statusAvail: { color: '#00FF87' },
  statusUsed: { color: '#8B949E' },
  chipDesc: { color: '#8B949E', fontSize: 12, marginVertical: 6 },
  chipBtn: {
    backgroundColor: '#00FF87',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  chipBtnDisabled: { backgroundColor: '#21262D' },
  chipBtnText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  chipBtnTextDisabled: { color: '#8B949E' },

  historyBox: {
    backgroundColor: '#161B22',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#21262D',
  },
  historyHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#21262D',
    paddingBottom: 8,
    marginBottom: 8,
  },
  historyRow: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  historyCol: { color: '#8B949E', fontSize: 11, fontWeight: 'bold' },
  historyVal: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
  colGw: { width: 60 },
  colPts: { flex: 1 },
  colRank: { width: 80, textAlign: 'right' },
});