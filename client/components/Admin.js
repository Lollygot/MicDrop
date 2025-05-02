import React, { useEffect, useState } from "react";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import WebView from "react-native-webview";
import PayPalWebView from "./PayPal";



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
    const url = "https://www.sandbox.paypal.com/bizsignup/partner/entry?referralToken=MjcyNjQ4ZTItOWE0NS0[…]jTStmYXdYMVV4blpoRmFyczVVWkE0aWl1clBQRHd0dnRLZmFtYz12Mg==";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <View>
      <Button title="Activate PayPal" onPress={handlePress} />
      <Button title="PayPal Buttons" onPress={() => navigation.navigate("PayPal")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // center horizontally
    justifyContent: "center", // center vertically
  },
});
