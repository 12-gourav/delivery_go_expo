import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Platform, StyleSheet, View,Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ProfileScreen() {

  const router = useRouter();

  const handleLogout = async()=>{
    await AsyncStorage.clear();
    router.push("/(auth)/login")
  }




  return (
    <SafeAreaView>
   <View>
    <Text>Hii Profile page</Text>
    <Button title='Logout' onPress={handleLogout}/>
   </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
