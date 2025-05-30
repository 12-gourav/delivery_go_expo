import { View, ActivityIndicator, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadUserAPI } from "../api/auth-api";
import { useDispatch, useSelector } from "react-redux";

const STORAGE_KEYS = {
  TOKEN: "token",
  ONBOARDING: "onboarding",
};
const Index = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const checkOnboarding = async () => {
    try {
      const onboarding: any = await AsyncStorage.getItem(
        STORAGE_KEYS.ONBOARDING
      );

      if (onboarding === null) {
        router.push("/(onboarding)/screen1");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserLogin = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) {
        const result = await LoadUserAPI(token);
        if (result?.data?.data) {
          dispatch({ type: "load", payload: result?.data?.data });
          router.replace("/(tabs)/home");
        } else {
          router.replace("/(auth)/login");
        }
      } else {
        router.replace("/(auth)/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  useEffect(() => {
    checkUserLogin();
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: "100%",
        }}
      >
        <Button
          title="login res"
          onPress={() => router.push("/(auth)/login")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;
