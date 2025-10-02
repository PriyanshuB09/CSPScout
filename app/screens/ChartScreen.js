import { Text, SafeAreaView, StyleSheet, View, Pressable, Button, TouchableOpacity, TouchableHighlight, ListView, ScrollView, TextInput, Platform } from 'react-native';

import { useEffect, useState } from 'react';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  input: {
    marginLeft: '10px',
    border: 'none',
    padding: '7px',
    boxSizing: 'border-box',
    backgroundColor: 'lightblue',
    fontSize: '14px',
    height: '2em',
    borderRadius: '2em',
    marginRight: '0.3em',
    width: '50%',
    margin: '5px',
    textAlign: 'center'
  },

  view: {
    height: "100%",
    width: "100%",
    // backgroundColor: "#00ad6b"
    backgroundImage: "linear-gradient(to bottom, #0a0941 10%, #00ad6b 90%)",
  },

  container: {
    width: '95%',
    minHeight: '3em',
    backgroundColor: '#a8a8a8',
    borderRadius: '3em',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
  },

  outerButton: {
    marginTop: '0.5em',
    width: '5em',
    height: '3em',
    display: 'flex',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '1.5em',
  },

  innerButton: {
    display: 'flex',
    width: '4.5em',
    color: 'white',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});




const Teams = () => {
  const [eventKey, setEventKey] = useState('');
  const [teamNumber, setTeamNumber] = useState('');

  return (
    <ScrollView style={styles.view}>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Event Key" value={eventKey} onChangeText={text => setEventKey(text)}/>
        <TextInput style={styles.input} keyboardType="numeric" inputType="numeric" placeholder="Team #" value={teamNumber} onChangeText={text => setTeamNumber(text)}/>
        <TouchableOpacity style={styles.outerButton}><Text style={styles.innerButton}>Update</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const Comp = () => {

}

const Matches = () => {

}


const ChartScreen = () => {

  return (
    <View style={{width: '100%', height: '100%'}}>
        <NavigationIndependentTree>
            <Tab.Navigator screenOptions={{ headerShown: true, tabBarStyle: {backgroundColor: "#0a0941"}, tabBarLabelStyle: { fontSize: 14, fontWeight: "bold", color: "#fff" }, tabBarIndicatorStyle: { backgroundColor: "#5C7AFF", height: 4 } }}>
            <Tab.Screen name="Teams" component={Teams} options={{ gestureEnabled: true }}/>
            <Tab.Screen name="Comp" component={Comp} options={{ gestureEnabled: true }}/>
            <Tab.Screen name="Matches" component={Matches} options={{ gestureEnabled: true }}/>
        </Tab.Navigator>
      </NavigationIndependentTree>
    </View>
  );
}

export default ChartScreen;