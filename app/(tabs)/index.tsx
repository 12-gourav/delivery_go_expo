import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyles from "@/styles/home";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Zocial from "@expo/vector-icons/Zocial";

import { Image } from "expo-image";
import DashboardChart from "@/components/DashboardChart";

const index = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <View style={HomeStyles.container}>
          <View style={HomeStyles.heading}>
            <Text style={HomeStyles.h1}>Hi, Gaurav</Text>
            <Text style={HomeStyles.h2}>Welcome to BakersLine Go</Text>
            <Text style={HomeStyles.p}>
              Your day starts here! Check for new cake delivery assignments and
              start delivering happiness — fresh, fast, and with care.
            </Text>
          </View>
          <Text style={HomeStyles.overview}>Overview</Text>
          <View style={HomeStyles.boxwrap}>
            <View style={HomeStyles.box}>
              <View style={HomeStyles.line}>
                <View style={HomeStyles.circle}>
                  <SimpleLineIcons
                    name="wallet"
                    size={14}
                    color="#002143"
                    style={{ fontWeight: "600" }}
                  />
                </View>
                <Text style={HomeStyles.p2}>Total Revenue</Text>
              </View>
              <Text style={HomeStyles.price}>25,000</Text>
            </View>
            <View style={HomeStyles.box}>
              <View style={HomeStyles.line}>
                <View style={HomeStyles.circle}>
                  <Feather name="shopping-bag" size={16} color="#002143" />
                </View>
                <Text style={HomeStyles.p2}>Total Orders</Text>
              </View>
              <Text style={HomeStyles.price}>200</Text>
            </View>
          </View>
          <View style={HomeStyles.boxwrap}>
            <View style={HomeStyles.box}>
              <View style={HomeStyles.line}>
                <View style={HomeStyles.circle}>
                  <MaterialIcons
                    name="local-shipping"
                    size={16}
                    color="#002143"
                  />
                </View>
                <Text style={HomeStyles.p2}>Orders in Transist</Text>
              </View>
              <Text style={HomeStyles.price}>25,000</Text>
            </View>
            <View style={HomeStyles.box}>
              <View style={HomeStyles.line}>
                <View style={HomeStyles.circle}>
                  <FontAwesome5 name="rupee-sign" size={16} color="#002143" />
                </View>
                <Text style={HomeStyles.p2}>Total Balance Amount</Text>
              </View>
              <Text style={HomeStyles.price}>200</Text>
            </View>
          </View>
          <View>
            <View>
              <Text style={HomeStyles.overview}>Order Summery</Text>
            </View>
            {[1, 2, 3, 4, 5]?.map((d) => (
              <View style={HomeStyles.product} key={d}>
                <Image
                  source={require("../../assets/images/p1.jpg")}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 5,
                    resizeMode: "cover",
                  }}
                />
                <View>
                  <Text
                    style={HomeStyles.ptext}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Cholocate Cake
                  </Text>
                  <View style={HomeStyles.line3}>
                    <View style={HomeStyles.line2}>
                      <Fontisto name="date" size={12} color="gray" />
                      <Text style={HomeStyles.sm}>12/04/2025</Text>
                    </View>
                    <View style={HomeStyles.line2}>
                      <Zocial name="statusnet" size={12} color="gray" />
                      <Text style={HomeStyles.sm}>Complete</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View style={HomeStyles.graph}>
            <Text style={{...HomeStyles.overview,marginTop:0,marginBottom:10}}>Overall Order Progress</Text>
            <DashboardChart/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
