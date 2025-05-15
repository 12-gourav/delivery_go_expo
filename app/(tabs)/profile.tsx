import { Image } from 'expo-image';
import { Platform, StyleSheet, View,Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  return (
    <SafeAreaView>
   <View>
    <Text>Hii Profile page</Text>
    <Link href={"/(auth)/login"}>Login</Link>
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
