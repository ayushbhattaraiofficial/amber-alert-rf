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

function CustomInput({ label, value, onChangeText, secureTextEntry }) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!value) {
            setIsFocused(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.inputContainer}>
            <Text
                style={[
                    styles.label,
                    isFocused || value ? styles.labelFocused : null,
                ]}
            >
                {label}
            </Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={secureTextEntry && !showPassword}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={togglePasswordVisibility}
                    >
                        <Text style={styles.toggleButtonText}>
                            {showPassword ? "Hide" : "Show"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginData, setLoginData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                // "http://10.10.35.11:8000/api/login",
                "http://192.168.101.9:8000/api/login/",
                // "http://192.168.123.6:8000/api/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );
            if (response.ok) {
                const data = await response.json();
                await AsyncStorage.setItem("authToken", data.access);
                await AsyncStorage.setItem("user_first_name", data.first_name);
                await AsyncStorage.setItem("user_last_name", data.last_name);
                await AsyncStorage.setItem(
                    "isStaff",
                    data.is_staff.toString()
                );
                await AsyncStorage.setItem(
                    "isSuperUser",
                    data.is_superuser.toString()
                );
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
            <Text style={styles.headings}>Login</Text>
            <CustomInput
                label="Username"
                value={username}
                onChangeText={setUsername}
            />
            <CustomInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true} // Pass secureTextEntry prop
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
    inputContainer: {
        width: "80%",
        marginBottom: 20,
    },
    label: {
        position: "absolute",
        left: 10,
        top: 15,
        fontSize: 16,
        color: "#888",
    },
    labelFocused: {
        top: -10,
        fontSize: 12,
        color: "blue",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    toggleButton: {
        padding: 10,
    },
    toggleButtonText: {
        color: "blue",
        fontSize: 16,
    },
    headings: {
        color: "blue",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
});

export default LoginScreen;
