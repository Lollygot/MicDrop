import React, { useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { profile as userProfile } from './profiledata';

export default function PopupForm({ onSubmit }) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [donateUrl, setDonateUrl] = useState('');
  const [artistPlaying, setArtistPlaying] = useState('');
  const [doors, setDoors] = useState('');
  const [address, setAddress] = useState('');
  const [ticketLink, setTicketLink] = useState('');

  const isBusker = userProfile.profileType === 'busker';
  const isBar = userProfile.profileType === 'bar';

  const resetForm = () => {
    setName('');
    setAbout('');
    setDonateUrl('');
    setArtistPlaying('');
    setDoors('');
    setAddress('');
    setTicketLink('');
  };

  const handleSend = () => {
    const newProfile = {
      profileType: userProfile.profileType,
      profileName: name,
      profileIcon: 'https://i.pravatar.cc/100?u=' + name,
      about,
      donateUrl,
      artistPlaying,
      doors,
      address,
      ticketLink,
      trackName: '',
      trackArtist: '',
      spotifyTrackUrl: '',
      trackCover: '',
      bannerImage: '',
      price: '',
    };

    onSubmit?.(newProfile);
    resetForm();
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => { setVisible(false); Keyboard.dismiss(); }}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.popup}>
                <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />

                {isBusker && (
                  <>
                    <TextInput placeholder="About" value={about} onChangeText={setAbout} style={styles.input} />
                    <TextInput placeholder="Donate URL" value={donateUrl} onChangeText={setDonateUrl} style={styles.input} />
                  </>
                )}

                {isBar && (
                  <>
                    <TextInput placeholder="Artist Playing" value={artistPlaying} onChangeText={setArtistPlaying} style={styles.input} />
                    <TextInput placeholder="Doors Open" value={doors} onChangeText={setDoors} style={styles.input} />
                    <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
                    <TextInput placeholder="Ticket Link" value={ticketLink} onChangeText={setTicketLink} style={styles.input} />
                  </>
                )}

                <Button title="Send" onPress={handleSend} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: 'green',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
  fabText: {
    color: 'white',
    fontSize: 32,
    lineHeight: 32,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
