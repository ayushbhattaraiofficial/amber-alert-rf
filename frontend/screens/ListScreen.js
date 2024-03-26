import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function ListScreen({ route }) {
  const { isSolved, color } = route.params;
  const [reports, setReports] = useState([]);
  const navigation = useNavigation();

  const fetchReports = async () => {
    try {
      const reportsResponse = await fetch(
        "http://192.168.101.9:8000/api/filed"
        // "http://192.168.123.6:8000/api/filed"
      );
      const reportsData = await reportsResponse.json();
      const filteredReports = reportsData.filter(
        (report) => report.is_solved === isSolved
      );
      setReports(filteredReports);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.alertButton]}
      onPress={() => navigation.navigate("Details", { reportId: item.id, color: color, isSolved: isSolved })}
    >
      <View style={[styles.alertItem, {backgroundColor: color + "33", borderColor: color}]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.detail_container}>
          <Text style={styles.alertsLabel}>NAME:</Text>
          <Text style={styles.alertsDetail}>
            {item.first_name} {item.middle_name ? `${item.middle_name}` : ""}{" "}
            {item.last_name}
          </Text>
          <Text style={styles.alertsLabel}>LOCATION:</Text>
          <Text style={styles.alertsDetail}>
            {item.city}, {item.state}
          </Text>
          <Text style={styles.alertsLabel}>CONTACT NUMBER:</Text>
          <Text style={styles.alertsDetail}>{item.contact_number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: color }]}>
        {isSolved ? "Solved Alerts" : "Active Alerts"}
      </Text>
      <FlatList
        data={reports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: color }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.button_text}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  buttons: {
    width: 300,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 0,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 10,
    borderWidth: 3,
  },
  alertButton: {
    marginVertical: 10,
  },
});

export default ListScreen;
