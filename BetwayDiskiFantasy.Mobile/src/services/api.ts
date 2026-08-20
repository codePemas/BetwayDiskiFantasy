import { Platform } from 'react-native';

const API_PORT = '5087'; // Match your 'dotnet run' HTTP port

// REPLACE THIS WITH YOUR PC'S IP ADDRESS FROM 'ipconfig' IN POWERSHELL
const LOCAL_PC_IP = '192.168.78.145'; 

const getBaseUrl = () => {
  if (Platform.OS === 'web') {
    return `http://localhost:${API_PORT}/api`;
  }
  // Handles iOS (iPhone 12) & physical devices over local Wi-Fi
  return `http://${LOCAL_PC_IP}:${API_PORT}/api`;
};

const BASE_URL = getBaseUrl();

export interface PlayerDto {
  id: number;
  name: string;
  webName: string;
  position: string;
  teamName: string;
  price: number;
  totalPoints: number;
  isBench?: boolean;
  imageUrl?: string;
}

export interface FixtureDto {
  id: number;
  homeTeam: string;
  awayTeam: string;
  kickOffTime: string;
  gameweek: number;
  homeScore?: number;
  awayScore?: number;
  isFinished: boolean;
}

export interface AuthResponseDto {
  token: string;
  email: string;
  username: string;
  teamName: string;
}

const fetchWithTimeout = async (url: string, options: RequestInit, timeoutMs = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Connection timed out reaching API at ${BASE_URL}. Ensure 'dotnet run' is active.`);
    }
    throw new Error('Unable to connect to API server.');
  }
};

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
  teamName: string;
}): Promise<AuthResponseDto> => {
  const response = await fetchWithTimeout(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || 'Registration failed');
  }

  return await response.json();
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponseDto> => {
  const response = await fetchWithTimeout(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || 'Login failed');
  }

  return await response.json();
};

export const fetchPlayers = async (): Promise<PlayerDto[]> => {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/players`, { method: 'GET' });
    if (!response.ok) throw new Error('Error fetching players');
    return await response.json();
  } catch (error) {
    console.error('fetchPlayers error:', error);
    throw error;
  }
};

export const fetchSquad = async (userId: number = 1): Promise<PlayerDto[]> => {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/squads/${userId}`, { method: 'GET' });
    if (!response.ok) throw new Error('Error fetching squad');
    return await response.json();
  } catch (error) {
    console.error('fetchSquad error:', error);
    throw error;
  }
};

export const fetchFixtures = async (): Promise<FixtureDto[]> => {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/fixtures`, { method: 'GET' });
    if (!response.ok) throw new Error('Error fetching fixtures');
    return await response.json();
  } catch (error) {
    console.error('fetchFixtures error:', error);
    throw error;
  }
};