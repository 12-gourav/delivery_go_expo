import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
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
import { upcomingOrdersAPI } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/components/Loader";
import Nodata from "@/components/Nodata";

const upcoming = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const result = await upcomingOrdersAPI(token);
      if (result?.data?.data) {
        setState(result?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <View style={UpcomingStyle.container}>
        <Text style={UpcomingStyle.heading}>Upcoming Orders</Text>
        <Text style={UpcomingStyle.dis}>
          Track your upcoming orders and stay updated.
        </Text>
        <View style={{ flexGrow: 1, marginTop: 20, marginBottom: 10 }}>
          {state?.length === 0 && loading === false ? (
            <Nodata message="No Upcoming Orders Exist" />
          ) : (
            <FlatList
              data={state}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TrackingCard
                  item={item}
                  handlepush={() => router.push("/(external)/:dsadsadsad")}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default upcoming;

export const TrackingCard: React.FC<any> = ({ item }) => {
  const router = useRouter();
  return (
    <View style={OrderStyle.card}>
      <View style={OrderStyle.top}>
        <View style={OrderStyle.bar}>
          <Text style={OrderStyle.h1} numberOfLines={1} ellipsizeMode="tail">
            {item?.product[0]?.name}
          </Text>
          <Text style={OrderStyle.date}>
            {new Date(item?.orderDate).toDateString()}{" "}
            {new Date(item?.orderTime).toLocaleTimeString()}
          </Text>
        </View>
        <Image
          style={OrderStyle.img}
          source={item?.product[0]?.img[0]?.url?.replace("http", "https")}
          contentFit="cover"
        />
      </View>
      <View style={OrderStyle.address}>
        <View style={OrderStyle.pin}>
          <Ionicons name="storefront-outline" size={15} color={primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={OrderStyle.p} numberOfLines={2} ellipsizeMode="tail">
            {item?.shop?.shop?.shopName} -{" "}
            {item?.shop?.shop?.shopAddress +
              ", " +
              item?.shop?.shop?.shopZipCode}
          </Text>
        </View>
      </View>
      <View style={{ ...OrderStyle.address, marginTop: 30 }}>
        <View style={OrderStyle.pin2}>
          <Feather name="map-pin" size={15} color={primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={OrderStyle.p} numberOfLines={2} ellipsizeMode="tail">
            {item?.shippingAddress?.address}
          </Text>
        </View>
      </View>
      <View style={OrderStyle.line}></View>
      <View style={OrderStyle.last}>
        <View style={OrderStyle.wrapText}>
          <MaterialIcons name="currency-rupee" size={15} color={primary} />
          <Text style={OrderStyle.ptext}>
            {item?.totalAmount + item?.deliveryFee}
          </Text>
        </View>

        <Text
          style={
            item.orderStatus === "ASSIGN"
              ? OrderStyle.ASSIGN
              : item.orderStatus === "DISPATCH"
              ? OrderStyle.DISPATCH
              : item.orderStatus === "COMPLETE"
              ? OrderStyle.COMPLETE
              : OrderStyle.CANCEL
          }
        >
          {item.orderStatus}
        </Text>
        <TouchableOpacity
          style={{ ...OrderStyle.wrapText, gap: 5 }}
          onPress={() => router.push(`/(external)/${item?._id}`)}
        >
          <Text style={OrderStyle.ptext}>See More</Text>
          <AntDesign name="arrowright" size={14} color={primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};