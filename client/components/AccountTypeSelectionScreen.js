import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function AccountTypeSelectionScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Which account would you like to create?</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Busker"
          onPress={() => navigation.navigate("BuskerRegistration")}
        />
        <Button
          title="Venue"
          onPress={() => navigation.navigate("VenueRegistration")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  buttonContainer: { gap: 10 },
});
