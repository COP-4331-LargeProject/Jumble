import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const Genre = () => {
  return (
    <View>
      <Text>Genre</Text>
    
    <TouchableOpacity style={styles.firstButton}>
      <Text>Touch</Text>
    </TouchableOpacity>
    </View>
  );
};

export default Genre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  firstButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 5,
  },
  secondButton: {},
  thirdButton: {},
});
