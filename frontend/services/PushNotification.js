import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AppConfig from "../AppConfig";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function PushNotification() {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                }
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         fetchDataAndScheduleNotification();
    //     }, 2000);
    //     return () => clearInterval(interval);
    // }, []);
    useEffect(() => {
        schedulePushNotification();
    });

    async function fetchDataAndScheduleNotification() {
        try {
            const latestResponse = await fetch(AppConfig.LATEST_URL);
            const latestData = await latestResponse.json();
            if (latestData) {
                schedulePushNotification(latestData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function schedulePushNotification(latestData) {
        await Notifications.scheduleNotificationAsync({
            content: {
                // title: `Person Missing`,
                // body: `Name: ${latestData.first_name} ${latestData.last_name}`,
                // data: { data: "goes here" },
                title: "Missing Person Alert",
                body: "New case has been filed!!!!",
            },
            trigger: { seconds: 1 },
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
                return;
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId: "your-project-id",
                })
            ).data;
            console.log(token);
        } else {
            alert("Must use physical device for Push Notifications");
        }

        return token;
    }

    return null;
}
