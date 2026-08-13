import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.5:4000';


export async function apiFetch<T>(
    endpoint: string,
    option: RequestInit ={}
): Promise<T> {
    const token = await SecureStore.getItemAsync('access_token');

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}`}: {}),
        ...option.headers,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...option,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.message || data.error || `Error ${response.status} en el servidor`;
            throw new Error(errorMessage);
        }

        return data as T;
    } catch (error: any) {
        if (error.message === 'Network request failed') {
            throw new Error(`No se pudo conectar con el servidor en ${API_BASE_URL}. Revisa que el backend esté ejecutándose.`);
        }
        throw error;
    }
}