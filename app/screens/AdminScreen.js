import { Keyboard, Text, SafeAreaView, StyleSheet, View, Pressable, Button, TouchableOpacity, TouchableHighlight, ListView, ScrollView, Platform } from 'react-native';
import { TextInput } from "react-native-web";

import { useEffect, useState } from 'react';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import * as FIREBASE from '../../firebaseConfig';
import requestTBASchedule from '../TBARequest';

let matchSchedule = [];

const AdminScreen = () => {

    return (
        <View>
          <Text>Admin</Text>
        </View>
      );
}

const getSchedule = async () => {
    requestTBASchedule('2025gasta').then((data) => {
        matchSchedule = data;
    });
}

export default AdminScreen;