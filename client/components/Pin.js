import React, { useState } from "react";
import {
  Button,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PIN_COLOURS = {
  busker: "green",
  bar: "purple",
  default: "yellow",
};

export default function Pin({ data, isActive, onPress }) {
  // const [showPopup, setShowPopup] = useState(false);

  // const handlePress = () => setShowPopup(!showPopup);
  const openLink = (url) => url && Linking.openURL(url);

  const pinColor = PIN_COLOURS[data.profileType] || PIN_COLOURS.default;
  const pinUrl = `https://maps.google.com/mapfiles/ms/icons/${pinColor}-dot.png`;

  const Header = () => (
    <>
      <Image source={{ uri: data.profileIcon }} style={styles.avatar} />
      <Text style={styles.name}>{data.profileName}</Text>
    </>
  );

  const SpotifyCard = () => (
    <View style={styles.spotifyCard}>
      <View style={styles.spotifyTextBlock}>
        <Text numberOfLines={1} style={styles.trackRow}>
          <Text style={styles.trackName}>{data.trackName}</Text>
          <Text style={styles.separator}> • </Text>
          <Text style={styles.artistName}>{data.trackArtist}</Text>
        </Text>
        <View style={styles.previewWrapper}>
          <Text
            style={styles.playPreview}
            onPress={() => openLink(data.spotifyTrackUrl)}
          >
            ▶️ Preview
          </Text>
        </View>
      </View>
    </View>
  );

  const PopupContent = () => {
    switch (data.profileType) {
      case "busker": {
        return (
          <>
            <Header />
            {data.about && (
              <Text style={styles.about}>
                <Text style={styles.aboutLabel}>About me: </Text>
                {data.about}
              </Text>
            )}
            {/* TODO: replace with PP SDK button */}
            {data.donateUrl && (
              <Button title="Donate" onPress={() => openLink(data.donateUrl)} />
            )}
          </>
        );
      }
      case "venue": {
        return (
          <>
            <Header />
            <Text style={[styles.info, { fontSize: 17, fontWeight: "bold" }]}>
              🎤 Artist: {data.artistPlaying}
            </Text>
            <Text style={styles.info}>Doors: {data.doors}</Text>
            <Text style={styles.info}>📍 {data.address}</Text>
            {data.trackCover && <SpotifyCard />}
            {data.ticketLink && (
              <Text
                style={styles.link}
                onPress={() => openLink(data.ticketLink)}
              >
                🎟 Buy Tickets {data.price ? `(${data.price})` : ""}
              </Text>
            )}
            {data.bannerImage && (
              <Image source={{ uri: data.bannerImage }} style={styles.banner} />
            )}
          </>
        );
      }
      default: {
        return <Text>Unknown creator profile type</Text>;
      }
    }
  };

  return (
    <View style={styles.pinContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: pinUrl }} style={styles.pin} />
      </TouchableOpacity>

      {isActive && (
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>
            <PopupContent />
          </View>
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
