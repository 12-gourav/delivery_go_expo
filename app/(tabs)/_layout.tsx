import { Tabs } from "expo-router";
import React from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { IconSymbol } from "@/components/ui/IconSymbol";
import 'react-native-gesture-handler'
import "react-native-reanimated"

export default function TabLayout() {
  return (
    <Tabs
     initialRouteName="home" 
      screenOptions={{
        tabBarActiveTintColor: "#FF0059",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#002143",
          height: 90,
        },
        headerShown: false,
      }}
    
    >
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "Upcoming",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="shopping-outline"
              size={18}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="shopping-search"
              size={18}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol name="house.fill" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: "Payments",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="payment"
              size={18}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="user" size={18} color={color} focused={focused} />
          ),
        }}
      />
      
    </Tabs>
  );
}
