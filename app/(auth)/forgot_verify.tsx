import {
  Link,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthStyles from "@/styles/auth";
import { Image } from "expo-image";
import OTPInput from "@/components/OTPInput";
import lockImg from "../../assets/images/lock.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { ResetPasswordAPI } from "@/api/auth-api";

const Forgot = () => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const param = useLocalSearchParams();
  const router = useRouter();

  const handleLogin = async () => {
    if (email === "")
      return Toast.show({
        type: "error",
        text1: "Email is required",
        text2: "Please enter your email address",
      });
    if (password?.length < 6) {
      return Toast.show({
        type: "error",
        text1: "Password is too short",
        text2: "Please enter a password with more than 6 characters.",
      });
    }
    if (password === "")
      return Toast.show({
        type: "error",
        text1: "Password is required",
        text2: "Please enter your password address",
      });
    if (otp === "")
      return Toast.show({
        type: "error",
        text1: "OTP is required",
        text2: "Please enter your otp address",
      });
    if (confirmPassword === "") {
      return Toast.show({
        type: "error",
        text1: "Confirm Password is required",
        text2: "Please enter your confirm password",
      });
    }
    if (password !== confirmPassword) {
      return Toast.show({
        type: "error",
        text1: "Confirm Password Incorrect",
        text2: "Password and confirm password is not match",
      });
    }
    try {
      setLoading(true);
      const result = await ResetPasswordAPI(email, password, otp);
      if (result?.data?.data) {
        Toast.show({
          type: "success",
          text1: "Password Reset Successfully",
          text2: "Your password has been updated successfully.",
        });
        router.push("/(auth)/login");
      } else {
        Toast.show({
          type: "error",
          text1: "Password reset fail",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEmail(param.emailText);
  }, [param]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={50}
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
              source={lockImg}
              style={{ width: 150, height: 150 }}
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
              editable={false}
            />
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>New Password</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your new password"
              onChangeText={(e) => setPassword(e)}
              value={password}
              secureTextEntry
            />
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Coinfirm Password</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your confirm password"
              onChangeText={(e) => setConfirmPassword(e)}
              value={confirmPassword}
            />
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>OTP</Text>
            <OTPInput setOtp={setOtp} />
          </View>

          <Link href={"/(auth)/forgot"} style={AuthStyles.link}>
            Back to forgot page?
          </Link>

          <TouchableOpacity onPress={handleLogin} disabled={loading}>
            <View style={AuthStyles.login}>
              <Text style={AuthStyles.textActive}>
                {loading ? <ActivityIndicator /> : "Submit"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Forgot;
