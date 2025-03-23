import { Keyboard, Text, SafeAreaView, StyleSheet, View, Pressable, Button, TouchableOpacity, TouchableHighlight, ListView, ScrollView, Platform } from 'react-native';
import { TextInput } from "react-native-web";

import { useEffect, useState } from 'react';

// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationIndependentTree } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import * as FIREBASE from '../../firebaseConfig';
import {requestTBASchedule, requestTBATeams} from '../TBARequest';

let g_matchSchedule = [];
let g_teamsPresent = [];
let g_eventName = '';

const AdminScreen = () => {
    const [eventName, setEventName] = useState('');
    const [matchSchedule, setMatchSchedule] = useState([]);
    const [teamsPresent, setTeamsPresent] = useState([]);

    const [passcode, setPasscode] = useState('');


    return (
        <ScrollView>
            <View><TextInput value={passcode} onChangeText={text => setPasscode(text)}/></View>
          {passcode == 'stayjolley' ? (<View>
            <TextInput style={{
                              backgroundColor: 'lightblue',
                              color: 'black',
                              borderRadius: 'calc(1.5em - 5px)',
                              boxSizing: 'border-box',
                              padding: '5px',
                              width: '50%',
                              height: '100%',
                              textAlign: 'center',
                          }} placeholder="Event Key" value={eventName} onChangeText={(text) => {
                            setEventName(text);
                            g_eventName = text;
                            }} />
            <TouchableOpacity onPress={() => {
                getSchedule(eventName, setMatchSchedule).then(() => window.alert('[Match Schedule] Updated'));
            }}><Text>Update Schedule</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {
                getTeams(eventName, setTeamsPresent).then(() => window.alert('[Event Teams] Updated'));
            }}><Text>Update Teams</Text></TouchableOpacity>
          </View>) : (<Text>Incorrect</Text>)}
        </ScrollView>
      );
}

const getSchedule = async (eventName, setMatchSchedule) => {
    console.log('eventName', eventName);
    console.log(1);
    requestTBASchedule(eventName).then((data) => {
        g_matchSchedule = data;
        setMatchSchedule(data);
        console.log('schedule', data);
        console.log(2)
        FIREBASE.addEmitter().open('schedule')
        .find("event", "==", eventName).delete().commit().then(() => {
            console.log(3)
            data.forEach((match) => FIREBASE.addEmitter().open('schedule').add(match).commit());
        });
    });
}

const getTeams = async (eventName, setTeamsPresent) => {
    console.log('eventName', eventName);
    requestTBATeams(eventName).then((data) => {
        g_teamsPresent = data;
        setTeamsPresent(data);
        console.log('teams', data);
        FIREBASE.addEmitter().open('teams')
        .find('event', '==', eventName).delete().commit().then(() => {
            data.forEach((team) => FIREBASE.addEmitter().open('teams').add(team).commit());
        });
    });
}

export default AdminScreen;