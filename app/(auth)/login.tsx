import { Link } from 'expo-router';
import React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const handleLogin = () => {
    // Handle login logic here
    console.log('Login pressed');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <View>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>Login Panel</Text>
          <Button title="Login" onPress={handleLogin} />
          <Link href={"/(auth)/register"}>Register page</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
