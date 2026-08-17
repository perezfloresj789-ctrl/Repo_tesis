import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import '../global.css'
import { Logo } from '@/components/Logo';
import React, { useState } from 'react';

export default function LoginScreen(){
    const router  = useRouter();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    //Funcion para mostrar password
    const [showPassword, setPasswordVisibility] = useState(false);

    const handleLogin = () => {
    // Lógica de autenticación de usuario
    console.log('Iniciar sesión:', user);
    };

    return(
        <SafeAreaView className='flex-1 bg-gradient-to-t from-white to-[#FFF5C3]'>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              className="flex-1"
            >
              <ScrollView
                contentContainerClassName="flex-grow justify-between p-6 md:-12"
                bounces={false}
               >
                {/* Contenedor del Encabezado*/}
                <View className="relative w-full flex-row items-center justify-between mt-2 mb-8">
                  {/* Logo*/}
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

                {/* Flwcha de regreso */}
                  <TouchableOpacity 
                    onPress={() => router.back()}
                    className="absolute top-0 right-0 z-10 p-2"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Amplía el área táctil para facilitar el toque
                  >
                    <FontAwesome5 name="arrow-left" size={20} color="#64748b" />
                  </TouchableOpacity>

                </View>

                {/* Contenedor Principal */}
                  <View className="w-full max-w-sm self-center bg-white/80 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 my-auto">
                   <Text className="text-2xl font-bold text-slate-900 text-center mb-6">
                     Bienvenido
                   </Text>

                 {/* Campo Usuario */}
                 <View className="mb-4">
                  <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-4 py-3">
                   <FontAwesome5 name="user" size={16} color="#64748b" className="mr-3" />
                   <TextInput
                     placeholder="Usuario"
                     placeholderTextColor="#94a3b8"
                     value={user}
                     onChangeText={setUser}
                     className="flex-1 text-slate-800 text-base p-0"
                     autoCapitalize="none"
                   />
                 </View>
                </View>

                 {/* Campo Contraseña */}
                  <View className="mb-6">
                   <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-4 py-3">
                   <FontAwesome5 name="lock" size={16} color="#64748b" className="mr-3" />
                   <TextInput
                     placeholder="Contraseña"
                     placeholderTextColor="#94a3b8"
                     secureTextEntry={!showPassword}
                     value={password}
                     onChangeText={setPassword}
                     className="flex-1 text-slate-800 text-base p-0"
                   />
                    {/*icono del Ojo*/}
                      <TouchableOpacity 
                        onPress={() => setPasswordVisibility(!showPassword)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                      <FontAwesome5 
                        name={showPassword ? "eye-slash" : "eye"} 
                        size={16} 
                        color="#64748b" 
                      />
                      </TouchableOpacity>
                   </View>
                  </View>

                 {/* Botón Login */}
                  <TouchableOpacity
                   onPress={handleLogin}
                   activeOpacity={0.8}
                   className="bg-[#d99b26] py-3.5 rounded-full items-center justify-center mb-6 shadow-sm"
                >
                  <Text className="text-white font-bold text-base uppercase tracking-wider">
                     Login
                  </Text>
                  </TouchableOpacity>

                 {/* Enlaces de recuperación y registro */}
                  <View className="items-center gap-2">
                   <TouchableOpacity onPress={() => router.push('/recuperar' as any)}>
                   <Text className="text-slate-600 text-sm font-medium">
                      ¿Perdiste tu contraseña?
                   </Text>
                   </TouchableOpacity>

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
        
    )
}
