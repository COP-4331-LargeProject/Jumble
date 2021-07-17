import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Genre from './pages/Genre';
import Password from './pages/Password';
import Verification from './pages/Verification';

const Stack = createStackNavigator();

export default function App() {
  return (
    //<View>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerShown: true,
  }}> 
          <Stack.Screen name="Login Screen" component={Login} />
          <Stack.Screen name="Signup Screen" component={Signup} />
          <Stack.Screen name="Home Screen" component={Home} />
          <Stack.Screen name="Genre Screen" component={Genre} />
          <Stack.Screen name="Password Screen" component={Password} />
          <Stack.Screen name="Verify Screen" component={Verification} />
        </Stack.Navigator>
      </NavigationContainer>
    //</View>
  );
}

//export App;