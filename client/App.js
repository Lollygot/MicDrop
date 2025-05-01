import React, { useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import Pin from './pin';
import PopupForm from './pop';
import { profile as userProfile } from './profiledata';

export default function App() {
  const [pins, setPins] = useState([]);
  const [activePopupIndex, setActivePopupIndex] = useState(null);

  const handleNewPin = (newProfile) => {
    setPins((prevPins) => [...prevPins, newProfile]);
  };

  const closePopups = () => setActivePopupIndex(null);

  return (
    <TouchableWithoutFeedback onPress={closePopups}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {pins.map((pin, index) => (
            <Pin
              key={index}
              profile={pin}
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '65%',
  },
  profilePicWrapper: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1000,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 50,
    elevation: 3,
    shadowColor: '#000',
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
