import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import AppConfig from "../AppConfig";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function HomeScreen() {
    const [latestData, setLatestData] = useState({});
    const [token, setToken] = useState({});
    const [isSuperUser, setSuperUser] = useState(false);
    const [isStaff, setStaff] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigation = useNavigation();
    const fetchData = async () => {
        try {
            const latestResponse = await fetch(AppConfig.LATEST_URL);
            const latestData = await latestResponse.json();
            setLatestData(latestData);
        } catch (error) {
            console.log(error);
        }
    };
    const checkTokenAndPrivileges = async () => {
        const authToken = await AsyncStorage.getItem("authToken");
        setToken(authToken || null);
        if (authToken) {
            const isStaff = (await AsyncStorage.getItem("isStaff")) === "true";
            setStaff(isStaff);
            const isSuperUser =
                (await AsyncStorage.getItem("isSuperUser")) === "true";
            setSuperUser(isSuperUser);
            const firstName = await AsyncStorage.getItem("user_first_name");
            setFirstName(firstName);
            const lastName = await AsyncStorage.getItem("user_last_name");
            setLastName(lastName);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            fetchData();
            checkTokenAndPrivileges();
        }, [])
    );

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("authToken");
            await AsyncStorage.removeItem("isStaff");
            await AsyncStorage.removeItem("isSuperUser");

            setToken(null);
            setStaff(false);
            setSuperUser(false);
        } catch (error) {
            console.log("Error during logout:", error);
        }
    };
    return (
        <View style={styles.container}>
            {latestData ? (
                <>
                    <Image
                        source={require("../assets/logo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.heading}>WELCOME TO AMBER ALERT</Text>
                    {token ? (
                        <Text style={styles.description}>
                            Welcome Back,{" "}
                            <Text style={{ fontWeight: "bold" }}>
                                {firstName} {lastName}
                            </Text>{" "}
                            !
                        </Text>
                    ) : (
                        <Text style={styles.description}>
                            Hello,{" "}
                            <Text style={{ fontWeight: "bold" }}>
                                Guest User
                            </Text>{" "}
                            !
                        </Text>
                    )}
                    <Text style={styles.heading}>LATEST ALERT</Text>
                    <TouchableOpacity
                        style={styles.alertButton}
                        onPress={() =>
                            navigation.navigate("Details", {
                                reportId: latestData.id,
                                isSolved: false,
                                color: "#DA2222",
                            })
                        }
                    >
                        <View style={styles.alertItem}>
                            <Image
                                source={{ uri: latestData.image }}
                                style={styles.image}
                            />
                            <View style={styles.detail_container}>
                                <Text style={styles.alertsLabel}>NAME:</Text>
                                <Text style={styles.alertsDetail}>
                                    {latestData.first_name}{" "}
                                    {latestData.middle_name
                                        ? `${latestData.middle_name}`
                                        : ""}{" "}
                                    {latestData.last_name}
                                </Text>
                                <Text style={styles.alertsLabel}>
                                    LOCATION:
                                </Text>
                                <Text style={styles.alertsDetail}>
                                    {latestData.location}
                                </Text>
                                <Text style={styles.alertsLabel}>
                                    CONTACT NUMBER:
                                </Text>
                                <Text style={styles.alertsDetail}>
                                    {latestData.contact_number}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttons, styles.button_active]}
                        onPress={() =>
                            navigation.navigate("List", {
                                isSolved: false,
                                color: "#DA2222",
                            })
                        }
                    >
                        <Text style={styles.button_text}>ACTIVE ALERTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttons, styles.button_solved]}
                        onPress={() =>
                            navigation.navigate("List", {
                                isSolved: true,
                                color: "#0FCB5A",
                            })
                        }
                    >
                        <Text style={styles.button_text}>SOLVED ALERTS</Text>
                    </TouchableOpacity>
                    {token ? (
                        <>
                            {isSuperUser ? (
                                <>
                                    <TouchableOpacity
                                        style={[
                                            styles.buttons,
                                            styles.button_login,
                                        ]}
                                        onPress={() =>
                                            navigation.navigate("Registration")
                                        }
                                    >
                                        <Text style={styles.button_text}>
                                            CREATE USER
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.buttons,
                                            styles.button_login,
                                        ]}
                                        onPress={() =>
                                            navigation.navigate("Form")
                                        }
                                    >
                                        <Text style={styles.button_text}>
                                            CREATE REPORT
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <TouchableOpacity
                                    style={[
                                        styles.buttons,
                                        styles.button_login,
                                    ]}
                                    onPress={() => navigation.navigate("Form")}
                                >
                                    <Text style={styles.button_text}>
                                        CREATE REPORT
                                    </Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                style={[styles.buttons, styles.button_login]}
                                onPress={handleLogout}
                            >
                                <Text style={styles.button_text}>LOGOUT</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={[styles.buttons, styles.button_login]}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.button_text}>LOGIN</Text>
                        </TouchableOpacity>
                    )}
                </>
            ) : (
                ""
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        padding: 20,
    },
    logo: {
        width: 200,
        height: 100,
        marginTop: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    buttons: {
        backgroundColor: "red",
        width: 300,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 0,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    button_active: {
        backgroundColor: "#DA2222",
    },
    button_solved: {
        backgroundColor: "#0FCB5A",
    },
    button_login: {
        backgroundColor: "#0500ff90",
    },
    button_text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    image: {
        width: 150,
        height: 150,
        marginRight: 10,
        borderRadius: 10,
    },
    alertsDetail: {
        fontSize: 14,
        fontWeight: "normal",
        textAlign: "justify",
    },
    alertsLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    alertItem: {
        flexDirection: "row",
        padding: 10,
        borderWidth: 3,
        borderColor: "red",
        borderRadius: 10,
        backgroundColor: "#DA222233",
    },
    alertButton: {
        marginVertical: 10,
    },
});

export default HomeScreen;
