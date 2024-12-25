import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router"; // Correct use for router navigation in Expo
import { LinearGradient } from "expo-linear-gradient";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const router = useRouter(); // Using router for navigation

  const fetchSongs = async () => {
    if (!query) return;
    try {
      const response = await axios.get(
        `https://api.deezer.com/search?q=${query}`
      );
      const SearchTracks = response.data.data.map((track) => ({
        id: track.id.toString(),
        title: track.title,
        artist: track.artist.name,
        preview: track.preview,
        image: track.album.cover_xl, // Cover image URL
      }));
      setSongs(SearchTracks);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const handleTrackSelect = (track) => {
    router.push({
      pathname: "/PlayerScreen",
      params: {
        trackId: track.id,
        title: track.title,
        artist: track.artist,
        coverArt: track.image,
        preview: track.preview,
      },
    });
  };

  return (
    <LinearGradient
      colors={["#000000", "#2D0092", "#000000"]}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Search Songs</Text>
        <TextInput
          style={styles.input}
          placeholder="Search for a song..."
          placeholderTextColor="#aaaaaa"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={fetchSongs} // Trigger search on enter
        />
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recentlyPlayedCard}
              onPress={() => handleTrackSelect(item)}
            >
              <Image source={{ uri: item.image }} style={styles.songImage} />
              <View>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.songArtist}>{item.artist}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  gradientBackground: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
  },
  input: {
    backgroundColor: "#fffffd",
    padding: 10,
    marginBottom: 20,
    color: "#000000",
    borderRadius: 8,
  },
  recentlyPlayedCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "rgba(21, 21, 21, 0.5)",
    borderRadius: 10,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  songArtist: {
    fontSize: 14,
    color: "#cccccc",
  },
});

export default SearchScreen;
