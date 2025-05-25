import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import onBoardingStyle from "@/styles/onboarding";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import screenImage from "../../assets/images/screen3.png"

const screen2 = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={onBoardingStyle.container2}>
        <Image
          source={screenImage}
          style={onBoardingStyle.image}
          contentFit="contain"
        />
        <Text style={onBoardingStyle.heading}>Deliver Happiness, Door to Door</Text>
        <Text style={onBoardingStyle.text}>
         Ensure every cake reaches its destination with care. Delight customers with timely and safe deliveries—every time.
        </Text>
        <View style={onBoardingStyle.dotWrap}>
          <View style={onBoardingStyle.dot}></View>
          <View style={onBoardingStyle.activeDot}></View>
          <View style={onBoardingStyle.dot}></View>
        </View>
        <TouchableOpacity style={onBoardingStyle.next} onPress={()=>router.push("/(onboarding)/screen3")}>
          <View>
            <Text style={onBoardingStyle.nextText}>Start Delivering</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default screen2;
