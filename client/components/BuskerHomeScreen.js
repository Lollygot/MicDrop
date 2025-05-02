import React from "react";
import { View, Text, StyleSheet } from "react-native";

// TODO: double check with Hunain what screen this was meant to be for

export default function BuskarHomeScreen({ route }) {
  const { token } = route.params;

  return (
    <View style={styles.container}>
      <Text>Welcome Buskar: {token.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
