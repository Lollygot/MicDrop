import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

import { isStrongPassword, isValidEmail } from "../utils/validation.js";

export default function VenueRegistrationScreen({ setUserType }) {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [venueName, setVenueName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    // Email and password validation
    if (
      !username ||
      !password ||
      !venueName ||
      !streetAddress ||
      !city ||
      !postCode ||
      !email
    ) {
      Alert.alert("Missing fields", "Please fill in all the required fields.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (!isStrongPassword(password)) {
      Alert.alert(
        "Weak password",
        "Password must be at least 8 characters long, with at least 2 numbers and 1 special character."
      );
      return;
    }

    // const venueData = {
    //   userType: "VENUE",
    //   username,
    //   password,
    //   venueName,
    //   streetAddress,
    //   city,
    //   postCode,
    //   email,
    // };

    // TODO: addProfile mock was lost in merge
    // Add venue user to profile data
    // addProfile(venueData);

    setUserType("VENUE");

    // Navigate back to map screen
    navigation.navigate("Map");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Venue Name"
        style={styles.input}
        value={venueName}
        onChangeText={setVenueName}
      />
      <TextInput
        placeholder="Street Address"
        style={styles.input}
        value={streetAddress}
        onChangeText={setStreetAddress}
      />
      <TextInput
        placeholder="City"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        placeholder="Post Code"
        style={styles.input}
        value={postCode}
        onChangeText={setPostCode}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
});
