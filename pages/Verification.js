import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';

const Verification = ({ navigation}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  return (
    <ImageBackground
      source={require('../assets/Backgrounds/SignedUp_Background.jpg')}
      resizeMode="cover"
      style={{ flex: 1, width: windowWidth, height: windowHeight }}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.thanksText}>Thanks for{'\n'}signing up!</Text>
        </View>
        <View>
          <Text style={styles.verifyText}>
            Please verify your e-mail{'\n'}address so you can start listening!
          </Text>
        </View>
        <Image
          source={require('../assets/Images/signup.png')}
          resizeMode="contain"
          style={{
            flex: 1,
            alignSelf: 'center',
            width: 215,
            height: 215,
            padding: 0,
            margin: 0,
          }}
        ></Image>
        <TouchableOpacity title="Verify" style={styles.verifyButton} onPress={() => navigation.navigate('Login Screen')}>
          <Text style={styles.verifyButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  verifyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2773be',
    padding: 13,
    borderRadius: 10,
    margin: 7,
    marginBottom: 80,
    marginHorizontal: 20,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
  },
  thanksText: {
    fontSize: 38,
    alignSelf: 'center',
    marginTop: 50,
  },
  verifyText: {
    fontSize: 16,
    color: '#848484',
    alignSelf: 'center',
    marginTop: 15,
  }
});

export default Verification;
