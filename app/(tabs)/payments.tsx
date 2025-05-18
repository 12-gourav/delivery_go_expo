import { View, Text, FlatList, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderStyle from "@/styles/order";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { primary } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";

const payments = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <View style={OrderStyle.container}>
        <Text style={OrderStyle.heading}>Earnings & Payments</Text>
        <Text style={OrderStyle.dis}>
          View detailed records of all your payments and transactions.
        </Text>

        <View>
          <TextInput placeholder="Search by name" />
        </View>

        <FlatList
          data={["complete", "cancel", "rto", "complete"]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <TrackingCard item={item} />}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginTop: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default payments;

export const TrackingCard: React.FC<any> = ({ item }) => {
  return (
    <View style={OrderStyle.card}>
      <View style={OrderStyle.top}>
        <View style={OrderStyle.bar}>
          <Text style={OrderStyle.h1} numberOfLines={1} ellipsizeMode="tail">
            Chocolate Cake Near boby guest house lalganj raebra
          </Text>
          <Text style={OrderStyle.date}>12 Jun Wed 12:00 AM</Text>
        </View>
        <Image
          style={OrderStyle.img}
          source={require("../../assets/images/p1.jpg")}
        />
      </View>
      <View style={OrderStyle.address}>
        <View style={OrderStyle.pin}>
          <Ionicons name="storefront-outline" size={15} color={primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={OrderStyle.p} numberOfLines={2} ellipsizeMode="tail">
            Near boby guest house lalganj raebralei 229206 Near boby guest
          </Text>
        </View>
      </View>
      <View style={{ ...OrderStyle.address, marginTop: 30 }}>
        <View style={OrderStyle.pin2}>
          <Feather name="map-pin" size={15} color={primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={OrderStyle.p} numberOfLines={2} ellipsizeMode="tail">
            Near boby guest house lalganj raebralei 229206
          </Text>
        </View>
      </View>
      <View style={OrderStyle.line}></View>
      <View style={OrderStyle.last}>
        <View style={OrderStyle.wrapText}>
          <MaterialIcons name="currency-rupee" size={15} color={primary} />
          <Text style={OrderStyle.ptext}>200</Text>
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
        <View style={{ ...OrderStyle.wrapText, gap: 5 }}>
          <Text style={OrderStyle.ptext}>See More</Text>
          <AntDesign name="arrowright" size={14} color={primary} />
        </View>
      </View>
    </View>
  );
};
