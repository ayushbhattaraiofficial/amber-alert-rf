import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";

function HomeScreen() {
  const [latestData, setLatestData] = useState({});
  const navigation = useNavigation();
  const fetchData = async () => {
    try {
      const latestResponse = await fetch(
        "http://192.168.101.9:8000/api/latest"
      );
      const latestData = await latestResponse.json();
      setLatestData(latestData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
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
          <Text style={styles.description}>
            An app dedicated to missing persons and their recovery.
          </Text>
          <Text style={styles.heading}>LATEST ALERT</Text>
          <TouchableOpacity
            style={styles.alertButton}
            onPress={() => navigation.navigate("")}
          >
            <View style={styles.alertItem}>
              <Image source={{ uri: latestData.image }} style={styles.image} />
              <View style={styles.detail_container}>
                <Text style={styles.alertsLabel}>NAME:</Text>
                <Text style={styles.alertsDetail}>
                  {latestData.first_name}{" "}
                  {latestData.middle_name ? `${latestData.middle_name}` : ""}{" "}
                  {latestData.last_name}
                </Text>
                <Text style={styles.alertsLabel}>LOCATION:</Text>
                <Text style={styles.alertsDetail}>
                  {latestData.city}, {latestData.state}
                </Text>
                <Text style={styles.alertsLabel}>CONTACT NUMBER:</Text>
                <Text style={styles.alertsDetail}>
                  {latestData.contact_number}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttons, styles.button_active]}
            onPress={() => navigation.navigate("")}
          >
            <Text style={styles.button_text}>ACTIVE ALERTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttons, styles.button_solved]}
            onPress={() => navigation.navigate("")}
          >
            <Text style={styles.button_text}>SOLVED ALERTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttons, styles.button_login]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.button_text}>LOGIN</Text>
          </TouchableOpacity>
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
