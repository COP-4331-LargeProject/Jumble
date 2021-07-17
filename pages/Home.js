import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import Account from './Password';
import Settings from './Verification';
import Playlist from './Playlist';
import Shuffle from './Shuffle';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        tabBarOptions={{ showLabel: false, style: styles.bottomTab }}
      >
        <Tab.Screen
          name={'Profile Screen'}
          component={Account}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconPosition}>
                <MaterialIcons name="account-circle" size={24} color={focused ? 'red' : 'gray'} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={'Explore Screen'}
          component={Shuffle}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconPosition}>
                <Entypo name="shuffle" size={24} color={focused ? 'red' : 'gray'} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={'Playlist Screen'}
          component={Playlist}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconPosition}>
                <MaterialIcons name="library-music" size={24} color={focused ? 'red' : 'gray'} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  bottomTab: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 20,
    marginHorizontal: 20,
    height: 60,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
  iconPosition: {
    position: 'absolute',
    top: '30%',
  },
});
export default Home;
