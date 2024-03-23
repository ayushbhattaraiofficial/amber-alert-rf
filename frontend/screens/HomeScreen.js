import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Amber Alert</Text>
      <Text style={styles.description}>
        An app dedicated to missing persons cases.
      </Text>
      <TouchableOpacity
        style={[styles.button, styles.button_active]}
        onPress={() => {
          navigation.navigate();
        }}
      >
        <Text style={styles.button_text}>Active Cases</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.button_solved]}
        onPress={() => {
          navigation.navigate();
        }}
      >
        <Text style={styles.button_text}>Solved Cases</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.button_login]}
        onPress={() => {
          navigation.navigate();
        }}
      >
        <Text style={styles.button_text}>Login</Text>
      </TouchableOpacity>
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
  button: {
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
    backgroundColor: "red",
  },
  button_solved: {
    backgroundColor: "green",
  },
  button_login: {
    backgroundColor: "blue",
  },
  button_text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
