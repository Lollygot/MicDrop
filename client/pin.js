import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";

export default function Pin({ profile, isActive, onPress }) {
  // const [showPopup, setShowPopup] = useState(false);

  // const handlePress = () => setShowPopup(!showPopup);
  const openLink = (url) => url && Linking.openURL(url);

  const pinColors = {
    busker: "green",
    bar: "purple",
  };

  const pinColor = pinColors[profile.profileType] || "yellow";
  const pinUrl = `https://maps.google.com/mapfiles/ms/icons/${pinColor}-dot.png`;

  const Header = () => (
    <>
      <Image source={{ uri: profile.profileIcon }} style={styles.avatar} />
      <Text style={styles.name}>{profile.profileName}</Text>
    </>
  );

  const SpotifyCard = () => (
    <View style={styles.spotifyCard}>
      <View style={styles.spotifyTextBlock}>
        <Text numberOfLines={1} style={styles.trackRow}>
          <Text style={styles.trackName}>{profile.trackName}</Text>
          <Text style={styles.separator}> • </Text>
          <Text style={styles.artistName}>{profile.trackArtist}</Text>
        </Text>
        <View style={styles.previewWrapper}>
          <Text
            style={styles.playPreview}
            onPress={() => openLink(profile.spotifyTrackUrl)}
          >
            ▶️ Preview
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPopupContent = () => {
    if (profile.profileType === "busker") {
      return (
        <>
          <Header />
          {profile.about && (
            <Text style={styles.about}>
              <Text style={styles.aboutLabel}>About me: </Text>
              {profile.about}
            </Text>
          )}
          {profile.donateUrl && (
            <Button title="Donate" onPress={() => openLink(profile.donateUrl)} />
          )}
        </>
      );
    }

    if (profile.profileType === "bar") {
      return (
        <>
          <Header />
          <Text style={[styles.info, { fontSize: 17, fontWeight: "bold" }]}>
            🎤 Artist: {profile.artistPlaying}
          </Text>
          <Text style={styles.info}>Doors: {profile.doors}</Text>
          <Text style={styles.info}>📍 {profile.address}</Text>
          {profile.trackCover && <SpotifyCard />}
          {profile.ticketLink && (
            <Text style={styles.link} onPress={() => openLink(profile.ticketLink)}>
              🎟 Buy Tickets {profile.price ? `(${profile.price})` : ""}
            </Text>
          )}
          {profile.bannerImage && (
            <Image source={{ uri: profile.bannerImage }} style={styles.banner} />
          )}
        </>
      );
    }

    return <Text>Unknown profile type</Text>;
  };

  return (
    <View style={styles.pinContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: pinUrl }} style={styles.pin} />
      </TouchableOpacity>

      {isActive && (
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>{renderPopupContent()}</View>
        </View>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  pinContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 30,
  },

  pin: {
    width: 50,
    height: 50,
  },
  popup: {
    backgroundColor: "rgba(230, 195, 109, 0.5)",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    width: 260,
  },

  popupOverlay: {
    position: "absolute",
    bottom: 60,
    zIndex: 999,
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 6,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },

  info: {
    fontSize: 17,
    textAlign: "center",
    marginVertical: 3,
  },

  link: {
    fontSize: 17,
    color: "#007aff",
    textDecorationLine: "underline",
    marginTop: 6,
  },

  spotifyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    padding: 6,
    borderRadius: 8,
    marginTop: 8,
    width: "100%",
  },

  spotifyCover: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },

  spotifyTextBlock: {
    flex: 1,
    paddingLeft: 8,
    justifyContent: "center",
  },

  trackRow: {
    fontSize: 13,
    flexShrink: 1,
    flexWrap: "nowrap",
  },

  trackName: {
    fontWeight: "600",
  },

  separator: {
    color: "#888",
  },

  artistName: {
    color: "#666",
  },

  playPreview: {
    fontSize: 12,
    color: "#1DB954",
    textDecorationLine: "underline",
  },

  banner: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginTop: 8,
  },

  about: {
    fontSize: 17,
    color: "#444",
    marginTop: 6,
    marginBottom: 8,
    textAlign: "center",
    paddingHorizontal: 8,
  },

  aboutLabel: {
    fontWeight: "bold",
    color: "#222",
  },

  previewWrapper: {
    alignItems: "center",
    marginTop: 4,
  },
});

