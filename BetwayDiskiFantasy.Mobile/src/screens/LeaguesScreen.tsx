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

interface League {
  id: number;
  name: string;
  code: string;
  rank: number;
  totalMembers: number;
  type: 'Global' | 'Private';
}

interface LeaderboardUser {
  rank: number;
  teamName: string;
  managerName: string;
  gwPoints: number;
  totalPoints: number;
}

const INITIAL_LEAGUES: League[] = [
  { id: 1, name: 'Betway Premiership Global', code: 'GLOBAL01', rank: 1420, totalMembers: 45200, type: 'Global' },
  { id: 2, name: 'East London Champions League', code: 'EL-2026', rank: 3, totalMembers: 12, type: 'Private' },
  { id: 3, name: 'Kasi Bragging Rights', code: 'KASI-99', rank: 1, totalMembers: 8, type: 'Private' },
];

const LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, teamName: 'Mamelodi Masters', managerName: 'Sipho N.', gwPoints: 72, totalPoints: 540 },
  { rank: 2, teamName: 'Khosi Nation FC', managerName: 'Lethabo K.', gwPoints: 68, totalPoints: 528 },
  { rank: 3, teamName: 'Diski Wizards', managerName: 'Liyema S.', gwPoints: 59, totalPoints: 512 },
  { rank: 4, teamName: 'Buccaneers XI', managerName: 'Jabu M.', gwPoints: 61, totalPoints: 495 },
  { rank: 5, teamName: 'Stellies Surge', managerName: 'Anele Z.', gwPoints: 54, totalPoints: 480 },
];

export default function LeaguesScreen() {
  const [leagues, setLeagues] = useState<League[]>(INITIAL_LEAGUES);
  const [activeTab, setActiveTab] = useState<'myLeagues' | 'leaderboard'>('myLeagues');
  const [joinCode, setJoinCode] = useState<string>('');
  const [newLeagueName, setNewLeagueName] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleJoinLeague = () => {
    if (!joinCode.trim()) {
      showAlert('Error', 'Please enter a valid league code.');
      return;
    }

    const newLeague: League = {
      id: Date.now(),
      name: `League (${joinCode.toUpperCase()})`,
      code: joinCode.toUpperCase(),
      rank: 1,
      totalMembers: 15,
      type: 'Private',
    };

    setLeagues((prev) => [...prev, newLeague]);
    setJoinCode('');
    showAlert('Joined League', `Successfully joined mini-league: ${newLeague.code}`);
  };

  const handleCreateLeague = () => {
    if (!newLeagueName.trim()) {
      showAlert('Error', 'Please enter a league name.');
      return;
    }

    const generatedCode = 'BW-' + Math.floor(1000 + Math.random() * 9000);
    const createdLeague: League = {
      id: Date.now(),
      name: newLeagueName,
      code: generatedCode,
      rank: 1,
      totalMembers: 1,
      type: 'Private',
    };

    setLeagues((prev) => [...prev, createdLeague]);
    setNewLeagueName('');
    setShowCreateModal(false);
    showAlert('League Created', `Share Code: ${generatedCode} with your friends!`);
  };

  const renderLeagueCard = ({ item }: { item: League }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
        <Text style={styles.codeText}>Code: {item.code}</Text>
      </View>

      <Text style={styles.leagueName}>{item.name}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Your Rank</Text>
          <Text style={styles.statVal}>#{item.rank}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Managers</Text>
          <Text style={styles.statVal}>{item.totalMembers.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );

  const renderLeaderboardRow = ({ item }: { item: LeaderboardUser }) => (
    <View style={[styles.lbRow, item.rank === 3 && styles.lbRowHighlight]}>
      <Text style={styles.lbRank}>#{item.rank}</Text>
      <View style={styles.lbInfo}>
        <Text style={styles.lbTeam}>{item.teamName}</Text>
        <Text style={styles.lbManager}>{item.managerName}</Text>
      </View>
      <View style={styles.lbPtsCol}>
        <Text style={styles.lbGwPts}>+{item.gwPoints} pts</Text>
        <Text style={styles.lbTotalPts}>{item.totalPoints} total</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Tab Selector */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'myLeagues' && styles.tabItemActive]}
          onPress={() => setActiveTab('myLeagues')}
        >
          <Text style={[styles.tabText, activeTab === 'myLeagues' && styles.tabTextActive]}>My Leagues</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'leaderboard' && styles.tabItemActive]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.tabTextActive]}>Leaderboard</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'myLeagues' ? (
        <View style={styles.content}>
          {/* Join / Create Action Section */}
          <View style={styles.actionSection}>
            <View style={styles.joinBox}>
              <TextInput
                style={styles.codeInput}
                placeholder="Enter League Code..."
                placeholderTextColor="#8B949E"
                value={joinCode}
                onChangeText={setJoinCode}
                autoCapitalize="characters"
              />
              <TouchableOpacity style={styles.joinBtn} onPress={handleJoinLeague}>
                <Text style={styles.btnText}>Join</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.createToggleBtn} onPress={() => setShowCreateModal(!showCreateModal)}>
              <Text style={styles.createToggleText}>{showCreateModal ? 'Cancel' : '+ Create Private League'}</Text>
            </TouchableOpacity>

            {showCreateModal && (
              <View style={styles.createBox}>
                <TextInput
                  style={styles.codeInput}
                  placeholder="New League Name (e.g. EL Kings)"
                  placeholderTextColor="#8B949E"
                  value={newLeagueName}
                  onChangeText={setNewLeagueName}
                />
                <TouchableOpacity style={styles.createSubmitBtn} onPress={handleCreateLeague}>
                  <Text style={styles.btnText}>Create & Get Code</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Joined Leagues List */}
          <FlatList
            data={leagues}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderLeagueCard}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <FlatList
            data={LEADERBOARD}
            keyExtractor={(item) => item.rank.toString()}
            renderItem={renderLeaderboardRow}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0E14' },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    borderBottomWidth: 1,
    borderBottomColor: '#21262D',
  },
  tabItem: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabItemActive: { borderBottomWidth: 2, borderBottomColor: '#00FF87' },
  tabText: { color: '#8B949E', fontSize: 14, fontWeight: 'bold' },
  tabTextActive: { color: '#00FF87' },

  content: { flex: 1 },
  actionSection: { padding: 12, backgroundColor: '#161B22', borderBottomWidth: 1, borderBottomColor: '#21262D' },
  joinBox: { flexDirection: 'row', marginBottom: 8 },
  codeInput: {
    flex: 1,
    backgroundColor: '#0B0E14',
    color: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#30363D',
    marginRight: 8,
  },
  joinBtn: { backgroundColor: '#00FF87', paddingHorizontal: 16, justifyContent: 'center', borderRadius: 6 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 12 },

  createToggleBtn: { alignItems: 'center', paddingVertical: 6 },
  createToggleText: { color: '#00FF87', fontSize: 12, fontWeight: 'bold' },

  createBox: { marginTop: 8 },
  createSubmitBtn: { backgroundColor: '#00FF87', paddingVertical: 10, alignItems: 'center', borderRadius: 6, marginTop: 8 },

  listContainer: { padding: 12 },
  card: {
    backgroundColor: '#161B22',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#21262D',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  typeBadge: { backgroundColor: '#30363D', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  typeText: { color: '#00FF87', fontSize: 10, fontWeight: 'bold' },
  codeText: { color: '#8B949E', fontSize: 11 },
  leagueName: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },

  cardFooter: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#21262D', paddingTop: 8 },
  statBox: { flex: 1 },
  statLabel: { color: '#8B949E', fontSize: 11 },
  statVal: { color: '#00FF87', fontSize: 15, fontWeight: 'bold' },

  lbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161B22',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#21262D',
  },
  lbRowHighlight: { borderColor: '#00FF87', backgroundColor: '#1A2E26' },
  lbRank: { color: '#00FF87', fontSize: 16, fontWeight: 'bold', width: 36 },
  lbInfo: { flex: 1 },
  lbTeam: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  lbManager: { color: '#8B949E', fontSize: 11 },
  lbPtsCol: { alignItems: 'flex-end' },
  lbGwPts: { color: '#00FF87', fontSize: 13, fontWeight: 'bold' },
  lbTotalPts: { color: '#8B949E', fontSize: 11 },
});