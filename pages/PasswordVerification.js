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
      source={require('../assets/Backgrounds/SignedUp_Background_Mobile.png')}
      resizeMode="cover"
      style={{ flex: 1, width: windowWidth, height: windowHeight }}
    >
      <View style={styles.container}>


        <View style={styles.headerTop}>
          <Text style={styles.thanksText}>Check</Text>
          <Text style={styles.thanksText}>your</Text>
        </View>
        <View style={styles.headerBottom}>
          <Text style={styles.thanksText}>e-mail</Text>
        </View>
        <View>
          <Text style={styles.verifyText}>
            We have sent password
          </Text>
          <Text style={styles.verifyText}>
            recovery instructions to your e-mail.
          </Text>   
        </View>
        <Image
          source={require('../assets/Images/verify.png')}
          resizeMode="contain"
          style={{
            alignSelf: 'center',
            width: 215,
            height: 215,
            marginTop: 50,
            marginBottom: 5
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
    backgroundColor: '#605CFF',
    padding: 13,
    borderRadius: 13,
    margin: 7,
    width: 309,
    marginLeft: 40,
    marginBottom: 80,
    marginHorizontal: 20,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
  },
  thanksText: {
    fontSize: 40,
    alignSelf: 'center',
    fontFamily: "Moon2.0-Regular",
    paddingLeft: 10,
    paddingBottom: 3
  },
  verifyText: {
    fontSize: 16,
    color: '#848484',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: -13
  },
  headerTop: {
    marginTop: 120,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

 



});

export default Verification;
