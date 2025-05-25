import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasOnboarded = await AsyncStorage.getItem("onboarding");

        if (hasOnboarded === "true") {
          router.replace("/(auth)/login"); // Go directly to login
        } else {
          router.replace("/(onboarding)/screen1"); // Show onboarding if not done
        }
      } catch (e) {
        console.error("Failed to check onboarding status", e);
      } finally {
        setLoading(false);
      }
    };

    checkOnboarding();
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return <SafeAreaView><View /></SafeAreaView>; // Empty if nothing renders
};

export default Index;
