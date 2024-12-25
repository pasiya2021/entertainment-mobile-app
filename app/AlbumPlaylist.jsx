import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const AlbumPlaylist = () => {

    const [loaded] = useFonts({
      Roboto: require('../assets/fonts/Roboto-Black.ttf'),
    });

  const { albumId } = useLocalSearchParams();
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const albumResponse = await axios.get(`https://api.deezer.com/album/${albumId}`);
        setAlbum(albumResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching album data:', error);
        setIsLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  const handleTrackSelect = (track) => {
    router.push({
      pathname: '/PlayerScreen',
      params: {
        trackId: track.id,
        title: track.title,
        artist: album.artist.name,
        coverArt: album.cover_xl,
        preview: track.preview
      }
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  if (!album) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#FFF', fontSize: 18 }}>
          Unable to load album details. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#000000', '#2D0092', '#000000']}
      style={styles.gradientBackground}
    >
    <View style={styles.container}>
      <View style={styles.albumHeader}>
        <Image source={{ uri: album.cover_medium }} style={styles.albumCover} />
        <Text style={styles.albumTitle}>{album.title}</Text>
        <Text style={styles.albumArtist}>{album.artist.name}</Text>
        <TouchableOpacity style={styles.playButton}>
          
            <Ionicons name="play-circle" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={album.tracks.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleTrackSelect(item)}>
            <View style={styles.trackItem}>
              <Text style={styles.trackNumber}>{index + 1}.</Text>
              <Text style={styles.trackTitle}>{item.title}</Text>
              <Text style={styles.trackDuration}>
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
  albumHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  albumCover: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  albumTitle: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 16,
    fontFamily: 'Roboto'
  },
  albumArtist: {
    fontSize: 16,
    color: '#C0C0C0',
    marginTop: 4,
  },
  playButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 16,
    width: 80,
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playlist: {
    flex: 1,
    paddingHorizontal: 16,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4D4D4D',
   
    marginLeft: 16,
    marginRight: 16,
  },
  trackNumber: {
    fontSize: 16,
    color: '#C0C0C0',
    marginRight: 16,
    fontFamily: 'Roboto'
  },
  trackTitle: {
    fontSize: 16,
    color: '#FFF',
    flex: 1,
    fontFamily: 'Roboto'
  },
  trackDuration: {
    fontSize: 14,
    color: '#C0C0C0',
    fontFamily: 'Roboto'
  },
});

export default AlbumPlaylist;