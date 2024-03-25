import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

function Navigation() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default Navigation;