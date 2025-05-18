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

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const path = usePathname();
  const router = useRouter();

  const handleLogin = async () => {
  router.push("/(tabs)")
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#fff",
        }}
      >
        <View style={AuthStyles.wrapper}>
          <Text style={AuthStyles.brand}>Delivering the Future.</Text>
          <Text style={AuthStyles.brand2}>Your packages. Our promise.</Text>
          <View style={AuthStyles.toggleWrap}>
            <TouchableOpacity
              style={

                AuthStyles.toggleWrapLeftActive
              }
              onPress={() => router.push("/(auth)/login")}
            >
              <View>
                <Text
                  style={

                    AuthStyles.textActive
                  }
                >
                  Login
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                AuthStyles.toggleWrapRight
              }
              onPress={() => router.push("/(auth)/register")}
            >
              <View>
                <Text
                  style={
                    AuthStyles.text
                  }
                >
                  Register
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Email Address</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your email address"
              onChangeText={(e) => setEmail(e)}
              value={email}
            />
          </View>
          <View style={AuthStyles.formGroup}>
            <Text style={AuthStyles.label}>Password</Text>
            <TextInput
              style={AuthStyles.input}
              secureTextEntry
              placeholder="Enter your password"
              onChangeText={(e) => setPassword(e)}
              value={password}
            />
          </View>

          <Link href={"/(auth)/forgot"} style={AuthStyles.link}>
            Forgot Password?
          </Link>

          <Link href={"/(auth)/register"} style={AuthStyles.link}>
            Don't have an account?{" "}
            <Text style={{ fontWeight: "600", fontFamily: "bold" }}>
              Create Account
            </Text>
          </Link>
          <TouchableOpacity onPress={handleLogin}>
            <View style={AuthStyles.login}>
              <Text style={AuthStyles.textActive}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
