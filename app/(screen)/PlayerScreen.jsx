import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const PlayerScreen = () => {
  const params = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  
  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [params.preview]);

  const loadAudio = async () => {
    try {
      if (sound) await sound.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: params.preview },
        { shouldPlay: false }
      );
      setSound(newSound);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const handlePlayPause = async () => {
    if (!sound) return;
    
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.playerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Playing Suggested Song</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.coverArtContainer}>
        <Image
          source={{ uri: params.coverArt }}
          style={styles.coverArt}
        />
      </View>

      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{params.title}</Text>
        <Text style={styles.artistName}>{params.artist}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="play-skip-back" size={32} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.playButton}
          onPress={handlePlayPause}
        >
          <Ionicons 
            name={isPlaying ? "pause" : "play"} 
            size={32} 
            color="white" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="play-skip-forward" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: 10,
  },
  coverArtContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  coverArt: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  songTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  artistName: {
    color: '#999',
    fontSize: 18,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  controlButton: {
    marginHorizontal: 20,
  },
  playButton: {
    backgroundColor: '#6200EE',
    padding: 20,
    borderRadius: 40,
  },
});

export default PlayerScreen;