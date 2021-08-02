import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useWindowDimensions } from 'react-native';

const Password = ({navigation}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [email, setEmail] = useState('');
  return (
    
    <ImageBackground
      source={require('../assets/Backgrounds/ForgotPassword_Background_Mobile.png')}
      resizeMode="cover"
      style={{ flex: 1, width: windowWidth, height: windowHeight }}
    >
      
      <View style={styles.container}>
        <View>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login Screen')}>
          <Image source={require('../assets/Icons/back.png')}/>
        </TouchableOpacity>

        <View style={styles.headerTop}>
          <Text style={styles.forgotText}>Forgot</Text>
          <Text style={styles.forgotText}>your</Text>
        </View>
        <View style={styles.headerBottom}>
          <Text style={styles.forgotText}>password?</Text>
        </View>
        </View>
        
        <View>
          <Text style={styles.resetText}>
          Enter your registered e-mail
          </Text>
          <Text style={styles.resetText}>
          below to receive reset instructions.  
          </Text>   
        </View>

        <Image
          source={require('../assets/Images/forgot_pass.png')}
          resizeMode="contain"
          style={{
            alignSelf: 'center',
            width: 215,
            height: 215,
            marginTop: 50,
            marginBottom: 5
          }}
        ></Image>
        <TextInput
          style={styles.resetTextInput}
          autoCompleteType="email"
          onChangeText={(value) => setEmail(value)}
          placeholder="E-mail"
          keyboardType="email-address"
        />
        <TouchableOpacity title="Reset" style={styles.resetButton} onPress={() => navigation.navigate('Password Verification Screen')}>
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
  resetButton: {
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
   headerTop: {
    marginTop: 120,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forgotText: {
    fontSize: 40,
    alignSelf: 'center',
    fontFamily: "Moon2.0-Regular",
    paddingLeft: 10,
    paddingBottom: 3
  },
  resetText: {
    fontSize: 16,
    color: '#848484',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: -13
  },
  resetTextInput: {
    borderWidth: 1,
    borderColor: "#707070",
    backgroundColor: 'white',
    width: 309,
    padding: 15,
    marginLeft: 40,
    borderRadius: 12,
    margin: 8,
    fontSize: 20,
    marginHorizontal: 20,
    fontFamily: "Roboto-Light"
  },
  backButton: {
    marginLeft: 35,
    marginTop:80,
    marginBottom: -100,
  },


});

export default Password;