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
  Pressable,
} from 'react-native';
import { useWindowDimensions } from 'react-native';

const Password = ({ navigation }) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [email, setEmail] = useState('');

  // CHANGE SO IT CALLS ERASE API
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Remove Song",
      "Are you sure you want remove this song from your playlist?",
      [
        {
          text: "Remove", onPress: () => navigation.navigate('Login Screen')
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ]
    );


  return (


    <View style={styles.container}>


      <View style={styles.backBox}>
        <TouchableOpacity onPress={() => navigation.navigate('Home Screen')}>
          <Image style={styles.backButton} source={require('../assets/Icons/backPlaylist.png')} />
        </TouchableOpacity>
      </View>

      {/* CHANGE!! SONG COUNT IS DYNAMIC */}
      <View style={styles.textBox}>
        <Text style={styles.playlistLabel}>PLAYLIST</Text>
        <Text style={styles.likedLabel}>Disliked Songs</Text>
        <Text style={styles.songCount}>2 songs</Text>
      </View>

      <SafeAreaView style={styles.scroll}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

          {/* row view */}
          <View style={styles.songBox}> 

            <View style={styles.playButtonBox}>
              <TouchableOpacity style={styles.playButton} onPress={() => navigation.navigate('Disliked Playlist Screen')}>
                <Image style={styles.playButton} source={require('../assets/Icons/pauseList.png')} />
              </TouchableOpacity>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.artistLabel}>Artist</Text>
              <Text style={styles.titleLabel}>Song Title</Text> 
            </View>

            <View style={styles.timeBox}>
              <Text style={styles.durationLabel}>0:00</Text>
            </View>
          </View>


        </ScrollView>
      </SafeAreaView>




      {/* <Image style={styles.menu} source={require('../assets/Images/playlistMenu.png')} /> */}
      <View style={styles.menuBox}> 
      
        <View style={styles.playButtonBox}>
          <TouchableOpacity style={styles.playButton} onPress={() => navigation.navigate('Disliked Playlist Screen')}>
            <Image style={styles.playButton} source={require('../assets/Icons/pauseList.png')} />
          </TouchableOpacity>
        </View>

        
      <View style={styles.infoBoxMenu}>
              <Text style={styles.artistLabelMenu}>Artist</Text>
              <Text style={styles.titleLabelMenu}>Song Title</Text> 
        </View>


        <View style={styles.trashButtonBox}>
          <TouchableOpacity onPress = {createTwoButtonAlert}>
            <Image style={styles.trashButton} source={require('../assets/Icons/trash.png')} />
          </TouchableOpacity>
        </View>
      </View>

      
        





    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },

  backBox: {
    top: 70,
    width: "100%",
    height: "10%",
    alignSelf: "center",
    position: "absolute",
    // backgroundColor: "pink"
  },
  backButton:
  {
    left: 25,
    height: 48,
    width: 16,
  },

  textBox: {
    left: 60,
    top: 60,
    // backgroundColor: "black",
    width: "50%",
    height: "12%"
  },

  playlistLabel: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "#7B7B7B",
  },

  likedLabel: {
    fontFamily: "Roboto-Bold",
    fontSize: 27,
  },

  songCount: {
    fontFamily: "Roboto-Regular",
    fontSize: 15
  },

  scroll: {
    flex: 1,
    marginBottom: 0,
    // backgroundColor: 'pink',
  },

  scrollView: {
    display: 'flex',
    // backgroundColor: 'pink',
    top: 50,
  },
  
  songBox: {
    display: 'flex',
    borderRadius: 20,
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#BDBFE5",
    height: "215%",
    width: "90%",
  },


  infoBox: {
    justifyContent: 'center',
    paddingLeft: 15
    // backgroundColor: 'black'
  },

  artistLabel: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: "#4F54BA",
  },

  titleLabel: {
    fontFamily: "Roboto-Bold",
    fontSize: 19,
    color: "#4F54BA",
  },

  timeBox: {
    width: "70%",
    height: "100%",
    justifyContent: "center",
  },

  durationLabel: {
    color: "#4F54BA",
    fontFamily: "Roboto-Regular",
    fontSize: 17,
    alignSelf: "center",
  },

  playButtonBox: {
    // width: "25%",
    paddingLeft: 30,
    height: "100%",
    justifyContent: "center",
    // backgroundColor: "yellow",

  },
  
  playButton: {
    alignSelf: "center",
    width: 35,
    height: 35,
  },

  artistLabelMenu: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: "white",
  },

  titleLabelMenu: {
    fontFamily: "Roboto-Bold",
    fontSize: 19,
    color: "white",
  },

  menuBox: {
    backgroundColor: "#4F54BA",
    height: "25%",
    width: "100%",
    display: 'flex',
    flexDirection: "row"
  },

  infoBoxMenu: {
    paddingLeft: 15,
    // backgroundColor: "black",
    alignSelf: "center",
  },

  trashButtonBox: {
    alignSelf: "center",
    width: "70%"
  },

  trashButton: {
    alignSelf: "center",
    width: 35,
    height: 35,
    
  },
    





  // menu: {
  //   top: "75%",
  //   position: "absolute",
  //   alignSelf: "center",
  // },
});

export default Password;


