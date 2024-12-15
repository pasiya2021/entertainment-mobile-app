// import React, { useState, useEffect } from 'react';
// import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
// import { SearchBar } from 'react-native-elements';
// import CountryListItem from './CountryListItem';
// import { router } from 'expo-router';

// const CountryListScreen = ({ navigation }) => {
//   const [countries, setCountries] = useState([]);
//   const [filteredCountries, setFilteredCountries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     loadCountries();
//   }, []);

//   const loadCountries = async () => {
//     try {
      
//       const response = await fetch(
//         "https://restcountries.com/v3.1/all?fields=name,flags,region,coatOfArms,capital,population,currencies,languages"
//       );
//       const data = await response.json();
//       setCountries(data);
//       console.log(data);
//       setFilteredCountries(data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   const updateSearch = (search) => {
//     setSearch(search);
//     const filtered = countries.filter((country) => {
//       return country.name.common.toLowerCase().includes(search.toLowerCase());
//     });
//     setFilteredCountries(filtered);
//   }


//   const renderCountry = ({ item }) => (
//     <CountryListItem 
//       country={item} 
//       onPress={() => router.push({ pathname: '/CountryDetailsScreen', params: { country: JSON.stringify(item) } })}

//     />
//   );

//   if (loading) {
//     return <ActivityIndicator size="large" style={styles.loader} />;
//   }

//   return (
//     <View style={styles.container}>
//       <SearchBar
//         placeholder="Search Countries..."
//         onChangeText={updateSearch}
//         value={search}
//         platform="default"
//         containerStyle={styles.searchContainer}
       
//       />
//       <FlatList
//         data={filteredCountries}
//         renderItem={renderCountry}
//         keyExtractor={(country) => country.name.common} 
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 10,
//     backgroundColor: '#00008d	D9',
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   searchContainer: {
//     backgroundColor: 'white',
//     borderBottomColor: 'transparent',
//     borderTopColor: 'transparent',
//     padding: 10,
//     backgroundColor: '#fff',
//   }
// });

// export default CountryListScreen;
