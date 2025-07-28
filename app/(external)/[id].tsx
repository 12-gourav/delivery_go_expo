import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailStyle from "@/styles/detail";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

import { InfoText, InfoText2, pink } from "@/constants/Colors";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import deliveryStatuses from "@/constants/Status";
import ImageView from "react-native-image-viewing";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GetOrdersDetails, orderUpdateAPI } from "@/api/api";
import Loader from "@/components/Loader";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderDetails = () => {
  const [state, setState] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [dLoading, setDLoading] = useState(false);
  const [status, setStatus] = useState("");
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const result = await GetOrdersDetails(id);
      if (result?.data?.data) {
        setState(result?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openMap = (address: string) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent(
      address
    )}&travelmode=driving`;

    return Linking.openURL(mapsUrl);
  };

  useEffect(() => {
    fetchRecords();
  }, [id]);

  const completeOrderAPI = async () => {
    if (otp === "" || status === "") {
      return Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Otp and status is required",
      });
    }
    Alert.alert(
      "Mark Order as Completed?",
      "This action is not reversible. Once marked as completed, the order cannot be changed.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Complete",
          onPress: async () => {
            try {
              setDLoading(true);
              const token = await AsyncStorage.getItem("token");
              const result = await orderUpdateAPI(
                id,
                otp,
                status,
                "SUCCESS",
                token
              );
              if (result?.data?.data) {
                Toast.show({
                  type: "success",
                  text1: "Order Delivered Successful",
                });
                fetchRecords();
              }
            } catch (error) {
              console.log(error);
            } finally {
              setDLoading(false);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    const backAction = () => {
      router.push("/(tabs)/order");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <ScrollView>
        <View style={DetailStyle.container}>
          <View>
            <Text style={DetailStyle.heading}>Order Details</Text>
            <Text style={DetailStyle.dis}>
              Here’s everything about your order — from items to delivery
              progress!
            </Text>
          </View>

          <View style={DetailStyle.formwrap}>
            <Text style={DetailStyle.formwrap_text}>Customer Details</Text>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Name</Text>
              <Text style={DetailStyle.text}>{state?.customer?.name}</Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Email</Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`mailto:${state?.customer?.email}`)
                }
              >
                <Text style={DetailStyle.link}>{state?.customer?.email}</Text>
              </TouchableOpacity>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Phone Number</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${state?.customer?.phone}`)}
              >
                <Text style={DetailStyle.link}>
                  +91 {state?.customer?.phone}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <FontAwesome name="home" size={18} color={pink} />
                <Text style={DetailStyle.label}>Drop Address</Text>
              </View>

              <Text style={DetailStyle.text}>
                {state?.shippingAddress?.address}
              </Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <MaterialCommunityIcons
                  name="map-marker-radius-outline"
                  size={18}
                  color={pink}
                />
                <Text style={DetailStyle.label}>Open Street Map</Text>
              </View>

              <TouchableOpacity
                onPress={() => openMap(state?.shippingAddress?.address)}
              >
                <Text style={DetailStyle.link}>https://google/mapslink</Text>
              </TouchableOpacity>
            </View>
          </View>

          {state?.orderNote && (
            <View style={DetailStyle.note}>
              <Text style={DetailStyle.nh}>Order Note for Cake</Text>
              <Text style={DetailStyle.np}>{state.orderNote}</Text>
            </View>
          )}

          <View style={DetailStyle.formwrap}>
            <Text style={DetailStyle.formwrap_text}>Order Details</Text>

            {state?.product?.map((d: any, i: number) => (
              <OrderCard key={d?.variant?._id + i} data={d} />
            ))}
            <View style={DetailStyle.total}>
              <Text style={DetailStyle.totalText}>
                Total Payable Amount: {state?.totalAmount + state?.deliveryFee}{" "}
                Rs
              </Text>
            </View>
          </View>
          <View style={DetailStyle.formwrap}>
            <Text style={DetailStyle.formwrap_text}>Store Details</Text>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Store Name</Text>
              <Text style={DetailStyle.text}>
                {state?.supplier?.shop?.shopName}
              </Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Store Owner Name</Text>
              <Text style={DetailStyle.text}>{state?.supplier?.name}</Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Store Email</Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`mailto:${state?.supplier?.email}`)
                }
              >
                <Text style={DetailStyle.link}>{state?.supplier?.email}</Text>
              </TouchableOpacity>
            </View>
            <View style={DetailStyle.formgroup}>
              <Text style={DetailStyle.label}>Phone Number</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${state?.supplier?.phone}`)}
              >
                <Text style={DetailStyle.link}>
                  +91 {state?.supplier?.phone}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <Entypo name="shop" size={18} color={pink} />

                <Text style={DetailStyle.label}>Pickup Address</Text>
              </View>

              <Text style={DetailStyle.text}>
                {state?.supplier?.shopAddress}, {state?.supplier?.shopZipCode}
              </Text>
            </View>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <MaterialCommunityIcons
                  name="map-marker-radius-outline"
                  size={18}
                  color={pink}
                />
                <Text style={DetailStyle.label}>Open Street Map</Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  openMap(
                    `${state?.supplier?.shopAddress}, ${state?.supplier?.shopZipCode}`
                  )
                }
              >
                <Text style={DetailStyle.link}>https://google/mapslink</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={DetailStyle.formwrap}>
            <Text style={DetailStyle.formwrap_text}>Order Verification</Text>
            <View style={DetailStyle.formgroup}>
              <View style={DetailStyle.wrapText}>
                <TouchableOpacity onPress={() => Alert.alert("Info", InfoText)}>
                  <AntDesign name="infocirlceo" size={16} color={pink} />
                </TouchableOpacity>

                <Text style={DetailStyle.label}>Pickup Verification OTP</Text>
              </View>

              <Text style={DetailStyle.otp}>
                {state?.supplier?.supplierOTP}
              </Text>
            </View>

            {state?.orderStatus === "ASSIGN" && (
              <Text style={{fontFamily:"bold",fontWeight:"500",marginBottom:10,lineHeight:20,}}>
                Once the shopkeeper dispatches the order, you will be eligible
                to enter the customer's OTP to confirm delivery and complete the
                order.
              </Text>
            )}
            {state?.orderStatus !== "ASSIGN" && (
              <View>
                <View style={DetailStyle.formgroup}>
                  <View style={DetailStyle.wrapText}>
                    <TouchableOpacity
                      onPress={() => Alert.alert("Info", InfoText2)}
                    >
                      <AntDesign name="infocirlceo" size={16} color={pink} />
                    </TouchableOpacity>
                    <Text style={DetailStyle.label}>Drop Verification OTP</Text>
                  </View>
                  {state?.orderStatus === "DISPATCH" ||
                  state?.orderStatus === "ASSIGN" ? (
                    <TextInput
                      keyboardType="numeric"
                      maxLength={6} 
                      style={DetailStyle.input}
                      placeholder="Enter OTP here"
                      onChangeText={(e) => setOtp(e)}
                      value={otp}
                    />
                  ) : (
                    <Text style={DetailStyle.otp}>
                      {state?.customer?.otp}
                    </Text>
                  )}
                </View>
                <View style={DetailStyle.formgroup}>
                  <Text style={{ ...DetailStyle.label, marginBottom: 15 }}>
                    Update Order Status
                  </Text>

                  {deliveryStatuses?.map((d, i) => (
                    <TouchableOpacity
                      key={i}
                      style={
                        status === d?.title || d?.title === state.reason
                          ? DetailStyle.statusCardActive
                          : DetailStyle.statusCard
                      }
                      onPress={() =>
                        setStatus(status === d?.title ? "" : d?.title)
                      }
                      disabled={d?.title === state.reason}
                    >
                      <Text
                        style={
                          status === d?.title || d?.title === state.reason
                            ? DetailStyle.titleActive
                            : DetailStyle.title
                        }
                      >
                        {d?.title}
                      </Text>
                      <Text
                        style={
                          status === d?.title || d?.title === state.reason
                            ? DetailStyle.label2Active
                            : DetailStyle.label2
                        }
                      >
                        {d?.description}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            <TouchableOpacity
              style={{
                ...DetailStyle.submit,
                opacity: state?.orderStatus !== "DISPATCH" ? 0.8 : 1,
              }}
              onPress={completeOrderAPI}
              disabled={dLoading || state?.orderStatus !== "DISPATCH"}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "bold",
                  fontWeight: "500",
                }}
              >
                {dLoading ? (
                  <ActivityIndicator />
                ) : state?.orderStatus !== "DISPATCH" ? (
                  state?.orderStatus
                ) : (
                  "Complete Order"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;

const OrderCard: React.FC<{ data: any }> = ({ data }) => {
  const [visible, setIsVisible] = useState(false);
  return (
    <View style={DetailStyle.card}>
      <View style={DetailStyle.imagewrap}>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Image
            source={data?.img[0]?.url?.replace("http://", "https://")}
            contentFit="cover"
            style={DetailStyle.cardImg}
          />
        </TouchableOpacity>

        <Text style={DetailStyle.price}>Sub Total: {data?.subtotal} Rs</Text>
      </View>
      <View style={DetailStyle.content}>
        <Text style={DetailStyle.name}>{data?.name}</Text>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Text style={DetailStyle.label}>Quantity: {data?.quantity}</Text>
          <Text style={DetailStyle.label}>
            Variant Type: {data?.variant?.variantTitle}
          </Text>
        </View>

        <Text style={DetailStyle.label}>Price: {data?.variant?.price} Rs</Text>
        <Text style={DetailStyle.label}>
          Discount: {data?.variant?.discount * data?.quantity} Rs
        </Text>
        {data?.fareDetails?.length > 0 && (
          <View>
            <Text style={DetailStyle.label}>Additional Fare Items:</Text>
            {data?.fareDetails?.map((f: any, i: number) => (
              <Text key={i + 132} style={DetailStyle.label3}>
                {i + 1}. {f.title} ({f?.amount} Rs)
              </Text>
            ))}
          </View>
        )}
      </View>
      <ImageView
        images={data?.img?.map((l1: any) => ({
          uri: l1.url?.replace("http://", "https://"),
        }))}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};
