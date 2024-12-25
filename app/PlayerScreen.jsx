import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { useFonts } from 'expo-font';

const PlayerScreen = () => {

    const [loaded] = useFonts({
      Roboto: require('../assets/fonts/Roboto-Black.ttf'),
    });

  const params = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState({
    position: 0,
    duration: 0,
  });

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPlaybackStatus({
            position: status.positionMillis,
            duration: status.durationMillis,
          });
        }
      });
    }
  }, [sound]);
  

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
    <LinearGradient
      colors={['#000000', '#2D0092', '#000000']}
      style={styles.gradientBackground}
    >
      <View style={styles.playerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Playing Your Song</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.coverArtContainer}>
          <Image source={{ uri: params.coverArt }} style={styles.coverArt} />
        </View>

        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{params.title}</Text>
          <Text style={styles.artistName}>{params.artist}</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="play-skip-back" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="play-skip-forward" size={32} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <Slider
            style={styles.slider}
            value={playbackStatus.position}
            minimumValue={0}
            maximumValue={playbackStatus.duration}
            onSlidingComplete={async (value) => {
              if (sound) {
                await sound.setPositionAsync(value);
              }
            }}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#555555"
            thumbTintColor="#FFFFFF"
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {new Date(playbackStatus.position).toISOString().substr(14, 5)}
            </Text>
            <Text style={styles.timeText}>
              {new Date(playbackStatus.duration).toISOString().substr(14, 5)}
            </Text>
          </View>
        </View>

      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    padding: 20,
  },
  gradientBackground: {
    flex: 1,
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
    fontFamily: 'Roboto'
  },
  menuButton: {
    padding: 1,
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
    fontFamily: 'Roboto'
  },
  artistName: {
    color: '#999',
    fontSize: 18,
    fontFamily: 'Roboto'
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
  progressContainer: {
    marginVertical: 20,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: -35,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  
});

export default PlayerScreen;
