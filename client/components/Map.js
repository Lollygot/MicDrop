import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import Pin from "./Pin.js";
import PopupForm from "./Pop.js";

const userProfile = {
  profileType: "venue", // or "busker"
  profileName: "The Blue Note",
  profileIcon: "https://i.pravatar.cc/100?u=bluenote",
};

function createMarker(latitude, longitude) {
  return { latitude: latitude, longitude: longitude };
}

export default function Map() {
  const navigation = useNavigation();

  const currentLocation = createMarker(53.41703705782808, -6.477156594752852);
  const nextlocation = createMarker(54.417037057938, -6.477156594752852);

  const [pins, setPins] = useState([]);
  const [activePopupIndex, setActivePopupIndex] = useState(null);

  const handleNewPin = (newData) => {
    setPins([...pins, newData]);
  };

  const closePopups = () => setActivePopupIndex(null);

  return (
    <View style={styles.container}>
      <Button title="Admin" onPress={() => navigation.navigate("Admin")} />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <MapView
        style={styles.map}
        /*showsUserLocation={true} onUserLocationChange={locationChangedResult => console.log(locationChangedResult.*/
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        userLocationCalloutEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          title={"JIMI"}
          description={"the greatest"}
        />
        <Callout tooltip={true}></Callout>
        <Marker
          coordinate={{
            latitude: nextlocation.latitude,
            longitude: nextlocation.longitude,
          }}
          title={"Hammet"}
          description={"shreding around"}
        />
        <Pressable onPress={closePopups}>
          <View style={{ flex: 1 }}>
            <View style={styles.alexContainer}>
              {pins.map((pin, index) => (
                <Pin
                  key={index}
                  data={pin}
                  isActive={activePopupIndex === index}
                  onPress={() =>
                    setActivePopupIndex(activePopupIndex === index ? null : index)
                  }
                />
              ))}
              <PopupForm onSubmit={handleNewPin} />
            </View>

            <View style={styles.profilePicWrapper}>
              <Image
                source={{ uri: userProfile.profileIcon }}
                style={styles.profilePic}
              />
            </View>
          </View>
        </Pressable>
      </MapView>


      {/* TODO: FROM ALEX'S CODE - has the logic from for creating new pins with a pop-up form and has a placeholder profile icon that has no interactivity - need to properly integrate as the buttons are currently hidden by the map - likely some CSS z-index issues */}
      {/* TODO: Link up the profile button/image to redirect to the registration/login/profile page */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // center horizontally
    justifyContent: "center", // center vertically
  },
  map: {
    width: "100%",
    height: "90%",
    zIndex: 10
  },
  alexContainer: {
    position: 'absolute',
    top: 700,
    right: 5,
    zIndex: 1000,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 50,
    elevation: 3,
  },
  profilePicWrapper: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1000,
    backgroundColor: "white",
    padding: 2,
    borderRadius: 50,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
