import { Link, Stack } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página no encontrada', headerShown: false }} />
      
      <View className="flex-1 bg-[#FFF5C3] items-center justify-center p-6">
        
        <View className="w-24 h-24 rounded-full bg-amber-200 border-2 border-amber-400 items-center justify-center mb-6 shadow-sm">
          <FontAwesome5 name="exclamation-triangle" size={40} color="#1E293B" />
        </View>

        <Text className="text-2xl font-black text-slate-900 text-center mb-2">
          ¡Ups! Pantalla no encontrada
        </Text>

        <Text className="text-slate-600 text-center text-sm md:text-base max-w-xs mb-8">
          La ruta a la que intentas acceder no existe o fue movida.
        </Text>

        <Link href="/" asChild>
          <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-[#F5D547] px-8 py-4 rounded-full shadow-md active:bg-amber-400"
          >
            <Text className="text-slate-900 font-extrabold uppercase tracking-wider text-sm">
              Volver al inicio
            </Text>
          </TouchableOpacity>
        </Link>

      </View>
    </>
  );
}