import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Admin from "./components/Admin.js";
import BuskerRegistrationScreen from "./components/BuskerRegistrationScreen.js";
import LoginScreen from "./components/LoginScreen.js";
import Map from "./components/Map.js";
import VenueRegistrationScreen from "./components/VenueRegistrationScreen.js";
import PayPalWebView from "./components/PayPal.js";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Map">
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="BuskerRegistration"
            component={BuskerRegistrationScreen}
          />
          <Stack.Screen
            name="VenueRegistration"
            component={VenueRegistrationScreen}
          />
          <Stack.Screen
            name="PayPal Buttons"
            component={PayPalWebView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
