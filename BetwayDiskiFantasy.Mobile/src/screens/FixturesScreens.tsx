import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { fetchFixtures, FixtureDto } from '../services/api';

const FALLBACK_FIXTURES: FixtureDto[] = [
  {
    id: 1,
    homeTeam: 'Mamelodi Sundowns',
    awayTeam: 'Orlando Pirates',
    homeScore: 2,
    awayScore: 1,
    isFinished: false,
    gameweek: 1,
    kickOffTime: '15:30',
  },
  {
    id: 2,
    homeTeam: 'Kaizer Chiefs',
    awayTeam: 'Stellenbosch FC',
    homeScore: 1,
    awayScore: 0,
    isFinished: true,
    gameweek: 1,
    kickOffTime: '18:00',
  },
];

export default function FixturesScreens() {
  const [selectedGameweek, setSelectedGameweek] = useState<number>(1);
  const [fixtures, setFixtures] = useState<FixtureDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadFixtures();
  }, []);

  const loadFixtures = async () => {
    setLoading(true);
    try {
      const data = await fetchFixtures();
      setFixtures(data);
    } catch (error) {
      console.warn('Falling back to local fixture mock data.');
      setFixtures(FALLBACK_FIXTURES);
    } finally {
      setLoading(false);
    }
  };

  const renderFixtureCard = ({ item }: { item: FixtureDto }) => {
    const isFinished = item.isFinished;
    const hasScores = item.homeScore !== undefined && item.awayScore !== undefined;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.venueText}>GW {item.gameweek}</Text>
          <Text style={styles.statusText}>
            {isFinished ? 'Full Time' : new Date(item.kickOffTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>

        <View style={styles.matchRow}>
          <View style={styles.teamBox}>
            <Text style={styles.teamName} numberOfLines={1}>{item.homeTeam}</Text>
          </View>

          <View style={styles.scoreBox}>
            {hasScores ? (
              <Text style={styles.scoreText}>
                {item.homeScore} - {item.awayScore}
              </Text>
            ) : (
              <Text style={styles.vsText}>VS</Text>
            )}
          </View>

          <View style={[styles.teamBox, { alignItems: 'flex-end' }]}>
            <Text style={styles.teamName} numberOfLines={1}>{item.awayTeam}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gwHeader}>
        <TouchableOpacity
          style={styles.gwNavBtn}
          onPress={() => setSelectedGameweek((prev) => Math.max(1, prev - 1))}
        >
          <Text style={styles.gwNavText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.gwTitle}>Gameweek {selectedGameweek}</Text>
        <TouchableOpacity
          style={styles.gwNavBtn}
          onPress={() => setSelectedGameweek((prev) => prev + 1)}
        >
          <Text style={styles.gwNavText}>›</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#00FF87" />
        </View>
      ) : (
        <FlatList
          data={fixtures}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFixtureCard}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0E14' },
  gwHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#161B22',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#21262D',
  },
  gwTitle: { color: '#00FF87', fontSize: 16, fontWeight: 'bold' },
  gwNavBtn: { paddingHorizontal: 12, paddingVertical: 4 },
  gwNavText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },

  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: { padding: 12 },
  card: {
    backgroundColor: '#161B22',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#21262D',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  venueText: { color: '#8B949E', fontSize: 11 },
  statusText: { color: '#8B949E', fontSize: 11, fontWeight: 'bold' },

  matchRow: { flexDirection: 'row', alignItems: 'center' },
  teamBox: { flex: 1 },
  teamName: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  scoreBox: { paddingHorizontal: 12, alignItems: 'center' },
  vsText: { color: '#8B949E', fontSize: 13, fontWeight: 'bold' },
  scoreText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});