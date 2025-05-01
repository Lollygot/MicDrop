import React from 'react';
import MapView from 'react-native-maps';
import WebView from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>' }}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});


