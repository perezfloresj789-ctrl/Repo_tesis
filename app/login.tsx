import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import '../global.css'
import { Logo } from '@/components/Logo';
import React, { useState } from 'react';
import { loginUser } from '@/services/authService';
import { LinearGradient } from 'expo-linear-gradient';

export default  function LoginScreen(){
    const router  = useRouter();
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => { 
  if (!usuario.trim() || !contrasena.trim()) {
    Alert.alert('Campos incompletos', 'Por favor ingresa tu usuario y contraseña.');
    return;
  }

  try {
    setLoading(true);
    await loginUser(usuario.trim(), contrasena);
    router.replace('/(tabs)');
  } catch (error: any) {
    Alert.alert('Error de inicio de sesión', error.message || 'Credenciales inválidas.');
  } finally {
    setLoading(false);
  }
};
    return(

      <LinearGradient
         colors={['#FFF5C3', '#FFFFFF']} 
        style={{ flex: 1 }}
      >
          <SafeAreaView className='flex-1 bg-gradient-to-t from-white to-[#FFF5C3]'>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              className="flex-1"
            >
              <ScrollView
                contentContainerClassName="flex-grow justify-between p-6 md:-12"
                bounces={false}
               >
                 <View className="flex-row items-center gap-3">
                   <Logo size={22} />
                   <View>
                     <Text className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                       Seguridad
                     </Text>
                     <Text className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                       Ciudadana
                     </Text>
                   </View>
                 </View>

                  <View className="w-full max-w-sm self-center bg-white/80 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 my-auto">
                   <Text className="text-2xl font-bold text-slate-900 text-center mb-6">
                     Bienvenido
                   </Text>

                 <View className="mb-4">
                  <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-4 py-3">
                   <FontAwesome5 name="user" size={16} color="#64748b" className="mr-3" />
                   <TextInput
                     placeholder="Usuario o correo electronico"
                     placeholderTextColor="#94a3b8"
                     value={usuario}
                     onChangeText={setUsuario}
                     className="flex-1 text-slate-800 text-base p-0"
                     autoCapitalize="none"
                     autoCorrect={false}
                     keyboardType='email-address'
                   />
                 </View>
                </View>
               

                  <View className="mb-6">
                   <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-4 py-3">
                   <FontAwesome5 name="lock" size={16} color="#64748b" className="mr-3" />
                   <TextInput
                     placeholder="Contraseña"
                     placeholderTextColor="#94a3b8"
                     secureTextEntry
                     value={contrasena}
                     onChangeText={setContrasena}
                     className="flex-1 text-slate-800 text-base p-0"
                   />
                   </View>
                    <TouchableOpacity onPress={() => router.push('/recuperar' as any)}>
                   <Text className="text-[#d99b26] text-sm font-semibold text-right">
                      olvidaste tu contra?
                   </Text>
                  </TouchableOpacity>
                  </View>

                  

                  <TouchableOpacity
                   onPress={handleLogin}
                   activeOpacity={0.8}
                   className={`py-3.5 rounded-full items-center justify-center mb-6 shadow-sm ${
                    loading ? 'bg-[#d99b26]/60' : 'bg-[#d99b26]'
                   }`}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff"/>
                  ): (
                   <Text className="text-white font-bold text-base uppercase tracking-wider">
                     Login
                  </Text>
                  )}
                  
                  </TouchableOpacity>

                  <View className="items-center gap-2">
                
                   <TouchableOpacity onPress={() => router.push('/registro' as any)}>
                   <Text className="text-[#d99b26] text-sm font-semibold">
                      ¿No tienes Cuenta? Regístrate
                   </Text>
                  </TouchableOpacity>
                  </View>
                </View>
            
                 

              </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
        
      </LinearGradient>
      
    )
}
