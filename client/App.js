import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Admin from "./components/Admin.js";
import Map from ".components/Map.js";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Map">
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Admin" component={Admin} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
