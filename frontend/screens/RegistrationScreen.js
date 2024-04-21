import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid,
    Switch,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppConfig from "../AppConfig";

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

function BooleanInput({ label, value, onValueChange }) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={value ? "#0078cf" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onValueChange}
                value={value}
            />
        </View>
    );
}

function RegistrationScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [is_staff, setIsStaff] = useState(true);
    const [is_superuser, setIsSuperUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleRegistration = async () => {
        try {
            setLoading(true);
            const response = await fetch(AppConfig.REGISTER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    username,
                    password,
                    is_staff,
                    is_superuser,
                }),
            });
            if (response.ok) {
                navigation.navigate("Login");
            } else {
                ToastAndroid.show("Registration Failed", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error("Error during registration", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.headings}>Registration Form</Text>
                <CustomInput
                    label="First Name"
                    value={first_name}
                    onChangeText={setFirstName}
                />
                <CustomInput
                    label="Last Name"
                    value={last_name}
                    onChangeText={setLastName}
                />
                <CustomInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <CustomInput
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <CustomInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <BooleanInput
                    label="Is Staff"
                    value={is_staff}
                    onValueChange={setIsStaff}
                />
                <BooleanInput
                    label="Is Super User"
                    value={is_superuser}
                    onValueChange={setIsSuperUser}
                />
                {loading ? (
                    <ActivityIndicator size={"large"} color={"blue"} />
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegistration}
                    >
                        <Text style={styles.buttonText}>Registration</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    container: {
        width: "80%",
        alignItems: "center",
    },
    headings: {
        color: "blue",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
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
        width: "100%",
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
});

export default RegistrationScreen;
