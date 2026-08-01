import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import '../global.css'

export default function PrivacidadScreen(){
    const router = useRouter();

    return(
        <SafeAreaView className='flex-1 bg-[#FFF5C3]'>

            <View className='flex-row items-center px-6 py-4 border-b border-amber-300/60 '>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={()=> router.back()}
                    className='w-10 h-10 rounded-full bg-slate-900 items-center justify-center mr-3 shadow-sm'
                >
                    <FontAwesome5 name="arrow-left" size={16} color="#F5D547"/>
                </TouchableOpacity>
                <Text className='text-xl font-bold text-slate-900'>
                    Aviso de Privacidad
                </Text>
            </View>

            <ScrollView contentContainerClassName='p-6 pb-12 gap-6'>
                <View className='bg-amber-200/60 p-4 rounded-2xl border border-amber-300 flex-row items-center gap-4'>
                    <FontAwesome5 name="user-shield" size={28} color="1E293B"/>
                    <Text className='flex-1 text-slate-800 text-xs md:text-sm font-medium leading-relaxed'>
                        Tu privacidad y la seguridad de tus datos personales son la maxima prioridad en nuestra comunidad.
                    </Text>
                </View>

                <View className="gap-2">
                    <Text className='text-base font-bold text-slate-900'>
                        1. Recopilacion de Datos
                    </Text>
                    <Text className='text-slate-700 text-sm leading-relaxed'>
                        Unicamente solicitamos la informacion necesaria para el funcionamiento de las alertas comunitarias y reportes de incidentes. Los datos de geolocalizacion solo se procesan en tiempo real para verificar incidentes cercanos.
                    </Text>
                </View>

                <View className='gap-2'>
                    <Text className='text-base font-bold text-slate-900'>
                        2. Uso de la Informacion
                    </Text>
                    <Text className='text-slate-700 text-sm leading-relaxed'>
                        Tus reportes ayudan a alertar a otros vecinos y coordinar ayuda comunitaria. En ningun momento comercializamos ni compartimos tus datos personales con terceros no autorizados.
                    </Text>
                </View>

                <View className='gap-2'>
                    <Text className='text-base font-bold text-slate-900'>
                        3. Reportes anonimos
                    </Text>
                    <Text className='text-slate-700 text-sm leading-relaxed'>
                        Puedes emitir alertas e incidentes de forma totalmente anonima seleccionando dicha opcion al momento de realizar una publicacion.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}