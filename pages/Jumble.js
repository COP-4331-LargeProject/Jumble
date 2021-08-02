import { StatusBar } from 'expo-status-bar';
import ViewOverflow from 'react-native-view-overflow';
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
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useWindowDimensions } from 'react-native';

const Password = ({navigation}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [email, setEmail] = useState('');

  const createTwoButtonAlert = () =>
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Logout", onPress: () => navigation.navigate('Login Screen')
      },
      {  text: "Cancel",
         onPress: () => console.log("Cancel Pressed"),
         style: "cancel"
         }
    ]
  );
  
  
  return (
    
    <ImageBackground
      source={require('../assets/Backgrounds/Jumble_Background_Mobile.png')}
      resizeMode="cover"
      style={{ flex: 1, width: windowWidth, height: windowHeight }}
    >
          

    <View style = {styles.container}>

    <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home Screen')}>
        <Image style={styles.homeButton} source={require('../assets/Icons/home.png')}/>
      </TouchableOpacity>
  
      

      <View style={styles.albumBox}>

          {/* CHANGE!! IMAGE SOURCE HAS TO BE DYNAMIC AND CHANGE PER SONG */}
        <Image source={require('../assets/Images/album.jpg')} resizeMode="stretch" style={styles.albumCover}>
        </Image>
       
      </View>

    
      <View style={styles.musicBox}>
        
      
        <Image style={styles.musicBoxImg} source={require('../assets/Images/musicInfo.png')}/>

        {/* CHANGE!! PAUSE SONG IN SPOTIFY PLAYER */}
        <TouchableOpacity  onPress={() => navigation.navigate('Home Screen')}>
            <Image style={styles.pauseButton} source={require('../assets/Images/pause.png')}/>  
        </TouchableOpacity>


        <View style = {styles.textBox}>
            <Text style={styles.title}>Itomori high school</Text>
            <Text style={styles.artist}>RADWIMPS</Text>
            <Text style = {styles.album}>Your Name.</Text>
        </View>

       

        <View style={styles.buttonsBox}>

        
          {/* CHANGE !! ADD OR LISLIKE SONG FUNCTION ON THE ONPRESS */}
          <TouchableOpacity  onPress={() => navigation.navigate('Home Screen')}>
              <Image style={styles.optionButton} source={require('../assets/Images/dislike.png')}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Home Screen')}>
             <Image style={styles.optionButton} source={require('../assets/Images/like.png')}/>
          </TouchableOpacity>

        </View>
        
      </View>
       
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // flex: 1,
    // display: "flex"s

  },

  homeButton: 
  {
    top: 27,
    left: 18,
    height: 31,
    width: 35
  },

  albumBox: {
    display: "flex",
    top: 60
  },

  albumCover: {
    marginTop: 35,
    alignSelf: "center",
    borderRadius: 30,
    width: "95%",
    height: "89%",
    position: 'relative',
  },

  musicBox: {
    top: 520,
    height: "100%",
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    borderRadius: 30,
    // backgroundColor: "pink"
  },

  musicBoxImg: {
    alignSelf: "center",
    height: 157,
    width: 327,
    // marginBottom: -55
    // top: 500,
  },

  textBox: {
    bottom: 200,
    left: 146,
    // backgroundColor: "black",
    width: "52%",
    height: "12%"
  },

  buttonsBox: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignSelf: "center",
    bottom: 198,
    // backgroundColor: "green"
  },
  
  optionButton: {
    width: 155,
    height: 56,
    marginLeft: 5,
    marginRight: 5
  },

  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },

  artist: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },

  genre: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
  },

  pauseButton: {
    width: 100,
    height: 100,
    bottom: 114,
    left: 38
  }
  
 



});

export default Password;   