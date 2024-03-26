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

function FormScreen() {
  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [last_name, setLastName] = useState("");
  const [chosen_name, setChosenName] = useState("");
  const [age, setAge] = useState(0);
  const [biological_sex, setBiologicalSex] = useState("");
  const [race_ethnicity, setRaceEthnicity] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [case_date, setCaseDate] = useState("");
  const [last_contact_date, setLastContactDate] = useState(null);
  const [circumstances_note, setCircumstances_note] = useState(null);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [hair_color, setHairColor] = useState("");
  const [hair_description, setHairDescription] = useState("");
  const [eye_color, setEyeColor] = useState("");
  const [eye_description, setEyeDescription] = useState("");
  const [distinctive_physical_features, setDistinctivePhysicalFeatures] =
    useState("");
  const [clothing_description, setClothingDescription] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState(0);
  const [registration_state, setRegistrationState] = useState("");
  const [registration_number, setRegistrationNumber] = useState("");
  const [vehicle_note, setVehicleNote] = useState("");
  const [image, setImage] = useState(null);
  const [contact_number, setContactNumber] = useState(0);
  const [contact_name, setContactName] = useState("");
  const [contact_relation, setContactRelation] = useState("");
  const [predicted_class, setPredictedClass] = useState("");
  const [is_solved, setIsSolved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForm = async () => {
    try {
        setLoading(true);
        const response = await fetch(
            "http://192.168.101.9:8000/api/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name,
                    middle_name,
                    last_name,
                    chosen_name,
                    age,
                    biological_sex,
                    race_ethnicity,
                    height,
                    weight,
                    case_date,
                    last_contact_date,
                    circumstances_note,
                    city,
                    state,
                    hair_color,
                    hair_description,
                    eye_color,
                    eye_description,
                    distinctive_physical_features,
                    clothing_description,
                    make,
                    model,
                    style,
                    color,
                    year,
                    registration_state,
                    registration_number,
                    vehicle_note,
                    image,
                    contact_number,
                    contact_name,
                    contact_relation,
                    predicted_class,
                    is_solved
                }),
            }
        );
        if (response.ok) {
            navigation.navigate("Home");
        } else {
            ToastAndroid.show("Case Creation Failed", ToastAndroid.SHORT);
        }
    } catch (error) {
        console.error("Error during case creation", error);
    } finally {
        setLoading(false);
    }
  };


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

export default FormScreen;
