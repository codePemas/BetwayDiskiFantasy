import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { loginUser, registerUser, AuthResponseDto } from '../services/api';

interface AuthScreenProps {
  onLoginSuccess: (userData: AuthResponseDto) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [isRegistering, setIsRegistering] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [teamName, setTeamName] = useState('');

  const handleSubmit = async () => {
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        if (!username || !teamName) {
          setErrorMessage('Username and Team Name are required.');
          setLoading(false);
          return;
        }
        const response = await registerUser({ username, email, password, teamName });
        onLoginSuccess(response);
      } else {
        const response = await loginUser({ email, password });
        onLoginSuccess(response);
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Authentication failed. Check server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>
          {isRegistering ? 'Create Fantasy Account' : 'Welcome Back'}
        </Text>
        <Text style={styles.subtitle}>Betway Diski Fantasy</Text>

        {errorMessage && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {isRegistering && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#8B949E"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Fantasy Team Name"
              placeholderTextColor="#8B949E"
              value={teamName}
              onChangeText={setTeamName}
            />
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#8B949E"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#8B949E"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0B0E14" />
          ) : (
            <Text style={styles.submitBtnText}>
              {isRegistering ? 'Register & Enter' : 'Log In'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchModeBtn}
          onPress={() => {
            setErrorMessage(null);
            setIsRegistering(!isRegistering);
          }}
        >
          <Text style={styles.switchModeText}>
            {isRegistering
              ? 'Already have an account? Log In'
              : "Don't have an account? Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0E14',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#161B22',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#21262D',
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#00FF87',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: '#FF4D4D22',
    borderWidth: 1,
    borderColor: '#FF4D4D',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#0B0E14',
    borderWidth: 1,
    borderColor: '#21262D',
    borderRadius: 8,
    color: '#FFF',
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: '#00FF87',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: '#0B0E14',
    fontSize: 15,
    fontWeight: 'bold',
  },
  switchModeBtn: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchModeText: {
    color: '#8B949E',
    fontSize: 12,
  },
});