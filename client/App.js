import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native';




export default function App() {

  const [coordinate, setCoordinate] = useState({});

  const currentLocation = { latitude: 53.41703705782808, longitude: -6.477156594752852 }



  return (

    <View style={styles.container}>
      <MapView style={styles.map}
        /*showsUserLocation={true} onUserLocationChange={locationChangedResult => console.log(locationChangedResult.*/
        initialRegion=
        {
          {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }>
        <Marker
          coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
          title={"JIMI"}
          description={"the greatest"}
        //image={'./assets/music_note_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'}
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
    height: '100%',
  },
});
