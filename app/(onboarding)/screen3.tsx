import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import onBoardingStyle from "@/styles/onboarding";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import screeImage from "../../assets/images/screen1.png"


const screen3 = () => {
  const router = useRouter();

const handleSet = async () => {
  try {
    await AsyncStorage.setItem("onboarding", "true");
    router.push("/(auth)/register");
  } catch (error) {
    console.error("Failed to set onboarding flag", error);
  }
};





  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={onBoardingStyle.container}>
        <Image
          source={screeImage}
          style={onBoardingStyle.image}
           contentFit="contain"
        />
        <Text style={onBoardingStyle.heading}>Get Notified Instantly</Text>
        <Text style={onBoardingStyle.text}>
          Stay ready and receive real-time notifications whenever a new cake
          delivery is assigned to you. Never miss an opportunity to deliver
          smiles!
        </Text>
        <View style={onBoardingStyle.dotWrap}>
          <View style={onBoardingStyle.dot}></View>
          <View style={onBoardingStyle.dot}></View>
          <View style={onBoardingStyle.activeDot}></View>
        </View>
        <TouchableOpacity
          style={onBoardingStyle.next}
          onPress={() =>handleSet()}
        >
          <View>
            <Text style={onBoardingStyle.nextText}>Start Receiving Orders</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default screen3;
