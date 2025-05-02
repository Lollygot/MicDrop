import React, { useEffect, useState } from "react";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import WebView from "react-native-webview";

export default function Admin() {
  const handlePress = async () => {
    const url = "https://www.google.com";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return <Button title="Open Google" onPress={handlePress} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // center horizontally
    justifyContent: "center", // center vertically
  },
});
