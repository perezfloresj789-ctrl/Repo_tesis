import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import React, {useState} from 'react';
import { Logo } from '@/components/Logo';

export default function RecuperarScreen(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const {send, setSend} = useState(false);

    const handleRecuperar = () => {
        if (!email){
            Alert.alert('campo requerido', 'por favor ingresa tu correo electronico');
            return;
        }

        console.log('solicitud de recuperacion para', email);
        setSend(true)
    };

    return(
        <SafeAreaView className='flex-1 bg-gradient-to-t from-white to-[#FFF5C3]'>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding': 'height'}
                className='flex-1'
            >
                <ScrollView
                    contentContainerClassName='flex-grow justify-between p-6 md:p-12'
                    bounces={false}
                >
                    <View className='flex-row items-center gap-3'>
                        <Logo size={22} />
                        <View>
                            <Text className='text-base md:text-lg font-bold text-slate-900 leading-tight'>
                                Seguridad
                            </Text>
                            <Text className='text-base md:text-lg font-bold text-slate-900 leading-tight'>
                                Ciudadana
                            </Text>
                        </View>
                    </View>

                    <View className='w-full max-w-sm self-center bg-white/80 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 my-auto'>
                    
                    {!send ? (
                        <>
                         <Text className='text-2xl font-bold text-slate-900 text-center mb-2'>
                            Recuperar Contraseña
                         </Text>

                         <Text className='text-slate-600 text-sm text-center mb-6 leading-relaxed'>
                            Ingresa tu correo electronico registrado y te enviaremos las instrucciones para reestablecer tu cuenta.
                         </Text>

                         <View className='mb-6'>
                            <View className='flex-row items-center bg-white border border-slate-200 rounded-xl px-4 py-3'>
                                <FontAwesome5 name="envelope" size={16} color="#64748b" className="mr-3" />
                                <TextInput
                                    placeholder='correo electronico'
                                    placeholderTextColor="#94a3b8"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType='email-address'
                                    className='flex-1 text-slate-800 text-base p-0'
                                    autoCapitalize='none'
                                />
                            </View>
                         </View>

                         <TouchableOpacity
                            onPress={handleRecuperar}
                            activeOpacity={0.8}
                            className='bg-[#d99b26] py-3.5 rounded-full items-center justify-center mb-6 shadow-sm'
                         >
                            <Text className='text-white font-bold text-base uppercase tracking-wider'>
                                Enviar Instrucciones
                            </Text>
                         </TouchableOpacity>
                        </>
                    ): (
                        <View className='items-center py-4'>
                            <View className='w-16 h-16 bg-amber-100 rounded-full items-center justify-center mb-4 border border-amber-300'>
                                <FontAwesome5 name="paper-plane" size={26} color="#d99b26" />
                            </View>

                            <Text className='text-xl font-bold text-slate-900 text-center mb-2 '>
                                Correo enviado !
                            </Text>

                            <Text className='text-slate-600 text-sm text-center mb-6 leading-relaxed'>
                                Hemos enviado las instrucciones de recuperacion a <Text className='font-semibold text-slate-800'>{email}</Text>. Por favor revisa tu bandeja de entrada o spam.
                            </Text>

                            <TouchableOpacity
                                onPress={()=>setSend(false)}
                                className='mb-4'
                            >
                                <Text className='text-slate-500 text-xs font-semibold underline'>
                                    Reintentar con otro correo
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <View className='items-center border-t border-slate-200/60 pt-4'>
                        <TouchableOpacity onPress={()=>router.push('/login' as any)}>
                            <Text className='text-slate-600 text-sm font-medium'>
                                Recordaste tu contraseña? <Text className='text-[#d99b26] font-semibold'>Inicia Sesion</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}