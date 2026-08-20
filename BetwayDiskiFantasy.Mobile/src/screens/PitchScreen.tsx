import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { fetchPlayers, PlayerDto } from '../services/api';

export default function PitchScreen() {
  const [players, setPlayers] = useState<PlayerDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDto | null>(null);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      const data = await fetchPlayers();
      setPlayers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FF87" />
      </View>
    );
  }

  // Enforce Starting XI vs Bench directly from data properties or slice limits
  const pitchPlayers = players.filter((p) => !p.isBench);
  const benchPlayers = players.filter((p) => p.isBench);

  // Formation limits (4-4-2)
  const goalkeepers = pitchPlayers.filter((p) => p.position === 'GK').slice(0, 1);
  const defenders = pitchPlayers.filter((p) => p.position === 'DEF').slice(0, 4);
  const midfielders = pitchPlayers.filter((p) => p.position === 'MID').slice(0, 4);
  const forwards = pitchPlayers.filter((p) => p.position === 'FWD').slice(0, 2);

  // Aggregate any overflow or explicit bench players onto the bench
  const activePitchIds = new Set([
    ...goalkeepers.map((p) => p.id),
    ...defenders.map((p) => p.id),
    ...midfielders.map((p) => p.id),
    ...forwards.map((p) => p.id),
  ]);

  const activePitchList = players.filter((p) => activePitchIds.has(p.id));
  const activeBenchList = players.filter((p) => !activePitchIds.has(p.id));

  const totalPoints = activePitchList.reduce((sum, p) => sum + p.totalPoints, 0);

  const handlePlayerPress = (player: PlayerDto) => {
    if (!selectedPlayer) {
      setSelectedPlayer(player);
    } else if (selectedPlayer.id === player.id) {
      setSelectedPlayer(null);
    } else {
      // Swap isBench status between selected player and target player
      const updated = players.map((p) => {
        if (p.id === selectedPlayer.id) return { ...p, isBench: !selectedPlayer.isBench };
        if (p.id === player.id) return { ...p, isBench: !player.isBench };
        return p;
      });
      setPlayers(updated);
      setSelectedPlayer(null);
    }
  };

  const renderPlayerCard = (player: PlayerDto) => {
    const isSelected = selectedPlayer?.id === player.id;
    return (
      <TouchableOpacity
        key={player.id}
        style={[styles.playerCard, isSelected && styles.selectedPlayerCard]}
        onPress={() => handlePlayerPress(player)}
      >
        <Text style={styles.posBadge}>{player.position}</Text>
        <Text style={styles.playerName} numberOfLines={1}>
          {player.webName || player.name}
        </Text>
        <Text style={styles.playerPts}>{player.totalPoints} pts</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Active Lineup</Text>
          <Text style={styles.headerTitle}>Gameweek Pitch</Text>
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsLabel}>Total Pitch GW Points</Text>
          <Text style={styles.pointsValue}>{totalPoints} pts</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.pitchWrapper}>
          <View style={styles.pitch}>
            {/* Field Markings */}
            <View style={styles.halfwayLine} />
            <View style={styles.centerCircle} />
            <View style={styles.penaltyAreaTop} />
            <View style={styles.penaltyAreaBottom} />

            {/* Tactical Rows (4-4-2) */}
            <View style={styles.pitchRow}>{forwards.map(renderPlayerCard)}</View>
            <View style={styles.pitchRow}>{midfielders.map(renderPlayerCard)}</View>
            <View style={styles.pitchRow}>{defenders.map(renderPlayerCard)}</View>
            <View style={styles.pitchRow}>{goalkeepers.map(renderPlayerCard)}</View>
          </View>

          {/* Bench Section */}
          <View style={styles.benchContainer}>
            <Text style={styles.benchTitle}>
              BENCH {selectedPlayer ? '(Tap bench player to swap)' : ''}
            </Text>
            <View style={styles.benchRow}>
              {activeBenchList.length > 0 ? (
                activeBenchList.map(renderPlayerCard)
              ) : (
                <Text style={styles.emptyBenchText}>No bench players assigned</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0E14',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0B0E14',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#161B22',
    borderBottomWidth: 1,
    borderBottomColor: '#21262D',
  },
  headerSubtitle: {
    color: '#8B949E',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointsBadge: {
    alignItems: 'flex-end',
  },
  pointsLabel: {
    color: '#8B949E',
    fontSize: 10,
  },
  pointsValue: {
    color: '#00FF87',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
    alignItems: 'center',
  },
  pitchWrapper: {
    width: '100%',
    maxWidth: 480,
  },
  pitch: {
    backgroundColor: '#11291B',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1E4A30',
    paddingVertical: 24,
    paddingHorizontal: 12,
    height: 520,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  halfwayLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#1E4A30',
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#1E4A30',
    transform: [{ translateX: -45 }, { translateY: -45 }],
  },
  penaltyAreaTop: {
    position: 'absolute',
    top: 0,
    left: '25%',
    right: '25%',
    height: 70,
    borderWidth: 2,
    borderColor: '#1E4A30',
    borderTopWidth: 0,
  },
  penaltyAreaBottom: {
    position: 'absolute',
    bottom: 0,
    left: '25%',
    right: '25%',
    height: 70,
    borderWidth: 2,
    borderColor: '#1E4A30',
    borderBottomWidth: 0,
  },
  pitchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  playerCard: {
    backgroundColor: '#161B22',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    width: 88,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#21262D',
  },
  selectedPlayerCard: {
    borderColor: '#00FF87',
    backgroundColor: '#1E2A22',
  },
  posBadge: {
    color: '#00FF87',
    fontSize: 9,
    fontWeight: 'bold',
  },
  playerName: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  playerPts: {
    color: '#00FF87',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 2,
  },
  benchContainer: {
    marginTop: 16,
    backgroundColor: '#161B22',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#21262D',
  },
  benchTitle: {
    color: '#8B949E',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  benchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  emptyBenchText: {
    color: '#8B949E',
    fontSize: 12,
    fontStyle: 'italic',
  },
});