import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ListScreen from "./screens/ListScreen";

const Stack = createStackNavigator();

function Navigation() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="List" component={ListScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default Navigation;