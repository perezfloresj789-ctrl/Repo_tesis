import * as SecureStore from 'expo-secure-store';
import { apiFetch } from './api';

interface LoginResponse {
    access_token: string;
    token_type: string;
}

interface RegisterResponse { 
    message: string;
    user: { 
        id: number;
        email: string;
        createdAt: string;
    };
}
export async function loginUser(email:string, password: string): Promise<LoginResponse>{
    const data = await apiFetch<LoginResponse>('/auth/login',{
        method:'POST',
        body: JSON.stringify({email, password}),
    });
    if (data.access_token){
        await SecureStore.setItemAsync('access_token', data.access_token);
    }
    return data;
}

export async function registerUser(username: string, email:string, password: string):Promise<RegisterResponse>{
    return apiFetch<RegisterResponse>('/auth/register',{
        method: 'POST',
        body: JSON.stringify({user: username, email, password})
    });
}

export async function logoutUser(): Promise<void> {
    await SecureStore.deleteItemAsync('access_token');
}

export async function isAuthenticated(): Promise<boolean>{
    const token = await SecureStore.getItemAsync('access_token');
    return !!token;
}