import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";

import Admin from "./components/Admin.js";
import BuskerRegistrationScreen from "./components/BuskerRegistrationScreen.js";
import LoginScreen from "./components/LoginScreen.js";
import Map from "./components/Map.js";
import VenueRegistrationScreen from "./components/VenueRegistrationScreen.js";
import PayPalWebView from "./components/PayPal.js";
import AccountTypeSelectionScreen from "./components/AccountTypeSelectionScreen.js";

const Stack = createNativeStackNavigator();
export default function App() {
  const [userType, setUserType] = useState("");

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Map">
          <Stack.Screen name="Map">
            {(props) => <Map {...props} userType={userType} />}
          </Stack.Screen>
          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setUserType={setUserType} />}
          </Stack.Screen>
          <Stack.Screen
            name="BuskerRegistration"
            component={BuskerRegistrationScreen}
          />
          <Stack.Screen
            name="VenueRegistration"
            component={VenueRegistrationScreen}
          />
          <Stack.Screen name="PayPal Buttons" component={PayPalWebView} />
          <Stack.Screen
            name="AccountTypeSelection"
            component={AccountTypeSelectionScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
