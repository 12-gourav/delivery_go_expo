import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UpcomingStyle from "@/styles/upcoming";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";
import { pink, primary } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import p1 from "../../assets/images/p1.jpg";
import { useRouter } from "expo-router";
import OrderStyle from "@/styles/order";

const upcoming = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <View style={UpcomingStyle.container}>
        <Text style={UpcomingStyle.heading}>Upcoming Orders</Text>
        <Text style={UpcomingStyle.dis}>
          Track your upcoming orders and stay updated.
        </Text>
        <View style={{ flexGrow: 1, marginTop: 20, marginBottom: 10 }}>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TrackingCard
                item={item}
                handlepush={() => router.replace("/(external)/:dsadsadsad")}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default upcoming;

export const TrackingCard: React.FC<any> = ({ item,handlepush }) => {
  return (
    <View style={UpcomingStyle.card}>
      <View style={UpcomingStyle.top}>
        <View style={UpcomingStyle.bar}>
          <Text style={UpcomingStyle.h1} numberOfLines={1} ellipsizeMode="tail">
            Chocolate Cake Near boby guest house lalganj raebra
          </Text>
          <Text style={UpcomingStyle.date}>12 Jun Wed 12:00 AM</Text>
        </View>
        <Image style={UpcomingStyle.img} source={p1} contentFit="cover" />
      </View>
      <View style={UpcomingStyle.address}>
        <View style={UpcomingStyle.pin}>
          <Ionicons name="storefront-outline" size={15} color={primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={UpcomingStyle.p} numberOfLines={2} ellipsizeMode="tail">
            Near boby guest house lalganj raebralei 229206 Near boby guest
          </Text>
        </View>
      </View>
      <View style={{ ...UpcomingStyle.address, marginTop: 30 }}>
        <View style={UpcomingStyle.pin2}>
          <Feather name="map-pin" size={15} color={primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={UpcomingStyle.p} numberOfLines={2} ellipsizeMode="tail">
            Near boby guest house lalganj raebralei 229206
          </Text>
        </View>
      </View>
      <View style={UpcomingStyle.line}></View>
      <View style={UpcomingStyle.last}>
        <View style={UpcomingStyle.wrapText}>
          <MaterialIcons name="currency-rupee" size={15} color={primary} />
          <Text style={UpcomingStyle.ptext}>200</Text>
        </View>
           <View
          style={
            item === "complete"
              ? OrderStyle.complete
              : item === "cancel"
              ? OrderStyle.cancel
              : OrderStyle.rto
          }
        >
          <Text
            style={
              item === "complete"
                ? OrderStyle.completeText
                : item === "cancel"
                ? OrderStyle.cancelText
                : OrderStyle.rtoText
            }
          >
            {item === "complete"
              ? "Complete"
              : item === "cancel"
              ? "Cancel"
              : "RTO"}
          </Text>
        </View>
        <TouchableOpacity
          style={{ ...UpcomingStyle.wrapText, gap: 5 }}
          onPress={() => handlepush()}
        >
          <Text style={UpcomingStyle.ptext}>See More</Text>
          <AntDesign name="arrowright" size={14} color={primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
