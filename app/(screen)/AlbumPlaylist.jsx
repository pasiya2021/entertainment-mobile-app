import React from 'react';
import { View, ScrollView, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AlbumPlaylist = ({ route }) => {
  if (!route.params || !route.params.album) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#FFF', fontSize: 18 }}>
          No album data provided. Please select an album from the home screen.
        </Text>
      </View>
    );
  }

  const { album } = route.params;

  return (
    <View style={styles.container}>
      {/* Album Header */}
      <View style={styles.albumHeader}>
        <Image source={{ uri: album.cover_medium }} style={styles.albumCover} />
        <Text style={styles.albumTitle}>{album.title}</Text>
        <Text style={styles.albumArtist}>Artist Name</Text>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
      </View>

      {/* Playlist */}
      <ScrollView style={styles.playlist}>
        <FlatList
          data={album.tracks.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.trackItem}>
              <Text style={styles.trackNumber}>{index + 1}.</Text>
              <Text style={styles.trackTitle}>{item.title}</Text>
              <Text style={styles.trackDuration}>{new Date(item.duration * 1000).toISOString().substr(14, 5)}</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F0D80',
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
  },
  trackNumber: {
    fontSize: 16,
    color: '#C0C0C0',
    marginRight: 16,
  },
  trackTitle: {
    fontSize: 16,
    color: '#FFF',
    flex: 1,
  },
  trackDuration: {
    fontSize: 14,
    color: '#C0C0C0',
  },
});

export default AlbumPlaylist;