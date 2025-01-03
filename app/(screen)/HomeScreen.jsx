import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios'; 
import { router } from 'expo-router';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const HomeScreen = () => {

  const [loaded] = useFonts({
    Roboto: require('../../assets/fonts/Roboto-Black.ttf'),
  });

  // if (!loaded) {
  //   return <AppLoading />;
  // }
  
  const [albums, setAlbums] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [artists, setArtists] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumPromises = ['119601', '119602', '119604','302127', '119613', '302128'].map(async (albumId) => {
          const response = await axios.get(`https://api.deezer.com/album/${albumId}`);
          return {
            id: response.data.id.toString(),
            title: response.data.title,
            artist: response.data.artist.name,
            cover_medium: response.data.cover_xl,
          };
        });

        const artistPromises = ['27', '246791', '4050205'].map(async (artistId) => {
          const response = await axios.get(`https://api.deezer.com/artist/${artistId}`);
          return {
            id: response.data.id.toString(),
            name: response.data.name,
            image: { uri: response.data.picture_xl},
          };
        });

        const recommendationsResponse = await axios.get('https://api.deezer.com/search?q=all&limit=4');
        const recommendationTracks = recommendationsResponse.data.data.map(track => ({
          id: track.id.toString(),
          title: track.title,
          artist: track.artist.name,
          preview: track.preview,
          image: { uri: track.album.cover_xl },
        }));
    
        const recentlyPlayedResponse = await axios.get('https://api.deezer.com/search?q=pop&limit=4');
        const recentTracks = recentlyPlayedResponse.data.data.map(track => ({
          id: track.id.toString(),
          title: track.title,
          artist: track.artist.name,
          preview: track.preview,
          image: { uri: track.album.cover_xl },
        }));

        const resolvedAlbums = await Promise.all(albumPromises);
        const resolvedArtists = await Promise.all(artistPromises);

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

  
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2D0092" />
      </View>
    );
  }
  const handleTrackSelect = (track) => {
    router.push({
      pathname: '/PlayerScreen',
      params: {
        trackId: track.id,
        title: track.title,
        artist: track.artist,
        coverArt: track.image.uri,
        preview: track.preview
      }
    });
  };
  
  const handleArtistSelect = (artist) => {
    router.push({
      pathname: '/ArtistSongs',
      params: { 
        artistId: artist.id,
        artistName: artist.name 
      }
    });
  };
  

  return (

    <LinearGradient
    colors={['#000000', '#2D0092', '#000000']} 
    style={styles.gradientBackground}
  >
    <ScrollView style={styles.container}>

      <Text style={styles.welcomeText}>Welcome!</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Albums</Text>
        <FlatList
          data={albums}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.playlistCard}
              onPress={() => router.push({
                pathname: '/AlbumPlaylist',
                params: { albumId: item.id },
              })}
            >
              <Image source={{ uri: item.cover_medium }} style={styles.playlistImage} />
              <Text style={styles.playlistTitle} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <Text style={styles.sectionTitle}>Recently Played</Text>
      <FlatList
        data={recentlyPlayed}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recentlyPlayedCard}
            onPress={() => handleTrackSelect(item)}>
            <Image source={item.image} style={styles.recentlyPlayedImage} />
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Artists</Text>
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.artistCard}
            onPress={() => handleArtistSelect(item)}>
            <Image source={item.image} style={styles.artistImage} />
            <Text style={styles.artistName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Recommendations</Text>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recentlyPlayedCard} onPress={() => handleTrackSelect(item)}>
            <Image source={item.image} style={styles.recentlyPlayedImage} />
          </TouchableOpacity>
        )}
      />
    </ScrollView>
    </LinearGradient>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#2F0D80',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  gradientBackground: {
    flex: 1, 
  },

  welcomeText: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Roboto'
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
    marginVertical: 8,
    fontFamily: 'Roboto'
  },
  playlistCard: {
    flex: 1,
    margin: 2,
    alignItems: 'center',
    backgroundColor: "rgba(21, 21, 21, 0.6)",
    borderRadius: 8,
    padding: 8,
    height: 60,
  },
  playlistImage: {
    width: 45,
    height: 45,
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
    width: 135,
    height: 135,
    borderRadius: 8,
  },
  artistCard: {
    alignItems: 'center',
    marginRight: 16,
  },
  artistImage: {
    width: 120,
    height: 120,
    borderRadius: 200,
  },
  artistName: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 8,
  },
});

export default HomeScreen;