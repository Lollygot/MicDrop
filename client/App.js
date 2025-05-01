import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(JSON.stringify(jsonData, null, 2)); // Pretty-print JSON
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);


  return (
    <View style={styles.container}>
      <Text>This is some test text</Text>
      <Text>{data || error}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
