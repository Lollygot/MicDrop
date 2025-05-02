import React, { useEffect, useState } from "react";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import WebView from "react-native-webview";



export default function Admin() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData('https://pokeapi.co/api/v2/pokemon/ditto');
      setData(result);
    };

    getData();
  }, []);

  const handlePress = async () => {
    const url = "data.url";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return <Button title="Activate PayPal" onPress={handlePress} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // center horizontally
    justifyContent: "center", // center vertically
  },
});
