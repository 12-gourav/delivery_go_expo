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
import { OtpInput } from "react-native-otp-entry";
import OTPInput from "@/components/OTPInput";

const Verify = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("");
  const [otp,setOtp] = useState("")

  const path = usePathname();
  const router = useRouter();

  const handleLogin = async () => {
    console.log(email, password);
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
          <Text style={AuthStyles.brand}>🔐 Verify Your Email</Text>
          <Text style={AuthStyles.brand2}>
            We’ve sent a One-Time Password (OTP) to your email. Please check
            your inbox to continue. If you don’t see the email, be sure to check
            your Spam or Junk folder as well.
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
              source={require("../../assets/images/lock.svg")}
              style={{ width: 150, height: 150, resizeMode: "contain" }}
            />
          </View>

          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Email Address</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your register email address"
              value={email}
              editable={false}
            />
          </View>


          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>OTP</Text>
           <OTPInput setOtp={setOtp}/>
          </View>

          <Link href={"/(auth)/forgot"} style={AuthStyles.link}>
            Back to forgot page?
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

export default Verify;
