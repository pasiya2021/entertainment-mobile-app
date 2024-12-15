import React, { useState } from 'react';
import {router} from 'expo-router';	
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as WebBrowser from 'expo-web-browser';


WebBrowser.maybeCompleteAuthSession()

const LoginScreen = () => {
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
     
      <View style={styles.greenBackground} />
      
      
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>Log in here to continue</Text>

        
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Remember Me and Forgot Password */}
        <View style={styles.rememberContainer}>
          <TouchableOpacity
            style={styles.rememberMe}
           // onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={styles.checkbox}>
              {rememberMe && <Ionicons name="checkmark" size={16} color="#4CAF50" />}
            </View>
            <Text style={styles.rememberText}>Remember Me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} 
          onPress={() => router.push('/HomeScreen')}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        {/* Or Divider */}
        <View style={styles.orContainer}>
          <Text style={styles.orText}>Or</Text>
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={24} color="#DB4437" />
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't You Have an Account? </Text>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Signup Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D2D',
  },
  greenBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: '#500AF0',
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 130,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#500AF0',
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#500AF0',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  forgotText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#500AF0',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  orText: {
    color: '#666',
    paddingHorizontal: 8,
    
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  signupLink: {
    fontSize: 14,
    color: '#FFFFFF', 
    fontWeight: '500',
  },
});

export default LoginScreen;


// import React from 'react';
// import { View, ScrollView, FlatList, Image, Text, TouchableOpacity } from 'react-native';

// const Loginscreen = () => {
//   // Sample data for the screens
//   const playlists = [
//     { id: '1', title: 'Liked Songs', image: require('./assets/liked-songs.jpg') },
//     { id: '2', title: 'Heena Maka', image: require('./assets/heena-maka.jpg') },
//     // Add more playlists here
//   ];

//   const recentlyPlayed = [
//     { id: '1', title: 'See Again', image: require('./assets/see-again.jpg') },
//     { id: '2', title: 'See Again', image: require('./assets/see-again-2.jpg') },
//     // Add more recently played songs here
//   ];

//   const artists = [
//     { id: '1', name: 'Yuki Nav', image: require('./assets/yuki-nav-1.jpg') },
//     { id: '2', name: 'Yuki Nav', image: require('./assets/yuki-nav-2.jpg') },
//     // Add more artists here
//   ];

//   return (
//     <ScrollView>
//       <View style={{ padding: 16 }}>
//         <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Playlists</Text>
//         <FlatList
//           data={playlists}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <TouchableOpacity style={{ marginRight: 16 }}>
//               <Image source={item.image} style={{ width: 160, height: 160, borderRadius: 8 }} />
//               <Text style={{ marginTop: 8, fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
//             </TouchableOpacity>
//           )}
//         />

//         <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 24, marginBottom: 16 }}>Recently Played</Text>
//         <FlatList
//           data={recentlyPlayed}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <TouchableOpacity style={{ marginRight: 16 }}>
//               <Image source={item.image} style={{ width: 160, height: 160, borderRadius: 8 }} />
//               <Text style={{ marginTop: 8, fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
//             </TouchableOpacity>
//           )}
//         />

//         <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 24, marginBottom: 16 }}>Artists</Text>
//         <FlatList
//           data={artists}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <TouchableOpacity style={{ marginRight: 16 }}>
//               <Image source={item.image} style={{ width: 80, height: 80, borderRadius: 40 }} />
//               <Text style={{ marginTop: 8, fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default Loginscreen;