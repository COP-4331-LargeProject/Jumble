import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import Home from './Home';
import Signup from './Signup';
import { useWindowDimensions } from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  ImageBackground,
  Image,
} from 'react-native';

const Login = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  return (
    <ImageBackground
      source={require('../assets/Backgrounds/Login_Background_Mobile.png')} resizeMode="cover" style={{flex: 1, width: windowWidth, height: windowHeight}}
    >
      
      <View style={styles.body}>
        <Image source={require('../assets/Images/login.jpg')} style={{alignSelf: 'center', width: 250, height: 250, resizeMode: "cover"}}>
        </Image>
        <Text style={styles.loginText}>Welcome{'\n'}Back</Text>
        <TextInput
          style={styles.loginTextInput}
          autoCompleteType="email"
          onChangeText={(value) => setEmail(value)}
          placeholder="E-mail"
          keyboardType="email-address"
        />
        <TextInput 
          style={styles.loginTextInput}
          autoCompleteType="password"
          onChangeText={(val) => setPassword(val)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.loginButton}
          title="Login"
          onPress={() => navigate('Home Screen')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgetTextPosition} title="Forgot" onPress={() => navigate('Password Screen')}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity title="Register" style={styles.signUpPosition}>
          <Text style={styles.unclickableSignUpText}>
            Don't have an account?
            <Text
              onPress={() => navigate('Signup Screen')}
            >
            <Text style={styles.linkText}> Sign Up</Text>
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 18,
    marginTop: -130
  },
  loginText: {
    fontSize: 30,
    fontFamily: "Moon2.0-Regular",
    marginLeft: 20,
    marginTop: -10,
    marginBottom: 10,  
  },
  loginTextInput: {
    borderWidth: 1,
    borderColor: "#707070",
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    margin: 8,
    fontSize: 20,
    marginHorizontal: 20,
    fontFamily: "Roboto-Light"
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#605CFF',
    padding: 13,
    borderRadius: 10,
    margin: 7,
    marginHorizontal: 20,
  },
  loginButtonText: {
    color: 'white',
    fontFamily: "Roboto-Regular",
    fontSize: 21,
  },
  linkText: {
    color: '#163F74',
    fontWeight: 'bold',
  },
  forgetTextPosition: {
    alignItems: 'flex-end',
    margin: 5,
    marginHorizontal: 20,
  },
  signUpPosition: {
    alignItems: 'center',
    marginTop: 20,
  },
  unclickableSignUpText: {
    fontFamily: "Roboto-Light",
    fontSize: 15,
  },
  loginImage: {
    margin: 20,
    alignSelf: 'center',
  }
});

export default Login;
