import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ||
(Platform.OS === 'android'? 'http://10.0.2.2:4000' : 'http://localhost:4000');

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

    const response = await fetch(`${API_BASE_URL}${endpoint}`,{
        ...option,
        headers,
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error || 'ocurrio un error en la peticion');
    }
    return data as T;
}