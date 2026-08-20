import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PitchScreen from '../screens/PitchScreen';
import TransfersScreen from '../screens/TransfersScreen';
import FixturesScreen from '../screens/FixturesScreens';
import LeaguesScreen from '../screens/LeaguesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#161B22',
          borderTopColor: '#21262D',
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        tabBarActiveTintColor: '#00FF87',
        tabBarInactiveTintColor: '#8B949E',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen name="Pitch" component={PitchScreen} />
      <Tab.Screen name="Transfers" component={TransfersScreen} />
      <Tab.Screen name="Fixtures" component={FixturesScreen} />
      <Tab.Screen name="Leagues" component={LeaguesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}