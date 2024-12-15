import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CountryListItem = ({ country, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={{ uri: country.flags.png }} 
        style={styles.flag}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{country.name.common}</Text>
        <Text style={styles.region}>{country.region}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    
  },
  flag: {
    width: 60,
    height: 40,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    fontColor: 'white',
  },
  region: {
    fontSize: 14,
    color: 'gray',
  }
});

export default CountryListItem;