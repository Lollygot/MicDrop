import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import AccountTypeSelectionScreen from "./AccountTypeSelectionScreen";
import BuskarRegistrationScreen from "./BuskarRegistrationScreen";
import VenueRegistrationScreen from "./VenueRegistrationScreen";
import BuskarHomeScreen from "./BuskarHomeScreen";
import VenueHomeScreen from "./VenueHomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AccountTypeSelection" component={AccountTypeSelectionScreen} />
        <Stack.Screen name="BuskarRegistration" component={BuskarRegistrationScreen} />
        <Stack.Screen name="VenueRegistration" component={VenueRegistrationScreen} />
        <Stack.Screen name="BuskarHome" component={BuskarHomeScreen} />
        <Stack.Screen name="VenueHome" component={VenueHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
