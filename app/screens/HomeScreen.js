import { Text, SafeAreaView, StyleSheet, View, ScrollView, TouchableOpacity, ActivityIndicator, Button } from 'react-native';

// import { createMaterialTopTabNavigator } from '@react-navigation/native-stack';

// const Tab = createMaterialTopTabNavigator();

import { useEffect, useState } from 'react';

import { useFonts } from 'expo-font';

import {sendLocalNotification} from '../PushNotify';


const HomeScreen = () => {

  const [fontsLoaded] = useFonts({
    'Agency FB': require('../styles/AGENCYB.ttf'),
    'Nunito': require('../styles/Nunito-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  // useEffect(() => {
  //   requestNotificationPermission();
  // }, [requestNotificationPermission]);
  

  return (
    <View style={{height: "100%",
      width: "100%",
      // backgroundColor: "#00ad6b"
      backgroundImage: "linear-gradient(to bottom, #0a0941 10%, #00ad6b 90%)",}}>
        <View style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '1.5em'}}><Text style={{fontSize: 40, color: 'white', fontFamily: 'Nunito'}}>Welcome, Scouter!</Text></View>
      </View>
  );
}

export default HomeScreen;