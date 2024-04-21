import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import AppConfig from "../AppConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification from "../services/PushNotification";
import { useNavigation } from "@react-navigation/native";
function NumberInput({ label, value, onChangeText }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!value) {
            setIsFocused(false);
        }
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
                    numeric
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    keyboardType="number-pad"
                />
            </View>
        </View>
    );
}
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
                    keyboardType={keyboardType}
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

function DateTimeInput({ label, value, onChange }) {
    const [date, setDate] = useState(new Date(value));
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    return (
        <View style={styles.inputContainer}>
            <Text
                style={[
                    styles.label,
                    isFocused || date ? styles.labelFocused : null,
                ]}
            >
                {label}
            </Text>
            <TouchableOpacity
                style={styles.inputWrapper}
                onPress={() => setShowDatePicker(true)}
            >
                <Text style={styles.input}>
                    {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
                </Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
}

function ChoiceInput({ label, value, onValueChange, pickerItems }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!value) {
            setIsFocused(false);
        }
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
                <Picker
                    selectedValue={value}
                    onValueChange={onValueChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={styles.input}
                >
                    {pickerItems &&
                        Array.isArray(pickerItems) &&
                        pickerItems.map((item, index) => (
                            <Picker.Item
                                key={index}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                </Picker>
            </View>
        </View>
    );
}

function FormScreen() {
    const [first_name, setFirstName] = useState("");
    const [middle_name, setMiddleName] = useState("");
    const [last_name, setLastName] = useState("");
    const [chosen_name, setChosenName] = useState("");
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState("");
    const [race, setRace] = useState("");
    const [date_of_birth, setDateOfBirth] = useState(new Date(15980517));
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [distinguishing_characteristics, setDistinguishingCharacteristics] =
        useState(null);
    const [missing_since, setMissingSince] = useState(new Date(15980517));
    const [missing_from, setMissingFrom] = useState(null);
    const [details_of_disappearance, setDetailsOfDisappearance] =
        useState(null);
    const [vehicle_make, setVehicleMake] = useState("");
    const [vehicle_model, setVehicleModel] = useState("");
    const [vehicle_style, setVehicleStyle] = useState("");
    const [vehicle_color, setVehicleColor] = useState("");
    const [manufacture_year, setManufactureYear] = useState(0);
    const [registration_state, setRegistrationState] = useState("");
    const [vehicle_note, setVehicleNote] = useState("");
    const [image, setImage] = useState(null);
    const [contact_number, setContactNumber] = useState(0);
    const [contact_name, setContactName] = useState("");
    const [contact_relation, setContactRelation] = useState("");
    const [is_solved, setIsSolved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUserId] = useState(0);
    const [identity, setIdentity] = useState(52);
    const [classification, setClassification] = useState("");
    const navigation = useNavigation();
    const fetchData = async () => {
        try {
            const latestResponse = await fetch(AppConfig.ID_URL);
            const latestData = await latestResponse.json();
            var llatestData = parseInt(latestData.id);
            setIdentity(llatestData);
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async () => {
        const userIdString = await AsyncStorage.getItem("user_id");
        setUserId(parseInt(userIdString));
    };
    useEffect(() => {
        getUser();
        fetchData();
        setDateOfBirth(formatDate(date_of_birth));
        setMissingSince(formatDate(missing_since));
    }, []);
    const pickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                console.log(result.uri);
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };
    const convertImageToBase64 = async (imageUri) => {
        if (!imageUri) return null;

        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const base64 = await blobToBase64(blob);
            return base64;
        } catch (error) {
            console.error("Error converting image to base64:", error);
            return null;
        }
    };

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result.split(",")[1]);
            };
            reader.readAsDataURL(blob);
        });
    };

    const formatDate = (date) => {
        // Ensure date is not null or empty
        if (!date) return "";

        // Convert date string to Date object
        const formattedDate = new Date(date);

        // Check if formattedDate is a valid date
        if (isNaN(formattedDate.getTime())) return "";

        // Format the date as YYYY-MM-DD
        const year = formattedDate.getFullYear();
        let month = formattedDate.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = formattedDate.getDate();
        day = day < 10 ? "0" + day : day;

        return `${year}-${month}-${day}`;
    };

    const handleForm = async () => {
        try {
            setLoading(true);
            console.log(date_of_birth);
            console.log(missing_since);
            const imageDataBase64 = await convertImageToBase64(image);
            const response = await fetch(AppConfig.PREDICT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identification: {
                        user,
                        first_name,
                        middle_name,
                        last_name,
                        chosen_name,
                    },
                    description: {
                        identity,
                        sex,
                        race,
                        date_of_birth,
                        age,
                        height,
                        weight,
                        distinguishing_characteristics,
                    },
                    circumstance: {
                        identity,
                        missing_since,
                        missing_from,
                        details_of_disappearance,
                    },
                    photo: {
                        identity,
                        image,
                    },
                }),
            });
            if (response.ok) {
                const predictData = await response.json();
                switch (predictData.predicted_class) {
                    case 1:
                        setClassification("Endangered Missing");
                        break;
                    case 2:
                        setClassification("Missing");
                        break;
                    case 3:
                        setClassification("Family Abduction");
                        break;
                    case 4:
                        setClassification("Non-family Abduction");
                        break;
                    case 5:
                        setClassification("Lost/Injured Missing");
                        break;
                    case 6:
                        setClassification("Endangered Runaway");
                        break;
                    case 7:
                        setClassification("Migrant");
                        break;
                    default:
                        setClassification("Missing");
                        break;
                }
                console.log(classification);
                const response_push = await fetch(AppConfig.SAVE_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        identification: {
                            user,
                            first_name,
                            middle_name,
                            last_name,
                            chosen_name,
                        },
                        description: {
                            identity,
                            sex,
                            race,
                            date_of_birth,
                            age,
                            height,
                            weight,
                            distinguishing_characteristics,
                        },
                        circumstance: {
                            identity,
                            missing_since,
                            missing_from,
                            details_of_disappearance,
                        },
                        photo: {
                            identity,
                            image: imageDataBase64,
                        },
                        vehicle: {
                            identity,
                            vehicle_make,
                            vehicle_model,
                            vehicle_style,
                            vehicle_color,
                            manufacture_year,
                            registration_state,
                            vehicle_note,
                        },
                        contact: {
                            identity,
                            contact_number,
                            contact_name,
                            contact_relation,
                        },
                        classification: {
                            identity,
                            classification,
                            is_solved,
                        },
                    }),
                });
                if (response_push.ok) {
                    ToastAndroid.show(
                        "Case Creation Sucessful",
                        ToastAndroid.SHORT
                    );
                    navigation.navigate("Home");
                }
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
                <Text style={styles.blockLabel}>DESCRIPTION:</Text>
                <ChoiceInput
                    label="Sex"
                    value={sex}
                    onValueChange={setSex}
                    pickerItems={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                    ]}
                />
                <CustomInput label="Race" value={race} onChangeText={setRace} />
                <DateTimeInput
                    label="Date of Birth"
                    value={date_of_birth}
                    onChange={setDateOfBirth}
                />
                <NumberInput
                    label="Age"
                    value={age}
                    onChangeText={(integer) => setAge(parseInt(integer, 10))}
                />
                <NumberInput
                    label="Height"
                    value={height}
                    onChangeText={(float) => setHeight(parseFloat(float, 10))}
                />
                <NumberInput
                    label="Weight"
                    value={weight}
                    onChangeText={(float) => setWeight(parseFloat(float, 10))}
                />

                <CustomInput
                    label="Distinguishing Characteristics"
                    value={distinguishing_characteristics}
                    onChangeText={setDistinguishingCharacteristics}
                />
                <Text style={styles.blockLabel}>CIRCUMSTANCE:</Text>
                <DateTimeInput
                    label="Missing Since"
                    value={missing_since}
                    onChange={setMissingSince}
                />
                <CustomInput
                    label="Missing From"
                    value={missing_from}
                    onChangeText={setMissingFrom}
                />
                <CustomInput
                    label="Details of Disappearance"
                    value={details_of_disappearance}
                    onChangeText={setDetailsOfDisappearance}
                />
                <Text style={styles.blockLabel}>IMAGE:</Text>
                <TouchableOpacity style={styles.alertItem} onPress={pickImage}>
                    {image ? (
                        <View>
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                            />
                        </View>
                    ) : (
                        <Text style={styles.imageText}>Choose Image</Text>
                    )}
                </TouchableOpacity>
                <Text style={styles.blockLabel}>VEHICLE:</Text>
                <CustomInput
                    label="Vehicle Make"
                    value={vehicle_make}
                    onChangeText={setVehicleMake}
                />
                <CustomInput
                    label="Vehicle Model"
                    value={vehicle_model}
                    onChangeText={setVehicleModel}
                />
                <CustomInput
                    label="Vehicle Style"
                    value={vehicle_style}
                    onChangeText={setVehicleStyle}
                />
                <CustomInput
                    label="Vehicle Color"
                    value={vehicle_color}
                    onChangeText={setVehicleColor}
                />
                <NumberInput
                    label="Manufacture Year"
                    value={manufacture_year}
                    onChangeText={(int) => setManufactureYear(parseInt(int))}
                />
                <CustomInput
                    label="Registration State"
                    value={registration_state}
                    onChangeText={setRegistrationState}
                />
                <CustomInput
                    label="Vehicle Note"
                    value={vehicle_note}
                    onChangeText={setVehicleNote}
                />
                <Text style={styles.blockLabel}>CONTACTS:</Text>
                <NumberInput
                    label="Contact Number"
                    value={contact_number}
                    onChangeText={(longint) =>
                        setContactNumber(parseInt(longint))
                    }
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
                    <>
                        <ActivityIndicator size={"large"} color={"blue"} />
                        <PushNotification />
                    </>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleForm}
                    >
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
    image: {
        width: 200,
        height: 200,
        borderWidth: 3,
        borderColor: "red",
        borderRadius: 10,
        backgroundColor: "#DA222233",
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
    alertItem: {},
    imageText: {
        width: 200,
        height: 200,
        borderWidth: 3,
        borderColor: "blue",
        borderRadius: 10,
        textAlign: "center",
        textAlignVertical: "center",
        color: "red",
        fontWeight: "bold",
    },
});

export default FormScreen;
