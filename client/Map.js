import React, { useEffect, useState } from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import Admin from './Admin';
import { Button } from 'react-native';


function createMarker(latitude, longitude) {

    return { latitude: latitude, longitude: longitude }
}

export default function Map({ navigation }) {

    const currentLocation = createMarker(53.41703705782808, -6.477156594752852)
    const nextlocation = createMarker(54.41703705793800, -6.477156594752852)

    return (

        <View style={styles.container}>
            <Button
                title="Admin"
                onPress={() =>
                    navigation.navigate("Admin")
                }
            />
            <MapView style={styles.map}
                /*showsUserLocation={true} onUserLocationChange={locationChangedResult => console.log(locationChangedResult.*/
                initialRegion=
                {
                    {
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.009,
                    }
                }
                userLocationCalloutEnabled={true}
            >
                <Marker
                    coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
                    title={"JIMI"}
                    description={"the greatest"}
                />
                <Callout tooltip={true}></Callout>
                <Marker
                    coordinate={{ latitude: nextlocation.latitude, longitude: nextlocation.longitude }}
                    title={"Hammet"}
                    description={"shreding around"}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',  // center horizontally
        justifyContent: 'center', // center vertically
    },
    map: {
        width: '100%',
        height: '90%',
    },
});
