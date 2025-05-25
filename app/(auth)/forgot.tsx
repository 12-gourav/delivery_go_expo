import { Link, usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "@/styles/auth";
import { Image } from "expo-image";
import lockImage from "../../assets/images/lock.png"


const Forgot = () => {
  const [email, setEmail] = useState("");



  const router = useRouter();

  const handleLogin = async () => {
   router.push("/(auth)/forgot_verify")
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#fff",
        }}
      >
        <View style={AuthStyles.wrapper}>
          <Text style={AuthStyles.brand}>Forgot Your Password?</Text>
          <Text style={AuthStyles.brand2}>
            Don’t worry, we’ll help you reset it. Enter your email to receive
            password reset instructions.
          </Text>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={lockImage}
              style={{ width: 150, height: 150, }}
              contentFit="contain"
            />
          </View>

          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Email Address</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your register email address"
              onChangeText={(e) => setEmail(e)}
              value={email}
            />
          </View>

          <Link href={"/(auth)/login"} style={AuthStyles.link}>
            Back to login page?
          </Link>

          <TouchableOpacity onPress={handleLogin}>
            <View style={AuthStyles.login}>
              <Text style={AuthStyles.textActive}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forgot;
