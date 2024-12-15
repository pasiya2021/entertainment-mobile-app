import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios'; // Make sure to install axios: npm install axios
import {router} from 'expo-router';	
const HomeScreen = () => {
  // State for different sections
  const [albums, setAlbums] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [artists, setArtists] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Deezer API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Albums (you'll need to replace with actual album IDs)
        const albumPromises = ['302127', '119608', '210362','302127', '119608', '210362'].map(async (albumId) => {
          const response = await axios.get(`https://api.deezer.com/album/${albumId}`);
          return {
            id: response.data.id.toString(),
            title: response.data.title,
            image: { uri: response.data.cover_medium }
          };
        });

        // Fetch Artists (you'll need to replace with actual artist IDs)
        const artistPromises = ['27', '246791', '4050205'].map(async (artistId) => {
          const response = await axios.get(`https://api.deezer.com/artist/${artistId}`);
          return {
            id: response.data.id.toString(),
            name: response.data.name,
            image: { uri: response.data.picture_medium }
          };
        });

        // Fetch Random Recommendations
        const recommendationsResponse = await axios.get('https://api.deezer.com/search?q=all&limit=4');
        const recommendationTracks = recommendationsResponse.data.data.map(track => ({
          id: track.id.toString(),
          title: track.title,
          image: { uri: track.album.cover_medium }
        }));

        // Fetch Recently Played (this would typically come from your backend or user's history)
        const recentlyPlayedResponse = await axios.get('https://api.deezer.com/search?q=pop&limit=4');
        const recentTracks = recentlyPlayedResponse.data.data.map(track => ({
          id: track.id.toString(),
          title: track.title,
          image: { uri: track.album.cover_medium }
        }));

        // Wait for all promises to resolve
        const resolvedAlbums = await Promise.all(albumPromises);
        const resolvedArtists = await Promise.all(artistPromises);

        // Set state
        setAlbums(resolvedAlbums);
        setArtists(resolvedArtists);
        setRecommendations(recommendationTracks);
        setRecentlyPlayed(recentTracks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <Text style={styles.welcomeText}>Welcome!</Text>

      {/* Albums */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Albums</Text>
        <FlatList
          data={albums}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.playlistCard}
            onPress={() => router.push('/AlbumPlaylist')}
            >
              <Image source={item.image} style={styles.playlistImage} />
              <Text style={styles.playlistTitle} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Recently Played */}
      <Text style={styles.sectionTitle}>Recently Played</Text>
      <FlatList
        data={recentlyPlayed}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recentlyPlayedCard}>
            <Image source={item.image} style={styles.recentlyPlayedImage} />
          </TouchableOpacity>
        )}
      />

      {/* Artists */}
      <Text style={styles.sectionTitle}>Artists</Text>
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.artistCard}>
            <Image source={item.image} style={styles.artistImage} />
            <Text style={styles.artistName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Recommendations */}
      <Text style={styles.sectionTitle}>Recommendations</Text>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recentlyPlayedCard}>
            <Image source={item.image} style={styles.recentlyPlayedImage} />
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F0D80',
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  playlistCard: {
    flex: 1,
    margin: 2,
    alignItems: 'center',
    backgroundColor: '#2A2731',
    borderRadius: 8,
    padding: 8,
    height: 60,
  },
  playlistImage: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginLeft: -80,
  },   
  playlistTitle: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 8,
    maxWidth: 100,
    marginTop: -30,
    marginLeft: 50,
  },
  recentlyPlayedCard: {
    marginRight: 16,
  },
  recentlyPlayedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  artistCard: {
    alignItems: 'center',
    marginRight: 16,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 200,
  },
  artistName: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 8,
  },
});

export default HomeScreen;