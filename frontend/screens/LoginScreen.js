import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.101.9:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("authToken", data.access);
        await AsyncStorage.setItem("user_first_name", data.first_name);
        await AsyncStorage.setItem("user_last_name", data.last_name);
        await AsyncStorage.setItem("isStaff", data.is_staff.toString());
        await AsyncStorage.setItem("isSuperUser", data.is_superuser.toString());
        setLoginData(data);
        navigation.navigate("Home");
      } else {
        ToastAndroid.show("Login Failed", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error during login", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size={"large"} color={"blue"} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "80%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    width: "80%",
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    fontSize: 16,
    color: "blue",
  },
});

export default LoginScreen;
