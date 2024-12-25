import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';


const ArtistSongs = () => {
  const params = useLocalSearchParams();
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

      const [loaded] = useFonts({
        Roboto: require('../../assets/fonts/Roboto-Black.ttf'),
      });

  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        const response = await axios.get(`https://api.deezer.com/artist/${params.artistId}/top?limit=50`);
        setSongs(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching artist songs:', error);
        setIsLoading(false);
      }
    };

    fetchArtistSongs();
  }, [params.artistId]);

  const handleTrackSelect = (track) => {
    router.push({
      pathname: '/PlayerScreen',
      params: {
        trackId: track.id,
        title: track.title,
        artist: track.artist.name,
        coverArt: track.album.cover_xl,
        preview: track.preview
      }
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#000000', '#2D0092', '#000000']}
      style={styles.gradientBackground}
    >
    <View style={styles.container}>
      <Text style={styles.title}>{params.artistName}</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.songItem}
            onPress={() => handleTrackSelect(item)}
          >
            <Image 
              source={{ uri: item.album.cover_medium }} 
              style={styles.songImage}
            />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songDuration}>
                {new Date(item.duration * 1000).toISOString().substr(14, 5)}
              </Text>
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
    padding: 16,
  },
  gradientBackground: {
    flex: 1, 
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#2F0D80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Roboto'
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4D4D4D',
    
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  songInfo: {
    marginLeft: 12,
    flex: 1,
    
  },
  songTitle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto'
  },
  songDuration: {
    color: '#C0C0C0',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'Roboto'
  },
});

export default ArtistSongs;