import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import React, {useState} from "react";
import { Logo } from "@/components/Logo";
import { View,ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { registerUser } from "@/services/authService";

export default function RegisterScreen(){
    const router = useRouter();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

   const handleRegister = async (e?: any) => {
    if(e?.preventDefault){
        e.preventDefault();
    }
    console.log("--> 1. Inicio de handleRegister");
  console.log("Valores actualizados:", { user, email, password, confirmPassword });

    if (!user || !email || !password || !confirmPassword) {
        Alert.alert('Campos incompletos', 'Por favor llena todos los campos para continuar.');
        console.log('Campos incompletos', 'Por favor llena todos los campos para continuar.')
        return;
    }

    if (password !== confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden.');
        return;
    }

    try {
        setLoading(true);
        await registerUser(user.trim(), email.trim());

        Alert.alert(
            'Registro exitoso',
            'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
            [
                {
                    text: 'OK',
                    onPress: () => router.replace('/login' as any),
                },
            ]
        );
    } catch (error: any) {
        Alert.alert('Error al registrar', error.message || 'Ocurrió un error al crear la cuenta.');
        console.log('Error al registrar', error.message || 'Ocurrió un error al crear la cuenta.');
        
    } finally {
        setLoading(false);
    }

        
    };

    return (
        <SafeAreaView className="flex-1 bg-gradient-to-t from-white to-[#FFF5C3]">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding': 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerClassName="flex-grow justify-between p-6 md:p-12"
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
                            Crear Cuenta
                        </Text>

                        <View className="mb-4">
                            <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-4 py-3">
                                <FontAwesome5 name="user" size={16} color="#64748b" className="mr-3" />
                                <TextInput 
                                    placeholder="Nombre de usuario"
                                    placeholderTextColor="#94a3b8"
                                    value={user}
                                    onChangeText={setUser}
                                    className="flex-1 text-slate-800 text-base p-0"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View className="mb-4">
                            <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-4 py-3">
                                <FontAwesome5 name="envelope" size={16} color="#64748b" className="mr-3"/>
                                <TextInput
                                    placeholder="Correo Electronico"
                                    placeholderTextColor="#94a3b8"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    className="flex-1 text-slate-800 text-base p-0"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View> 

                        <View className="mb-4">
                            <View className="flex-row items-center bg-white border border-slate-200 rounded-xl  px-4 py-3">
                                < FontAwesome5 name="lock" size={16} color="#64748b" className="mr-3"/>
                                <TextInput
                                    placeholder="Contraseña"
                                    placeholderTextColor="#94a3b8"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                    className="flex-1 text-slate-800 text-base p-0"
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                   <FontAwesome5
                                    name={showPassword ? "eye-slash": "eye"}
                                    size={14}
                                    color="#64748b"
                                   /> 
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="mb-6">
                            <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-4 py-3">
                                <FontAwesome5 name="check-double" size={16} color="#64748b" className="mr-3" />
                                <TextInput
                                 placeholder="confirmar Contraseña "
                                 placeholderTextColor="#94a3b8"
                                 secureTextEntry={!showPassword}
                                 value={confirmPassword}
                                 onChangeText={setConfirmPassword}
                                 className="flex-1 text-slate-800 text-base p-0"
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                console.log('click detectado')
                                handleRegister();
                            }}
                            disabled={loading}
                            activeOpacity={0.8}
                            className={`py-3.5 rounded-full items-center justify-center mb-6 shadow-sm ${
                                loading ? 'bg-[#d99b26]/60' : 'bg-[#d99b26]'
                            }`}
                            >
                                {loading ? (
                                    <ActivityIndicator color='#fff3ff'/>
                                ):(
                                    <Text className="text-white font-bold text-base uppercase tracking-wider">
                                Registrarse
                            </Text>
                                )}
                            
                        </TouchableOpacity>

                        <View className="items-center">
                            <TouchableOpacity onPress={() => router.push('/login' as any)}>
                                <Text className="text-slate-600 text-sm font-medium">
                                    ¿Ya tienes cuenta? <Text className="text-[#d99b26] font-semibold">Inicia Sesion</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}