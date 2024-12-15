// import React from 'react';
// import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
// import { useRouter, useLocalSearchParams } from 'expo-router'; 

// const CountryDetailsScreen = () => {
//   const { country } = useLocalSearchParams(); 
//   const countryData = JSON.parse(country); 

//   return (
//     <ScrollView style={styles.container}>
      
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>{countryData.name.common}</Text>
//       </View>

      
//       <View style={styles.flagContainer}>
//         <Image source={{ uri: countryData.flags.png }} style={styles.flagCircle} />
//       </View>

      
//       <View style={styles.detailsContainer}>
//         <Text style={styles.details}>Region: {countryData.region}</Text>
//         <Text style={styles.details}>Capital: {countryData.capital?.[0]}</Text>
//         <Text style={styles.details}>
//           Population: {countryData.population.toLocaleString()}
//         </Text>
//         <Text style={styles.details}>
//           Languages: {Object.values(countryData.languages || {}).join(', ')}
//         </Text>
//         <Text style={styles.details}>
//           Currency:{" "}
//           {Object.values(countryData.currencies || {})
//             .map((currency) => `${currency.name} (${currency.symbol})`)
//             .join(', ')}
//         </Text>
//       </View>

      
//       {countryData.coatOfArms?.png && (
//         <View style={styles.coatOfArmsContainer}>
//           <Text style={styles.details}>Coat of Arms:</Text>
//           <Image source={{ uri: countryData.coatOfArms.png }} style={styles.coatOfArms} />
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f4f4',
//   },
//   headerContainer: {
//     alignItems: 'center',
//     paddingVertical: 100, 
//     backgroundColor: '#351F8D', 
//     borderTopLeftRadius: 24, 
//     borderTopRightRadius: 24, 
//     marginBottom: 16, 
//   },
//   header: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   flagContainer: {
//     alignItems: 'center',
//     marginTop: -60, 
//   },
//   flagCircle: {
//     width: 200,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 4, 
//     borderColor: '#fff',
//   },
//   detailsContainer: {
//     padding: 16,
//   },
//   details: {
//     fontSize: 16,
//     marginVertical: 4,
//   },
//   coatOfArmsContainer: {
//     alignItems: 'center',
//     marginVertical: 16,
//   },
//   coatOfArms: {
//     width: 150,
//     height: 150,
//     resizeMode: 'contain',
//   },
// });

// export default CountryDetailsScreen;
