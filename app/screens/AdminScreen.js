import { Keyboard, Text, SafeAreaView, StyleSheet, View, Pressable, Button, TouchableOpacity, TouchableHighlight, ListView, ScrollView, Platform } from 'react-native';
import { TextInput } from "react-native-web";

import { useEffect, useState } from 'react';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import * as FIREBASE from '../../firebaseConfig';

