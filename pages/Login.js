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
      source={require('../assets/Backgrounds/Login_Background.jpg')} resizeMode="cover" style={{flex: 1, width: windowWidth, height: windowHeight}}
    >
      
      <View style={styles.body}>
        <Image source={require('../assets/Images/login.jpg')} style={{flex: 1, alignSelf: 'center', width: 233, height: 233}}></Image>
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
          onPress={() => navigate('Genre Screen')}
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
              style={{ color: '#2773be', fontWeight: 'bold', fontSize: 15 }}
            >
              {' '}
              Sign Up
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
  },
  loginTextInput: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    margin: 8,
    fontSize: 20,
    marginHorizontal: 20,
  },
  loginText: {
    fontSize: 30,
    margin: 20,
    marginTop: 0,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2773be',
    padding: 13,
    borderRadius: 10,
    margin: 7,
    marginHorizontal: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
  },
  linkText: {
    color: '#2773be',
    fontWeight: 'bold',
  },
  forgetTextPosition: {
    alignItems: 'flex-end',
    margin: 5,
    marginHorizontal: 20,
  },
  signUpPosition: {
    alignItems: 'center',
    marginTop: 15,
  },
  unclickableSignUpText: {
    fontSize: 15,
  },
  loginImage: {
    margin: 20,
    alignSelf: 'center',
    //flex: 1,
    //justifyContent: 'center',
  }
});

export default Login;
