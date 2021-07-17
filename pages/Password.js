import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';

const Password = ({ navigation}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [email, setEmail] = useState('');
  return (
    <ImageBackground
      source={require('../assets/Backgrounds/ForgotPassword_Background.jpg')}
      resizeMode="cover"
      style={{ flex: 1, width: windowWidth, height: windowHeight }}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.forgotText}>Forgot your{'\n'}password?</Text>
        </View>
        <View>
          <Text style={styles.resetText}>
            Enter your registered e-mail{'\n'}below to receive reset instructions.
          </Text>
        </View>
        <Image
          source={require('../assets/Images/forgot_pass.png')}
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
        <TextInput
          style={styles.resetTextInput}
          autoCompleteType="email"
          onChangeText={(value) => setEmail(value)}
          placeholder="E-mail"
          keyboardType="email-address"
        />
        <TouchableOpacity title="Reset" style={styles.verifyButton} onPress={() => navigation.navigate('Login Screen')}>
          <Text style={styles.resetButtonText}>Reset</Text>
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
  resetButtonText: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
  },
  forgotText: {
    fontSize: 42,
    alignSelf: 'center',
    marginTop: 50,
  },
  resetText: {
    fontSize: 16,
    color: '#848484',
    alignSelf: 'center',
    marginTop: 15,
  },
  resetTextInput: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    margin: 8,
    fontSize: 21,
    marginHorizontal: 20,
  },
});

export default Password;