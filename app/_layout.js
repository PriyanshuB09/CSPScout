// import { Stack } from "expo-router";
import 'react-native-gesture-handler';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import * as FileSystem from 'expo-file-system';
import { registerServiceWorker, checkForUpdate } from './serviceWorkerRegistration';

import HomeScreen from './screens/HomeScreen';
import ScoutScreen from './screens/ScoutScreen';
import AdminScreen from './screens/AdminScreen';
import PitScreen from './screens/PitScreen';

const Drawer = createDrawerNavigator();

// export default function Layout() {
//   return <Stack screenOptions={{ headerShown: false }}/>;
// }

const styles = StyleSheet.create({
  updateBanner: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 1000,
  }
});

export default function Layout() {

  const [manifest, setManifest] = useState(null);
  const [error, setError] = useState(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  // Manifest JSON loading

  useEffect(() => {
      const loadManifest = async () => {
        try {
          let fileContent;
  
          if (Platform.OS === 'web') {
            // Use fetch() on the web
            const response = await fetch('/manifest.json'); // Ensure manifest.json is accessible in the public folder
            if (!response.ok) throw new Error('Failed to fetch manifest.json');
            fileContent = await response.json();
          } else {
            // Use expo-file-system for mobile platforms
            const fileUri = FileSystem.documentDirectory + 'manifest.json';
            const fileContentString = await FileSystem.readAsStringAsync(fileUri);
            fileContent = JSON.parse(fileContentString);
          }
  
          setManifest(fileContent);
        } catch (err) {
          setError('Error reading the manifest: ' + err.message);
        }
      };
  
      loadManifest();
    }, []);


    // Checks for updates every 50 seconds
    useEffect(() => {
      registerServiceWorker(setUpdateAvailable);
  
      const interval = setInterval(() => {
        checkForUpdate();
        console.log('working');
      }, 50000);
  
      return () => clearInterval(interval);
    }, []);

    // Method to unregister current service worker and reload page
  
    const handleUpdate = () => {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((reg) => reg.unregister());
        window.location.reload();
      });
    }

    // error handling

    if (error) {
      return <Text>{error}</Text>;
    }
  
    if (!manifest) {
      return <Text>Loading...</Text>;
    }


  return (
    <NavigationIndependentTree>
      <NavigationContainer>
      <Drawer.Navigator screenOptions={{
        drawerStyle: {
          backgroundColor: '#1E1E1E', // Drawer background color
          width: 200, // Custom width
          color: "#fff"
        },
        drawerContentStyle: {
          backgroundColor: '#5C7AFF', // Inner drawer area color
        },
        drawerActiveTintColor: '#fff', // Active label text color
        drawerInactiveTintColor: '#FFF', // Inactive label text color
        drawerActiveBackgroundColor: '#0a0941', // Active item background color
        headerStyle: {
          backgroundColor: '#0a0941', // Header background color
          height: 40
        },
        headerTintColor: '#FFF',
        headerShown: true,
        headerShadowVisible: false,
        // headerLeft: undefined,
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Scout" component={ScoutScreen}/>
      <Drawer.Screen name="Pit Scout" component={PitScreen}/>
      <Drawer.Screen name="Admin" component={AdminScreen}/>
      </Drawer.Navigator>
      {updateAvailable && (<Text style={styles.updateBanner} onPress={handleUpdate}>Update</Text>)}
      </NavigationContainer>
      </NavigationIndependentTree>
    
  );
}