import React from "react";
import { View, StyleSheet } from "react-native";
import Pin from "./pin";
import { profile } from "./profiledata"; // Import active profile

export default function App() {
  return (
    <View style={styles.container}>
      <Pin profile={profile} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",  // push content to the bottom
      alignItems: "center",
      paddingBottom: "65%",        // ~3/4 down the screen
    },
});
