import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from "@react-native-community/datetimepicker";

const MyDatePicker = () => {
    const [myDate, setMyDate] = useState(new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || myDate;
        setShowDatePicker(false);
        setMyDate(currentDate);
    };

    useEffect(() => {
        console.log(`date is: ${myDate}`);
    }, [myDate]);

    const sendDateRequest = async () => {
        try {
            const response = await axios.post(
                "http://192.168.101.16:8000/get-date",
                {
                    date: myDate,
                }
            );
            // console.log('response', response)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <Button
                title="show date picker"
                onPress={() => setShowDatePicker(true)}
            ></Button>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={myDate}
                    onChange={handleDateChange}
                />
            )}

            <View style={{ marginVertical: 10 }}></View>

            <Button title="Send Date" onPress={sendDateRequest}></Button>
        </View>
    );
};

export default MyDatePicker;
