import React, { useState } from 'react';
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

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Green curved background */}
      <View style={styles.greenBackground} />
      
      {/* Content Container */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>Log in here to continue</Text>

        {/* Email Input */}
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
            onPress={() => setRememberMe(!rememberMe)}
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
        <TouchableOpacity style={styles.loginButton}>
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
    backgroundColor: '#fff',
  },
  greenBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: '#4CAF50',
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
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
    borderColor: '#4CAF50',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberText: {
    fontSize: 14,
    color: '#666',
  },
  forgotText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
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
    backgroundColor: '#fff',
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
    color: '#666',
  },
  signupLink: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
});

export default LoginScreen;