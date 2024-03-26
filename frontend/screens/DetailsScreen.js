import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DetailsScreen({ route }) {
  const { reportId, color, isSolved } = route.params;
  const [report, setReport] = useState({});
  const [token, setToken] = useState({});
  const [isSuperUser, setSuperUser] = useState(false);
  const [isStaff, setStaff] = useState(false);
  const navigation = useNavigation();

  const fetchReport = async () => {
    try {
      const reportResponse = await fetch(
        `http://192.168.101.9:8000/api/details/${reportId}`
        // `http://192.168.123.6:8000/api/details/${reportId}`
      );
      const reportData = await reportResponse.json();
      setReport(reportData);
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
    }
  };

  useEffect(() => {
    fetchReport();
    checkTokenAndPrivileges();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: color }]}>
        {isSolved ? "Alert Details" : "Alert Details"}
      </Text>
      <View
        style={[
          styles.alertItem,
          { backgroundColor: color + "33", borderColor: color },
        ]}
      >
        <Image source={{ uri: report.image }} style={styles.image} />
        <View style={styles.detail_container}>
          <Text
            style={[
              styles.alertsDetail,
              { textAlign: "center", fontWeight: "bold", fontSize: 24 },
            ]}
          >
            {report.first_name}{" "}
            {report.middle_name ? `${report.middle_name}` : ""}{" "}
            {report.last_name}{" "}
            {report.chosen_name ? "(" + `${report.chosen_name}` + ")" : ""}
          </Text>
          <View style={styles.detail_row}>
            <Text style={styles.alertsLabel}>LOCATION</Text>
            <Text style={styles.alertsLabel}>CONTACT </Text>
          </View>
          <View style={styles.detail_row}>
            <Text style={styles.alertsDetail}>
              {report.city}, {report.state}
            </Text>
            <Text style={styles.alertsDetail}>{report.contact_number}</Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={[
          styles.scrollableContent,
          { backgroundColor: color + "33", borderColor: color },
        ]}
      >
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>IDENTIFICATION:</Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>Age:</Text>
          <Text style={styles.alertsDetail}>{report.age} yrs</Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>Biological Sex:</Text>
          <Text style={styles.alertsDetail}>{report.biological_sex}</Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>Race/Ethnicity:</Text>
          <Text style={styles.alertsDetail}>{report.race_ethnicity}</Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>PHYSICAL DESCRIPTION:</Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>Height:</Text>
          <Text style={styles.alertsDetail}>{report.height} cm</Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>Weight:</Text>
          <Text style={styles.alertsDetail}>{report.weight} kg</Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>Hair Color:</Text>
          <Text style={styles.alertsDetail}>{report.hair_color}</Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>Hair Description:</Text>
          <Text style={styles.alertsDetail}>{report.hair_description}</Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>Eye Color:</Text>
          <Text style={styles.alertsDetail}>{report.eye_color}</Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>Eye Description:</Text>
          <Text style={styles.alertsDetail}>{report.eye_description}</Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>Distinctive Feature:</Text>
          <Text style={styles.alertsDetail}>
            {report.distinctive_physical_features}
          </Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>CLOTHING:</Text>
        </View>
        <View style={styles.scrollableText}>
          <Text style={styles.alertsLabel}>Clothing Description:</Text>
          <Text style={styles.alertsDetail}>{report.clothing_description}</Text>
        </View>
        {token ? (
          <>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>CIRCUMSTANCES:</Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Last Contact:</Text>
              <Text style={styles.alertsDetail}>
                {report.last_contact_date}
              </Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Case Created:</Text>
              <Text style={styles.alertsDetail}>{report.case_date}</Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Notes:</Text>
              <Text style={styles.alertsDetail}>
                {report.circumstances_note}
              </Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>VEHICLE DETAILS:</Text>
            </View>

            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Make:</Text>
              <Text style={styles.alertsDetail}>{report.vehicle_make}</Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Model:</Text>
              <Text style={styles.alertsDetail}>{report.vehicle_model}</Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Style:</Text>
              <Text style={styles.alertsDetail}>{report.vehicle_style}</Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Color:</Text>
              <Text style={styles.alertsDetail}>{report.vehicle_color}</Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Year:</Text>
              <Text style={styles.alertsDetail}>{report.vehicle_year}</Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Registration State:</Text>
              <Text style={styles.alertsDetail}>
                {report.vehicle_registration_state}
              </Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Registration Number:</Text>
              <Text style={styles.alertsDetail}>
                {report.vehicle_registration_number}
              </Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Note:</Text>
              <Text style={styles.alertsDetail}>{report.vehicle_note}</Text>
            </View>

            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>CONTACT DETAILS:</Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Name:</Text>
              <Text style={styles.alertsDetail}>{report.contact_name}</Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Relation:</Text>
              <Text style={styles.alertsDetail}>{report.contact_relation}</Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>ADDITIONAL INFORMATION:</Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Predicted Class:</Text>
              <Text style={styles.alertsDetail}>{report.predicted_class}</Text>
            </View>
            <View style={styles.scrollableText}>
              <Text style={styles.alertsLabel}>Solved:</Text>
              <Text style={styles.alertsDetail}>
                {report.is_solved ? "Yes" : "No"}
              </Text>
            </View>
            {isSuperUser ? (
              <>
                <View style={styles.scrollableText}>
                  <Text style={styles.alertsLabel}>Reported By:</Text>
                  <Text style={styles.alertsDetail}>{report.reported_by}</Text>
                </View>
              </>
            ) : null}
          </>
        ) : null}
      </ScrollView>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: color }]}
        onPress={() =>
          navigation.navigate("List", { color: color, isSolved: isSolved })
        }
      >
        <Text style={styles.button_text}>Back</Text>
      </TouchableOpacity>
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
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: 350,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
    resizeMode: "contain",
  },
  alertsDetail: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "justify",
  },
  alertsLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  alertItem: {
    flexDirection: "column",
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    width: 388,
  },
  alertButton: {
    marginVertical: 10,
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
  detail_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  scrollableContent: {
    flex: 1,
    position: "relative",
    marginTop: 20,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 3,
    width: 388,
  },
  scrollableText: {
    maxWidth: 380,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginBottom: 10,
    flexWrap: "wrap",
  },
});

export default DetailsScreen;
