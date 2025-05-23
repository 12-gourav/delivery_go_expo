import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    extra: require("../assets/fonts/Lato-Black.ttf"),
    bold: require("../assets/fonts/Lato-Bold.ttf"),
    regular: require("../assets/fonts/Lato-Regular.ttf"),
    light: require("../assets/fonts/Lato-Light.ttf"),
    thin: require("../assets/fonts/Lato-Thin.ttf"),
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [onBoarding, setOnBoarding] = useState<boolean>(false);

  const checkOnboarding = async () => {
    const onboarding = await AsyncStorage.getItem("onboarding");
    setOnBoarding(onboarding === "true");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        const res = await fetch("https://your-api.com/api/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsLoggedIn(res.ok);
      } catch (error) {
        console.error("Auth error:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    checkOnboarding();
  }, []);

  if (!loaded || isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* {onBoarding ? (
          <Stack.Screen name="(onboarding)" />
        ) : isLoggedIn ? ( */}
          <Stack.Screen name="(tabs)" />
        {/* ) : (
          <Stack.Screen name="(auth)" />
        )} */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
