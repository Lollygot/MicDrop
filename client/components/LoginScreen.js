import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import AccountTypeSelectionScreen from "./AccountTypeSelectionScreen";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: findUserByUsernameAndPassword mock lost in merge
    // const user = findUserByUsernameAndPassword(username, password);
    const user = true;
    if (user) {
      const token = {
        id: user.id,
        username: user.username,
        userType: user.userType,
      };

      // Navigate to map page
      navigation.navigate("Map", { token });
    } else {
      Alert.alert("Invalid login", "Incorrect username or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        // TODO: micdrop.png asset was lost in merge
        // source={require("./assets/micdrop.png")}
        source=""
        style={styles.logo}
        resizeMode="contain"
      />
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
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Create Account"
        onPress={() => navigation.navigate("AccountTypeSelectionScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  logo: { width: 200, height: 100, marginBottom: 20 },
});
