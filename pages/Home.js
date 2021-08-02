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
      source={require('../assets/Backgrounds/Home_Background_Mobile.jpg')}
      resizeMode="cover"
      style={{ flex: 1, width: windowWidth, height: windowHeight }}
    >

<TouchableOpacity style={styles.signoutButton} onPress = {createTwoButtonAlert}>
          <Image source={require('../assets/Icons/signout.png')}/>
        </TouchableOpacity>

      
    <View style={styles.container}>
      

      <Text style={styles.catLabel}>Explore Categories</Text>    

      <SafeAreaView style={styles.scroll}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>

          {/* Change the onPress to hit spotify playlist on all categories!!!!  */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/anime.png')}/>
            </TouchableOpacity>
          
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/disco.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/metal.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/rainyday.png')}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/kpop.png')}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/rnb.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/hiphop.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/rock.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/study.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/country.png')}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/indie.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/latin.png')}/>
            </TouchableOpacity>
          
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/blues.png')}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Jumble Screen')}>
              <Image style={styles.categoryIcon} source={require('../assets/Icons/piano.png')}/>
            </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      <Text style={styles.playLabel}>Playlists</Text>

      <View style={styles.playlistView}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Liked Playlist Screen')}>
            <Image style={styles.playlistIcon} source={require('../assets/Images/liked.png')}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Disliked Playlist Screen')}>
              <Image style={styles.playlistIcon} source={require('../assets/Images/disliked.png')}/>
          </TouchableOpacity>
      </View>

    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 345,
    marginBottom: 40
  },

  scroll: {
    flex: 1,
    marginBottom: 0,
    // backgroundColor: 'pink',
  },

  scrollView: {
    display: 'flex',
    // backgroundColor: 'pink',
    marginHorizontal: 10,
    paddingTop: 15

  },
  text: {
    fontSize: 42,
  },

  catLabel: {
    fontFamily: "Roboto-Bold",
    fontSize: 23,
    marginLeft: 35,
  },

    playLabel: {
      fontFamily: "Roboto-Bold",
      fontSize: 23,
      marginLeft: 35,
      top: -20
  },

  categoryIcon: {
    marginRight: 10,
    width: 67,
    height: 115
  },

  playlistView: {
    // backgroundColor: 'pink',
    display: 'flex',
    flexDirection: 'row',
    bottom: 5,
    paddingLeft: 20
  },

  playlistIcon: {

    marginLeft: 10,
    marginRight: 10,
    width: 145,
    height: 170
  },

  signoutButton: {
    top:63,
    left: 25,

  },



});

export default Password;   