import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useWindowDimensions } from 'react-native';


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
    source={require('../assets/Backgrounds/SignUp_Background_Mobile.png')} resizeMode="cover" style={{flex: 1, width: windowWidth, height: windowHeight}}
  >
  
      <View style={styles.body}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image style={styles.backButton} source={require('../assets/Icons/back.png')}/>
      </TouchableOpacity>
      
        <View style={styles.header}>
          <Text style={styles.signUpText}>Get</Text>
          <Text style={styles.signUpText}>Started</Text>
        </View>

        <Text style={styles.bottomHeader}>It's quick and easy.</Text>

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
            // onPress={() => navigation.navigate('Verify Screen')} 

            


            onPress={() => navigation.navigate('Verify Screen')}
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
    alignSelf: 'center',
    marginTop: -20
  },
  signUpTextInput: {
    borderWidth: 1,
    borderColor: '#707070',
    backgroundColor: 'white',
    padding: 17,
    width: 320,
    borderRadius: 13,
    margin: 8,
    fontSize: 21,
    marginHorizontal: 20,
    fontFamily: "Roboto-Light"
  },
  signUpText: {
    fontSize: 40,
    margin: 20,
    fontFamily: "Moon2.0-Regular",
    marginRight: -12
  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#605CFF',
    padding: 15,
    borderRadius: 13,
    margin: 7,
    marginTop: 10,
    marginHorizontal: 20,
    width: 320,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: "Roboto-Regular",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bottomHeader: {
    fontFamily: "Roboto-Light",
    fontSize: 18,
    marginTop: -15,
    marginBottom: 18,
    marginLeft: 22
  },
  backButton: {
    marginLeft:22,
  },

});

export default Signup;
