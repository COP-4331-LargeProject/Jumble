import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useWindowDimensions } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

// Signup Element imports navigation from App.js to switch between pages
const Signup = ({ navigation}) => {
  // Hooks for taking the input's entered by the user
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  // Gets Device Dimensions
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  return (
    //imports background image and body elements below
    <ImageBackground
      source={require('../assets/Backgrounds/SigningUp_Background.jpg')}
      resizeMode="cover"
      style={{ flex: 1, width: windowWidth, height: windowHeight }}
    >
      <View style={styles.body}>
      <Ionicons name="chevron-back-sharp" size={35} color="black" style={{marginLeft: 10}} onPress={() => navigation.goBack()}/>
        <Text style={styles.signUpText}>Sign Up</Text>
        <View>
          <TextInput
            style={styles.signUpTextInput}
            onChangeText={(first) => setFirstName(first)}
            placeholder="First Name"
            keyboardType="default"
          />
        </View>
        <View>
          <TextInput
            style={styles.signUpTextInput}
            onChangeText={(last) => setLastName(last)}
            placeholder="Last Name"
            keyboardType="default"
          />
        </View>
        <View>
          <TextInput
            style={styles.signUpTextInput}
            onChangeText={(address) => setEmail(address)}
            placeholder="E-mail"
            keyboardType="email-address"
          />
        </View>
        <View>
          <TextInput
            style={styles.signUpTextInput}
            onChangeText={(pass) => setPassword(pass)}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={true}
          />
        </View>
        <View>
          <TextInput
            style={styles.signUpTextInput}
            onChangeText={(confirm) => setconfirmPassword(confirm)}
            placeholder="Confirm Password"
            keyboardType="default"
            secureTextEntry={true}
          />
        </View>
        <View>
          <TouchableOpacity
            title="SignUpButton"
            style={styles.signUpButton}
            onPress={() => navigation.navigate('Verify Screen')}
            //style={{ color: '#2773be', fontWeight: 'bold', fontSize: 15 }}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  signUpTextInput: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    margin: 8,
    fontSize: 21,
    marginHorizontal: 20,
  },
  signUpText: {
    fontSize: 40,
    margin: 20,
  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2773be',
    padding: 13,
    borderRadius: 10,
    margin: 7,
    marginHorizontal: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Signup;
