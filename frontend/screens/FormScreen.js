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

function CustomInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}) {
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
        style={[styles.label, isFocused || value ? styles.labelFocused : null]}
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
          keyboardType={keyboardType} // Include keyboardType prop here
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

function BiologicalSexInput({ label, value, onValueChange }) {
  return (
    <View>
      <Text>{label}</Text>
      <Picker selectedValue={value} onValueChange={onValueChange}>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Others" value="Others" />
        <Picker.Item label="Unsure" value="Unsure" />
        <Picker.Item label="Not Provided" value="Not Provided" />
      </Picker>
    </View>
  );
}

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
  const [circumstances_note, setCircumstancesNote] = useState(null);
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
        "http://10.10.35.11:8000/api/create",
        // "http://192.168.101.9:8000/api/create",
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
          is_solved,
        }),
      });
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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.headings}>Add New Case</Text>
        <Text style={styles.blockLabel}>IDENTIFICATION:</Text>
        <CustomInput
          label="First Name"
          value={first_name}
          onChangeText={setFirstName}
        />
        <CustomInput
          label="Middle Name"
          value={middle_name}
          onChangeText={setMiddleName}
        />
        <CustomInput
          label="Last Name"
          value={last_name}
          onChangeText={setLastName}
        />
        <CustomInput
          label="Chosen Name"
          value={chosen_name}
          onChangeText={setChosenName}
        />
        <CustomInput
          label="age"
          value={age}
          onChangeText={(text) => setAge(parseInt(text, 10))}
          keyboardType="numeric"
        />
        <Text style={styles.blockLabel}>DESCRIPTION:</Text>
        <CustomInput
          label="Biological Sex"
          value={biological_sex}
          onChangeText={setBiologicalSex}
        />
        <CustomInput
          label="Race/Ethnicity"
          value={race_ethnicity}
          onChangeText={setRaceEthnicity}
        />
        <CustomInput
          label="Height"
          value={height}
          onChangeText={(text) => setHeight(parseFloat(text, 10))}
          keyboardType="numeric"
        />
        <CustomInput
          label="Weight"
          value={weight}
          onChangeText={(text) => setWeight(parseFloat(text, 10))}
          keyboardType="numeric"
        />
        <Text style={styles.blockLabel}>CIRCUMSTANCES:</Text>
        <CustomInput
          label="Case Date"
          value={case_date}
          onChangeText={setCaseDate}
        />
        <CustomInput
          label="Last Contact Date"
          value={last_contact_date}
          onChangeText={setLastContactDate}
        />
        <CustomInput
          label="Notes"
          value={circumstances_note}
          onChangeText={setCircumstancesNote}
        />
        <Text style={styles.blockLabel}>LOCATION:</Text>
        <CustomInput label="City" value={city} onChangeText={setCity} />
        <CustomInput label="State" value={state} onChangeText={setState} />
        <Text style={styles.blockLabel}>PHYSICAL DESCRIPTION:</Text>
        <CustomInput
          label="Hair Color"
          value={hair_color}
          onChangeText={setHairColor}
        />
        <CustomInput
          label="Hair Description"
          value={hair_description}
          onChangeText={setHairDescription}
        />
        <CustomInput
          label="Eye Color"
          value={eye_color}
          onChangeText={setEyeColor}
        />
        <CustomInput
          label="Eye Description"
          value={eye_description}
          onChangeText={setEyeDescription}
        />
        <CustomInput
          label="Distinctive Physical Features"
          value={distinctive_physical_features}
          onChangeText={setDistinctivePhysicalFeatures}
        />
        <Text style={styles.blockLabel}>CLOTHING:</Text>
        <CustomInput
          label="Description"
          value={clothing_description}
          onChangeText={setClothingDescription}
        />
        <Text style={styles.blockLabel}>VEHICLE:</Text>
        <CustomInput label="make" value={make} onChangeText={setMake} />
        <CustomInput label="model" value={model} onChangeText={setModel} />
        <CustomInput label="style" value={style} onChangeText={setStyle} />
        <CustomInput label="color" value={color} onChangeText={setColor} />
        <CustomInput
          label="year"
          value={year}
          onChangeText={(text) => setYear(parseInt(text, 10))}
          keyboardType="numeric"
        />
        <CustomInput
          label="Registration State"
          value={registration_state}
          onChangeText={setRegistrationState}
        />
        <CustomInput
          label="Registration Number"
          value={registration_number}
          onChangeText={setRegistrationNumber}
        />
        <CustomInput
          label="Note"
          value={vehicle_note}
          onChangeText={setVehicleNote}
        />
        <Text style={styles.blockLabel}>IMAGE:</Text>
        <CustomInput label="Image" value={image} onChangeText={setImage} />
        <Text style={styles.blockLabel}>CONTACTS:</Text>
        <CustomInput
          label="Contact Number"
          value={contact_number}
          onChangeText={setContactNumber}
        />
        <CustomInput
          label="Contact Name"
          value={contact_name}
          onChangeText={setContactName}
        />
        <CustomInput
          label="Contact Relation"
          value={contact_relation}
          onChangeText={setContactRelation}
        />
        <Text style={styles.blockLabel}>CLASSIFICATION:</Text>
        <BooleanInput
          label="Is Solved"
          value={is_solved}
          onValueChange={setIsSolved}
        />
        {loading ? (
          <ActivityIndicator size={"large"} color={"blue"} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleForm}>
            <Text style={styles.buttonText}>Submit Form</Text>
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
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 20,
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
  blockLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "blue",
  },
  button: {
    width: "80%",
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default FormScreen;
