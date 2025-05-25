import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";

import { ErrorBoundary } from "@/components/ErrorBoundry";

SplashScreen.preventAutoHideAsync();

const STORAGE_KEYS = {
  TOKEN: "token",
  ONBOARDING: "onboarding",
};

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(true);
  const [onBoarding, setOnBoarding] = useState<boolean>(false);

  const router = useRouter();

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    extra: require("../assets/fonts/Lato-Black.ttf"),
    bold: require("../assets/fonts/Lato-Bold.ttf"),
    regular: require("../assets/fonts/Lato-Regular.ttf"),
    light: require("../assets/fonts/Lato-Light.ttf"),
    thin: require("../assets/fonts/Lato-Thin.ttf"),
  });

  const checkOnboarding = async () => {
    try {
      const onboarding: any = await AsyncStorage.getItem(
        STORAGE_KEYS.ONBOARDING
      );
      console.log(onboarding, "onboarding");

      if (onboarding === null) {
        router.push("/(onboarding)/screen1");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserLogin = async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) throw error;
    if (loaded) SplashScreen.hideAsync();
  }, [loaded, error]);

  useEffect(() => {
    checkOnboarding();
  }, []);

  useEffect(() => {
    checkUserLogin();
  }, []);

  if (!loaded && !error) return null;

  return (
    <ErrorBoundary>
      <Slot />
      <StatusBar style={"dark"} />
    </ErrorBoundary>
  );
}
