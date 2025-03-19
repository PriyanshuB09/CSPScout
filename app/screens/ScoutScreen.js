import { Keyboard, Text, SafeAreaView, StyleSheet, View, Pressable, Button, TouchableOpacity, TouchableHighlight, ListView, ScrollView, Platform } from 'react-native';
import { TextInput } from "react-native-web";

import { useEffect, useState } from 'react';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import * as FIREBASE from '../../firebaseConfig';

const Tab = createMaterialTopTabNavigator();

let g_scouterName = '';
let g_startingPosition = '';
let g_allianceColor = '';
let g_alliancePosition = '';
let g_teamNumber = '';
let g_preload = '';
let g_matchNumber = '';

let g_autoMobility = '';
let g_autoL1ReefMade = 0;
let g_autoL2ReefMade = 0;
let g_autoL3ReefMade = 0;
let g_autoL4ReefMade = 0;

let g_autoL1ReefMiss = 0;
let g_autoL2ReefMiss = 0;
let g_autoL3ReefMiss = 0;
let g_autoL4ReefMiss = 0;

let g_autoBarge = 0;
let g_autoProcessor = 0;

let g_teleL1ReefMade = 0;
let g_teleL2ReefMade = 0;
let g_teleL3ReefMade = 0;
let g_teleL4ReefMade = 0;

let g_teleL1ReefMiss = 0;
let g_teleL2ReefMiss = 0;
let g_teleL3ReefMiss = 0;
let g_teleL4ReefMiss = 0;

let g_teleBarge = 0;
let g_teleProcessor = 0;
let g_telePark = '';

let g_notes = '';

const finalSubmit = () => {
  let dataObject = {
    g_allianceColor, g_alliancePosition, g_autoBarge, g_autoL1ReefMade, g_autoL1ReefMiss, g_autoL2ReefMade, g_autoL2ReefMiss, g_autoL3ReefMade, g_autoL3ReefMiss, g_autoL4ReefMade, g_autoL4ReefMiss, g_autoMobility, g_autoProcessor, g_matchNumber, g_notes, g_preload, g_scouterName, g_startingPosition, g_teamNumber, g_teleBarge, g_teleL1ReefMade, g_teleL1ReefMiss, g_teleL2ReefMade, g_teleL2ReefMiss, g_teleL3ReefMade, g_teleL3ReefMiss, g_teleL4ReefMade, g_teleL4ReefMiss, g_telePark, g_teleProcessor
  }
  console.log(dataObject);
  FIREBASE.addEmitter().open('test').add(dataObject).commit().then(() => {
    // useEffect(() => alert('good'), []);
  });
}


// const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  setupDiv: {
    height: "100%",
    width: "100%",
    // backgroundColor: "#00ad6b"
    backgroundImage: "linear-gradient(to bottom, #0a0941 10%, #00ad6b 90%)",
  },
  autoDiv: {
    height: "100%",
    width: "100%",
    // backgroundColor: "#00ad6b"
    backgroundImage: "linear-gradient(to bottom, #0a0941 10%, #00ad6b 90%)",
  },
  teleDiv: {
    height: "100%",
    width: "100%",
    // backgroundColor: "#00ad6b"
    backgroundImage: "linear-gradient(to bottom, #0a0941 10%, #00ad6b 90%)",
  },
  notesDiv: {
    height: "100%",
    width: "100%",
    // backgroundColor: "#00ad6b"
    backgroundImage: "linear-gradient(to bottom, #0a0941 10%, #00ad6b 90%)",
  },
  containerDiv: {
    backgroundColor: 'grey',
    width: '90%',
    minHeight: '1.5em',
    borderRadius: '1.5em',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    padding: '5px',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '1em',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  startingPosition: {
    width: '2.8em',
    height: '2.8em',
    margin: 5,
    borderRadius: 'calc(1.5em - 10px)',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

const Setup = () => {
  const [scouterName, setScouterName] = useState('');
  const [matchNumber, setMatchNumber] = useState('');
  const [allianceColor, setAllianceColor] = useState(null);
  const [startingPosition, setStartingPosition] = useState(0);
  const [alliancePosition, setAlliancePosition] = useState(0);
  const [teamNumber, setTeamNumber] = useState('');
  const [preload, setPreload] = useState(0);

  return (
      <ScrollView style={styles.setupDiv}>
          <View style={styles.containerDiv}>
              <Text style={{
                alignContent: 'center',
                display: 'flex',
                width: '50%',
                height: '100%',
                paddingTop: 'auto',
                paddingBottom: 'auto',
                textAlign: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>Scouter Name: </Text>
              <TextInput style={{
                  backgroundColor: 'lightblue',
                  color: 'black',
                  borderRadius: 'calc(1.5em - 5px)',
                  boxSizing: 'border-box',
                  padding: '5px',
                  width: '50%',
                  height: '100%',
                  textAlign: 'center',
              }} placeholder="Name" value={scouterName} onChangeText={(text) => {
                setScouterName(text);
                g_scouterName = text;
                }} />
          </View>
          <View style={styles.containerDiv}>
            <View style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              boxSizing: 'border-box',
              padding: '5px',
              backgroundColor: 'white',
              borderRadius: 'calc(1.5em - 5px)',
              alignItems: 'center',
              width: '22.5%',
              height: '100%',
            }}>
              <TouchableOpacity style={
                [styles.startingPosition, (startingPosition != 1) ? {backgroundColor: 'grey'} : {backgroundColor: 'lightgrey'}]
                } onPress={() => {
                setStartingPosition(1);
                g_startingPosition = 'far';
              }}><Text style={styles.startingPosition}>Far</Text></TouchableOpacity>
              <TouchableOpacity style={
                [styles.startingPosition, (startingPosition != 2) ? {backgroundColor: 'grey'} : {backgroundColor: 'lightgrey'}]
                } onPress={() => {
                setStartingPosition(2);
                g_startingPosition = 'mid';
              }}><Text style={styles.startingPosition}>Mid</Text></TouchableOpacity>
              <TouchableOpacity style={
                [styles.startingPosition, (startingPosition != 3) ? {backgroundColor: 'grey'} : {backgroundColor: 'lightgrey'}]
                } onPress={() => {
                setStartingPosition(3);
                g_startingPosition = 'near';
              }}><Text style={styles.startingPosition}>Near</Text></TouchableOpacity>
              <TouchableOpacity style={
                [styles.startingPosition, (startingPosition != 4) ? {backgroundColor: 'grey'} : {backgroundColor: 'lightgrey'}]
                } onPress={() => {
                setStartingPosition(4);
                g_startingPosition = 'na';
              }}><Text style={styles.startingPosition}>N/A</Text></TouchableOpacity>
            </View>
      
            <View style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              boxSizing: 'border-box',
              padding: '5px',
              backgroundColor: 'white',
              borderRadius: 'calc(1.5em - 5px)',
              alignItems: 'center',
              width: '75%',

            }}>
              <View style={{
                display: 'flex',
                backgroundColor: '#a8a8a8',
                width: '100%',
                height: '4em',
                // borderRadius: 'calc(1.5em - 10px) calc(1.5em - 10px) 0 0',
                borderTopLeftRadius: 'calc(1.5em - 10px)',
                borderTopRightRadius: 'calc(1.5em - 10px)',
                flexDirection: 'row',
                boxSizing: 'border-box',
                padding: 5,
              }}>
                <Text style={{
                alignContent: 'center',
                display: 'flex',
                width: '50%',
                height: '100%',
                paddingTop: 'auto',
                paddingBottom: 'auto',
                textAlign: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>Match: </Text>
                <TextInput style={{
                  backgroundColor: 'lightblue',
                  color: 'black',
                  borderRadius: 'calc(1.5em - 5px)',
                  boxSizing: 'border-box',
                  padding: '5px',
                  width: '50%',
                  height: '100%',
                  textAlign: 'center',
              }} placeholder="#" value={matchNumber} keyboardType="numeric" onChangeText={(text) => {
                setMatchNumber(text);
                g_matchNumber = text;
                }} />
              </View>
              <View style={{
                display: 'flex',
                backgroundColor: '#a8a8a8',
                width: '100%',
                height: '4em',
                flexDirection: 'row',
                boxSizing: 'border-box',
                padding: 5,
                alignItems: 'center',
                alignContent: 'center',
                textAlign: 'center',
                justifyContent: 'space-evenly',
              }}>
                <TouchableOpacity style={[{
                  display: 'flex',
                  padding: 5,
                  height: '2.25em',
                  width: '35%',
                  borderRadius: '2.25em',
                  textAlign: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  
                }, (allianceColor) ? {backgroundColor: "#7e3631"} : {backgroundColor: "#b44d45"}]} onPress={() => {
                  setAllianceColor(false);
                  g_allianceColor = 'red';
                  }}><Text style={{
                color: 'white',
                height: '100%',
                textAlign: 'center',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                }}>Red</Text></TouchableOpacity>
                <TouchableOpacity style={[{
                  display: 'flex',
                  padding: 5,
                  height: '2.25em',
                  width: '35%',
                  borderRadius: '2.25em',
                  textAlign: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }, (!allianceColor) ? {backgroundColor: "#2e3978"} : {backgroundColor: "#4555b4"}]} onPress={() => {
                  setAllianceColor(true);
                  g_allianceColor = 'blue';
                  }}><Text style={{
                color: 'white',
                height: '100%',
                textAlign: 'center',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                }}>Blue</Text></TouchableOpacity>
              </View>
              <View style={{
                ddisplay: 'flex',
                backgroundColor: '#a8a8a8',
                width: '100%',
                height: '4em',
                flexDirection: 'row',
                boxSizing: 'border-box',
                padding: 5,
                justifyContent: 'space-evenly'
              }}>
              <TouchableOpacity style={[{
                width: "2em",
                height: "2em",
                borderRadius: '50%',
              }, (alliancePosition != 1) ? {backgroundColor: 'grey'} : {backgroundColor: 'lightgrey'}]} onPress={() => {
                setAlliancePosition(1);
                g_alliancePosition = '1';
              }}><Text style={{
                textAlign: 'center',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '2em'
              }}>1</Text></TouchableOpacity>
              <TouchableOpacity style={[{
                width: "2em",
                height: "2em",
                borderRadius: '50%',
              }, (alliancePosition != 2) ? {backgroundColor: 'grey'} : {backgroundColor: 'lightgrey'}]} onPress={() => {
                setAlliancePosition(2);
                g_alliancePosition = '2';
              }}><Text style={{
                textAlign: 'center',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '2em'
              }}>2</Text></TouchableOpacity>
              <TouchableOpacity style={[{
                width: "2em",
                height: "2em",
                borderRadius: '50%',
              }, (alliancePosition != 3) ? {backgroundColor: 'grey'} : {backgroundColor: 'lightgrey'}]} onPress={() => {
                setAlliancePosition(3);
                g_alliancePosition = '3';
              }}><Text style={{
                textAlign: 'center',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '2em'
              }}>3</Text></TouchableOpacity>
              </View>
              <View style={{
                ddisplay: 'flex',
                backgroundColor: '#a8a8a8',
                width: '100%',
                height: '4em',
                flexDirection: 'row',
                boxSizing: 'border-box',
                padding: 5,
                justifyContent: 'space-evenly'
              }}>
                <Text style={{
                alignContent: 'center',
                display: 'flex',
                width: '50%',
                height: '100%',
                paddingTop: 'auto',
                paddingBottom: 'auto',
                textAlign: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>Team: </Text>
                <TextInput style={{
                  backgroundColor: 'lightblue',
                  color: 'black',
                  borderRadius: 'calc(1.5em - 5px)',
                  boxSizing: 'border-box',
                  padding: '5px',
                  width: '50%',
                  height: '100%',
                  textAlign: 'center',
              }} placeholder="#" value={teamNumber} keyboardType="numeric" onChangeText={(text) => {
                setTeamNumber(text);
                g_teamNumber = text;
                }} />
              </View>
              <View style={{
                display: 'flex',
                backgroundColor: '#a8a8a8',
                width: '100%',
                height: 'calc(1.5em + 10px)',
                // borderRadius: 'calc(1.5em - 10px) calc(1.5em - 10px) 0 0',
                borderBottomLeftRadius: 'calc(1.5em - 10px)',
                borderBottomRightRadius: 'calc(1.5em - 10px)',
                flexDirection: 'row',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                padding: 5,
              }}>
                <Text style={{
                  width: '30%',
                  height: '100%',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>Preload: </Text>
                <View style={{
                  width: '65%',
                  height: '1.5em',
                  padding: 0,
                  display: 'flex',
                  borderRadius: '4em',
                  flexDirection: 'row',
                }}>
                  <TouchableOpacity style={[{
                    height: '100%',
                    width: '50%',
                    borderTopLeftRadius: '1.5em',
                    borderBottomLeftRadius: '1.5em',
                  }, (preload != 1) ? {backgroundColor: 'gainsboro'} : {backgroundColor: 'seagreen'} ]} onPress={() => {
                    setPreload(1);
                    g_preload = 'yes';
                  }}>
                    <Text style={{
                      textAlign: 'center',
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>Yes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[{
                    height: '100%',
                    width: '50%',
                    borderTopRightRadius: '1.5em',
                    borderBottomRightRadius: '1.5em',
                  }, (preload != 2) ? {backgroundColor: 'gainsboro'} : {backgroundColor: 'seagreen'} ]} onPress={() => {
                    setPreload(2);
                    g_preload = 'no';
                  }}>
                    <Text style={{
                      textAlign: 'center',
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
      </ScrollView>
  );
}

const Auto = () => {
const [autoMobility, setAutoMobility] = useState(0);
const [autoL1ReefMade, setAutoL1ReefMade] = useState(0);
const [autoL1ReefMiss, setAutoL1ReefMiss] = useState(0);

const [autoL2ReefMade, setAutoL2ReefMade] = useState(0);
const [autoL2ReefMiss, setAutoL2ReefMiss] = useState(0);

const [autoL3ReefMade, setAutoL3ReefMade] = useState(0);
const [autoL3ReefMiss, setAutoL3ReefMiss] = useState(0);

const [autoL4ReefMade, setAutoL4ReefMade] = useState(0);
const [autoL4ReefMiss, setAutoL4ReefMiss] = useState(0);

const [autoBarge, setAutoBarge] = useState(0);
const [autoProcessor, setAutoProcessor] = useState(0);

return (
  <ScrollView style={styles.autoDiv}>
     <View style={{
        display: 'flex',
        backgroundColor: '#a8a8a8',
        width: '95%',
        height: 'calc(1.5em + 10px)',
        // borderRadius: 'calc(1.5em - 10px) calc(1.5em - 10px) 0 0',
        borderBottomLeftRadius: 'calc(1.5em - 10px)',
        borderBottomRightRadius: 'calc(1.5em - 10px)',
        borderTopLeftRadius: 'calc(1.5em - 10px)',
        borderTopRightRadius: 'calc(1.5em - 10px)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        boxSizing: 'border-box',
        padding: 5,
        marginTop: "1em",
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <Text style={{
          width: '35%',
          height: '100%',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>Auto Mobility: </Text>
        <View style={{
          width: '60%',
          height: '1.5em',
          padding: 0,
          display: 'flex',
          borderRadius: '4em',
          flexDirection: 'row',
        }}>
          <TouchableOpacity style={[{
            height: '100%',
            width: '50%',
            borderTopLeftRadius: '1.5em',
            borderBottomLeftRadius: '1.5em',
          }, (autoMobility != 1) ? {backgroundColor: 'gainsboro'} : {backgroundColor: 'seagreen'} ]} onPress={() => {
            setAutoMobility(1);
            g_autoMobility = 'yes';
          }}>
            <Text style={{
              textAlign: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[{
            height: '100%',
            width: '50%',
            borderTopRightRadius: '1.5em',
            borderBottomRightRadius: '1.5em',
          }, (autoMobility != 2) ? {backgroundColor: 'gainsboro'} : {backgroundColor: 'seagreen'} ]} onPress={() => {
            setAutoMobility(2);
            g_autoMobility = 'no';
          }}>
            <Text style={{
              textAlign: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={scoring.autoReef}>
        <View style={scoring.reef}>
          <View style={scoring.reefInfo}>
            <Text style={[scoring.reefInfoLevel, scoring.reefInfoChildren]}>L1</Text>
            <Text style={[scoring.reefInfoMiss, scoring.reefInfoChildren]}>Miss</Text>
          </View>
          <View style={scoring.reefInputContainer}>
            <View style={scoring.reefInputMade}>
              <Text style={scoring.reefMadeNumber}>{autoL1ReefMade}</Text>
              <TouchableOpacity style={scoring.reefMadeButton} onPress={() => {
                setAutoL1ReefMade(autoL1ReefMade + 1);
                g_autoL1ReefMade++
                }}><Text style={scoring.reefMadeButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMadeButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]} onPress={() => {
                setAutoL1ReefMade(autoL1ReefMade - 1);
                g_autoL1ReefMade--;
              }}><Text style={[scoring.reefMadeButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]}>-</Text></TouchableOpacity>
            </View>
            <View style={scoring.reefInputMiss}>
              <Text style={scoring.reefMissNumber}>{autoL1ReefMiss}</Text>
              <TouchableOpacity style={scoring.reefMissButton} onPress={() => {
                setAutoL1ReefMiss(autoL1ReefMiss + 1);
                g_autoL1ReefMiss++;
              }}><Text style={scoring.reefMissButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMissButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]} onPress={() => {
                setAutoL1ReefMiss(autoL1ReefMiss - 1);
                g_autoL1ReefMiss--;
                }}><Text style={[scoring.reefMissButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]}>-</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={scoring.reef}>
          <View style={scoring.reefInfo}>
            <Text style={[scoring.reefInfoLevel, scoring.reefInfoChildren]}>L2</Text>
            <Text style={[scoring.reefInfoMiss, scoring.reefInfoChildren]}>Miss</Text>
          </View>
          <View style={scoring.reefInputContainer}>
            <View style={scoring.reefInputMade}>
              <Text style={scoring.reefMadeNumber}>{autoL2ReefMade}</Text>
              <TouchableOpacity style={scoring.reefMadeButton} onPress={() => {
                setAutoL2ReefMade(autoL2ReefMade + 1);
                g_autoL2ReefMade++
                }}><Text style={scoring.reefMadeButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMadeButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]} onPress={() => {
                setAutoL2ReefMade(autoL2ReefMade - 1);
                g_autoL2ReefMade--
                }}><Text style={[scoring.reefMadeButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]}>-</Text></TouchableOpacity>
            </View>
            <View style={scoring.reefInputMiss}>
              <Text style={scoring.reefMissNumber}>{autoL2ReefMiss}</Text>
              <TouchableOpacity style={scoring.reefMissButton} onPress={() => {
                setAutoL2ReefMiss(autoL2ReefMiss + 1);
                g_autoL2ReefMiss++
                }}><Text style={scoring.reefMissButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMissButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]} onPress={() => {
                setAutoL2ReefMiss(autoL2ReefMiss - 1);
                g_autoL2ReefMiss--
                }}><Text style={[scoring.reefMissButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]}>-</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={scoring.reef}>
          <View style={scoring.reefInfo}>
            <Text style={[scoring.reefInfoLevel, scoring.reefInfoChildren]}>L3</Text>
            <Text style={[scoring.reefInfoMiss, scoring.reefInfoChildren]}>Miss</Text>
          </View>
          <View style={scoring.reefInputContainer}>
            <View style={scoring.reefInputMade}>
              <Text style={scoring.reefMadeNumber}>{autoL3ReefMade}</Text>
              <TouchableOpacity style={scoring.reefMadeButton} onPress={() => {
                setAutoL3ReefMade(autoL3ReefMade + 1);
                g_autoL3ReefMade++
                }}><Text style={scoring.reefMadeButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMadeButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]} onPress={() => {
                setAutoL3ReefMade(autoL3ReefMade - 1);
                g_autoL3ReefMade--
                }}><Text style={[scoring.reefMadeButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]}>-</Text></TouchableOpacity>
            </View>
            <View style={scoring.reefInputMiss}>
              <Text style={scoring.reefMissNumber}>{autoL3ReefMiss}</Text>
              <TouchableOpacity style={scoring.reefMissButton} onPress={() => {
                setAutoL3ReefMiss(autoL3ReefMiss + 1);
                g_autoL3ReefMiss++
                }}><Text style={scoring.reefMissButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMissButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]} onPress={() => {
                setAutoL3ReefMiss(autoL3ReefMiss - 1);
                g_autoL3ReefMiss--
                }}><Text style={[scoring.reefMissButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]}>-</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[scoring.reef, {marginBottom: 0}]}>
          <View style={scoring.reefInfo}>
            <Text style={[scoring.reefInfoLevel, scoring.reefInfoChildren]}>L4</Text>
            <Text style={[scoring.reefInfoMiss, scoring.reefInfoChildren]}>Miss</Text>
          </View>
          <View style={scoring.reefInputContainer}>
            <View style={scoring.reefInputMade}>
              <Text style={scoring.reefMadeNumber}>{autoL4ReefMade}</Text>
              <TouchableOpacity style={scoring.reefMadeButton} onPress={() => {
                setAutoL4ReefMade(autoL4ReefMade + 1);
                g_autoL4ReefMade++
                }}><Text style={scoring.reefMadeButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMadeButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]} onPress={() => {
                setAutoL4ReefMade(autoL4ReefMade - 1);
                g_autoL4ReefMade--
                }}><Text style={[scoring.reefMadeButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]}>-</Text></TouchableOpacity>
            </View>
            <View style={scoring.reefInputMiss}>
              <Text style={scoring.reefMissNumber}>{autoL4ReefMiss}</Text>
              <TouchableOpacity style={scoring.reefMissButton} onPress={() => {
                setAutoL4ReefMiss(autoL4ReefMiss + 1);
                g_autoL4ReefMiss++
                }}><Text style={scoring.reefMissButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMissButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]} onPress={() => {
                setAutoL4ReefMiss(autoL4ReefMiss - 1);
                g_autoL4ReefMiss--
                }}><Text style={[scoring.reefMissButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]}>-</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    <View style={scoring.autoOther}>
      <View style={scoring.autoProcessor}>
        <Text style={scoring.autoSpan}>Processor</Text>
        <View style={scoring.autoProcessorGroup}>
          <Text style={scoring.autoProcessorNumber}>{autoProcessor}</Text>
          <TouchableOpacity style={{width: '35%'}} onPress={() => {
            setAutoProcessor(autoProcessor + 1);
            g_autoProcessor++;
            }}><Text style={scoring.autoProcessorUp}>+</Text></TouchableOpacity>
          <TouchableOpacity style={{width: '35%'}} onPress={() => {
            setAutoProcessor(autoProcessor - 1);
            g_autoProcessor--;
            }}><Text style={scoring.autoProcessorDown}>-</Text></TouchableOpacity>
        </View>
      </View>
      <View style={scoring.autoBarge}>
        <Text style={scoring.autoSpan}>Barge</Text>
        <View style={scoring.autoBargeGroup}>
          <Text style={scoring.autoBargeNumber}>{autoBarge}</Text>
          <TouchableOpacity style={{width: '35%'}} onPress={() => {
            setAutoBarge(autoBarge + 1);
            g_autoBarge++;
            }}><Text style={scoring.autoBargeUp}>+</Text></TouchableOpacity>
          <TouchableOpacity style={{width: '35%'}} onPress={() => {
            setAutoBarge(autoBarge - 1);
            g_autoBarge--;
            }}><Text style={scoring.autoBargeDown}>-</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  </ScrollView>
);
}

const scoring = StyleSheet.create({
autoReef: {
  display: 'flex',
  width: '90%',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: '#f1efed',
  minHeight: '2em',
  boxSizing: 'border-box',
  marginTop: '1em',
  marginBottom: '1em',
  flexDirection: 'column',
  flexWrap: 'wrap',
  padding: 5,
  borderRadius: 20,
},
reef: {
  display: 'flex',
  width: '100%',
  height: '5em',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignContent: 'center',
  justifyContent: 'space-between',
  padding: 5,
  boxSizing: 'border-box',
  backgroundColor: '#a8a8a8',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: 5,
  borderRadius: 15,
  alignItems: 'center',
},
reefInfo: {
  width: '20%',
  justifyContent: 'space-around',
  alignContent: 'center',
  textAlign: 'center',
  boxSizing: 'border-box',
  padding: 5,
  height: '100%',
  alignItems: 'center',
  flexDirection: 'column',
},

reefInfoLevel: {
  borderTopLeftRadius: 7,
  borderTopRightRadius: 7,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
},

reefInfoMiss: {
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 7,
  borderBottomRightRadius: 7,
},

reefInfoChildren: {
  alignContent: 'center',
  textAlign: 'center',
  backgroundColor: 'gainsboro',
  height: '50%',
  width: '100%',
},

reefInputContainer: {
  display: 'flex',
  flexWrap: 'no-wrap',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  width: '80%',
},

reefInputMade: {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  width: '100%',
  alignItems: 'end',
},

reefInputMiss: {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  width: '100%',
  alignItems: 'start',
},

reefMadeNumber: {
  backgroundColor: 'seagreen',
  height: '2.25em',
  width: '20%',
  borderTopLeftRadius: 10,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  textAlign: 'center',
  alignContent: 'center',
},

reefMissNumber: {
  backgroundColor: '#7e3631',
  height: '2.25em',
  width: '20%',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 0,
  textAlign: 'center',
  alignContent: 'center',
},

reefMadeButton: {
  width: '40%',
  alignContent: 'center',
  textAlign: 'center',
},

reefMissButton: {
  width: '40%',
  alignContent: 'center',
  textAlign: 'center',
},

reefMadeButtonText: {
  backgroundColor: '#56B37F',
  height: '2.25em',
  width: '100%',
  alignContent: 'center',
  textAlign: 'center',
},

reefMissButtonText: {
  backgroundColor: "#B06863",
  height: '100%',
  height: '2.25em',
  width: '100%',
  alignContent: 'center',
  textAlign: 'center',
},

autoOther: {
  backgroundColor: '#f1efed',
  width: "90%",
  marginLeft: 'auto',
  marginRight: 'auto',
  boxSizing: 'border-box',
  padding: 5,
  borderRadius: 20,
},

autoBarge: {
  display: 'flex',
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  height: '3em',
  boxSizing: 'border-box',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  backgroundColor: '#a8a8a8',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
},

autoProcessor: {
  display: 'flex',
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  height: '3em',
  boxSizing: 'border-box',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  backgroundColor: '#a8a8a8',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
},

autoBargeGroup: {
  width: 'calc(100% - 8em)',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  alignItems: 'start',
},

autoProcessorGroup: {
  width: 'calc(100% - 8em)',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  alignItems: 'end',
},

autoSpan: {
  alignContent: 'center',
  textAlign: 'center',
  width: '8em',
},

autoProcessorNumber: {
  backgroundColor: 'grey',
  height: '2.5em',
  width: '100%',
  alignContent: 'center',
  textAlign: 'center',
  borderTopLeftRadius: 10,
},

autoBargeNumber: {
  backgroundColor: 'grey',
  height: '2.5em',
  width: '100%',
  alignContent: 'center',
  textAlign: 'center',
  borderBottomLeftRadius: 10,
},

autoProcessorUp: {
  backgroundColor: 'lightgrey',
  height: '2.5em',
  width: '100%',
  alignContent: 'center',
  textAlign: 'center',
},

autoProcessorDown: {
  backgroundColor: 'lightgrey',
  height: '2.5em',
  width: '100%',
  alignContent: 'center',
  textAlign: 'center',
  borderTopRightRadius: 10,
},

autoBargeUp: {
  backgroundColor: 'lightgrey',
  height: '2.5em',
  width: '100%',
  alignContent: 'center',
  textAlign: 'center',
},

autoBargeDown: {
  backgroundColor: 'lightgrey',
  height: '2.5em',
  width: '100%',
  alignContent: 'center',
  textAlign: 'center',
  borderBottomRightRadius: 10,
},

telePark: {
  display: 'flex',
  width: '90%',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: '#f1efed',
  height: 'calc(8em)',
  boxSizing: 'border-box',
  marginTop: '1em',
  marginBottom: '1em',
  flexDirection: 'column',
  flexWrap: 'wrap',
  padding: 5,
  justifyContent: 'space-between',
  zIndex: 1,
  borderRadius: 20,
  marginBottom: '10em',
},

otherPark: {
  display: 'flex',
  width: '100%;',
  backgroundColor: '#a8a8a8',
  height: '4em',
  boxSizing: 'border-box',
  flexWrap: 'wrap',
  flexDirection: 'row',
  padding: '5px',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderRadius: '15px',
},

otherParkDiv: {
  backgroundColor: 'lightgrey',
  height: '2.5em',
  width: '4em',
  alignContent: 'center',
  textAlign: 'center',
  borderRadius: '15px',
  color: 'black',
},

otherParkLack: {
  borderRadius: '15px',
  color: 'black',
  backgroundColor: 'gainsboro',
  justifyContent: 'center',
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
}
});

const Tele = () => {
const [teleMobility, setTeleMobility] = useState(0);
const [teleL1ReefMade, setTeleL1ReefMade] = useState(0);
const [teleL1ReefMiss, setTeleL1ReefMiss] = useState(0);

const [teleL2ReefMade, setTeleL2ReefMade] = useState(0);
const [teleL2ReefMiss, setTeleL2ReefMiss] = useState(0);

const [teleL3ReefMade, setTeleL3ReefMade] = useState(0);
const [teleL3ReefMiss, setTeleL3ReefMiss] = useState(0);

const [teleL4ReefMade, setTeleL4ReefMade] = useState(0);
const [teleL4ReefMiss, setTeleL4ReefMiss] = useState(0);

const [teleBarge, setTeleBarge] = useState(0);
const [teleProcessor, setTeleProcessor] = useState(0);

const [telePark, setTelePark] = useState(0);

return (
  <ScrollView style={styles.teleDiv}>
      <View style={scoring.autoReef}>
        <View style={scoring.reef}>
          <View style={scoring.reefInfo}>
            <Text style={[scoring.reefInfoLevel, scoring.reefInfoChildren]}>L1</Text>
            <Text style={[scoring.reefInfoMiss, scoring.reefInfoChildren]}>Miss</Text>
          </View>
          <View style={scoring.reefInputContainer}>
            <View style={scoring.reefInputMade}>
              <Text style={scoring.reefMadeNumber}>{teleL1ReefMade}</Text>
              <TouchableOpacity style={scoring.reefMadeButton} onPress={() => {
                setTeleL1ReefMade(teleL1ReefMade + 1);
                g_teleL1ReefMade++;
                }}><Text style={scoring.reefMadeButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMadeButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]} onPress={() => {
                setTeleL1ReefMade(teleL1ReefMade - 1);
                g_teleL1ReefMade--;
              }}><Text style={[scoring.reefMadeButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]}>-</Text></TouchableOpacity>
            </View>
            <View style={scoring.reefInputMiss}>
              <Text style={scoring.reefMissNumber}>{teleL1ReefMiss}</Text>
              <TouchableOpacity style={scoring.reefMissButton} onPress={() => {
                setTeleL1ReefMiss(teleL1ReefMiss + 1);
                g_teleL1ReefMiss++;
              }}><Text style={scoring.reefMissButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMissButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]} onPress={() => {
                setTeleL1ReefMiss(teleL1ReefMiss - 1);
                g_teleL1ReefMiss--;
                }}><Text style={[scoring.reefMissButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]}>-</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={scoring.reef}>
          <View style={scoring.reefInfo}>
            <Text style={[scoring.reefInfoLevel, scoring.reefInfoChildren]}>L2</Text>
            <Text style={[scoring.reefInfoMiss, scoring.reefInfoChildren]}>Miss</Text>
          </View>
          <View style={scoring.reefInputContainer}>
            <View style={scoring.reefInputMade}>
              <Text style={scoring.reefMadeNumber}>{teleL2ReefMade}</Text>
              <TouchableOpacity style={scoring.reefMadeButton} onPress={() => {
                setTeleL2ReefMade(teleL2ReefMade + 1);
                g_teleL2ReefMade++
                }}><Text style={scoring.reefMadeButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMadeButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]} onPress={() => {
                setTeleL2ReefMade(teleL2ReefMade - 1);
                g_teleL2ReefMade--
                }}><Text style={[scoring.reefMadeButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]}>-</Text></TouchableOpacity>
            </View>
            <View style={scoring.reefInputMiss}>
              <Text style={scoring.reefMissNumber}>{teleL2ReefMiss}</Text>
              <TouchableOpacity style={scoring.reefMissButton} onPress={() => {
                setTeleL2ReefMiss(teleL2ReefMiss + 1);
                g_teleL2ReefMiss++
                }}><Text style={scoring.reefMissButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMissButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]} onPress={() => {
                setTeleL2ReefMiss(teleL2ReefMiss - 1);
                g_teleL2ReefMiss--
                }}><Text style={[scoring.reefMissButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]}>-</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={scoring.reef}>
          <View style={scoring.reefInfo}>
            <Text style={[scoring.reefInfoLevel, scoring.reefInfoChildren]}>L3</Text>
            <Text style={[scoring.reefInfoMiss, scoring.reefInfoChildren]}>Miss</Text>
          </View>
          <View style={scoring.reefInputContainer}>
            <View style={scoring.reefInputMade}>
              <Text style={scoring.reefMadeNumber}>{teleL3ReefMade}</Text>
              <TouchableOpacity style={scoring.reefMadeButton} onPress={() => {
                setTeleL3ReefMade(teleL3ReefMade + 1);
                g_teleL3ReefMade++
                }}><Text style={scoring.reefMadeButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMadeButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]} onPress={() => {
                setTeleL3ReefMade(teleL3ReefMade - 1);
                g_teleL3ReefMade--
                }}><Text style={[scoring.reefMadeButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]}>-</Text></TouchableOpacity>
            </View>
            <View style={scoring.reefInputMiss}>
              <Text style={scoring.reefMissNumber}>{teleL3ReefMiss}</Text>
              <TouchableOpacity style={scoring.reefMissButton} onPress={() => {
                setTeleL3ReefMiss(teleL3ReefMiss + 1);
                g_teleL3ReefMiss++
                }}><Text style={scoring.reefMissButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMissButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]} onPress={() => {
                setTeleL3ReefMiss(teleL3ReefMiss - 1);
                g_teleL3ReefMiss--
                }}><Text style={[scoring.reefMissButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]}>-</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[scoring.reef, {marginBottom: 0}]}>
          <View style={scoring.reefInfo}>
            <Text style={[scoring.reefInfoLevel, scoring.reefInfoChildren]}>L4</Text>
            <Text style={[scoring.reefInfoMiss, scoring.reefInfoChildren]}>Miss</Text>
          </View>
          <View style={scoring.reefInputContainer}>
            <View style={scoring.reefInputMade}>
              <Text style={scoring.reefMadeNumber}>{teleL4ReefMade}</Text>
              <TouchableOpacity style={scoring.reefMadeButton} onPress={() => {
                setTeleL4ReefMade(teleL4ReefMade + 1);
                g_teleL4ReefMade++
                }}><Text style={scoring.reefMadeButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMadeButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]} onPress={() => {
                setTeleL4ReefMade(teleL4ReefMade - 1);
                g_teleL4ReefMade--
                }}><Text style={[scoring.reefMadeButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }]}>-</Text></TouchableOpacity>
            </View>
            <View style={scoring.reefInputMiss}>
              <Text style={scoring.reefMissNumber}>{teleL4ReefMiss}</Text>
              <TouchableOpacity style={scoring.reefMissButton} onPress={() => {
                setTeleL4ReefMiss(teleL4ReefMiss + 1);
                g_teleL4ReefMiss++
                }}><Text style={scoring.reefMissButtonText}>+</Text></TouchableOpacity>
              <TouchableOpacity style={[scoring.reefMissButton, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]} onPress={() => {
                setTeleL4ReefMiss(teleL4ReefMiss - 1);
                g_teleL4ReefMiss--
                }}><Text style={[scoring.reefMissButtonText, {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              }]}>-</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    <View style={scoring.autoOther}>
      <View style={scoring.autoProcessor}>
        <Text style={scoring.autoSpan}>Processor</Text>
        <View style={scoring.autoProcessorGroup}>
          <Text style={scoring.autoProcessorNumber}>{teleProcessor}</Text>
          <TouchableOpacity style={{width: '35%'}} onPress={() => {
            setTeleProcessor(teleProcessor + 1);
            g_teleProcessor++;
            }}><Text style={scoring.autoProcessorUp}>+</Text></TouchableOpacity>
          <TouchableOpacity style={{width: '35%'}} onPress={() => {
            setTeleProcessor(teleProcessor - 1);
            g_teleProcessor--;
            }}><Text style={scoring.autoProcessorDown}>-</Text></TouchableOpacity>
        </View>
      </View>
      <View style={scoring.autoBarge}>
        <Text style={scoring.autoSpan}>Barge</Text>
        <View style={scoring.autoBargeGroup}>
          <Text style={scoring.autoBargeNumber}>{teleBarge}</Text>
          <TouchableOpacity style={{width: '35%'}} onPress={() => {
            setTeleBarge(teleBarge + 1);
            g_teleBarge++;
            }}><Text style={scoring.autoBargeUp}>+</Text></TouchableOpacity>
          <TouchableOpacity style={{width: '35%'}} onPress={() => {
            setTeleBarge(teleBarge - 1);
            g_teleBarge--;
            }}><Text style={scoring.autoBargeDown}>-</Text></TouchableOpacity>
        </View>
      </View>
    </View>

    <View style={scoring.telePark}>
      <View style={scoring.otherPark}>
        <Text style={[{width: '5em'}, scoring.otherParkLack]}>Park: </Text>
        <TouchableOpacity style={[scoring.otherParkDiv, (telePark != 1) ? {backgroundColor: 'lightgrey'} : {backgroundColor: 'seagreen'}]} onPress={() => {
          setTelePark(1);
          g_telePark = 'none';
        }}><Text style={[scoring.otherParkDiv, (telePark != 1) ? {backgroundColor: 'lightgrey'} : {backgroundColor: 'seagreen'}]}>None</Text></TouchableOpacity>
        <TouchableOpacity style={[scoring.otherParkDiv, (telePark != 2) ? {backgroundColor: 'lightgrey'} : {backgroundColor: 'seagreen'}]} onPress={() => {
          setTelePark(2);
          g_telePark = 'ground';
        }}><Text style={[scoring.otherParkDiv, (telePark != 2) ? {backgroundColor: 'lightgrey'} : {backgroundColor: 'seagreen'}]}>Ground</Text></TouchableOpacity>
        <TouchableOpacity style={[scoring.otherParkDiv, (telePark != 3) ? {backgroundColor: 'lightgrey'} : {backgroundColor: 'seagreen'}]} onPress={() => {
          setTelePark(3);
          g_telePark = 'climb';
        }}><Text style={[scoring.otherParkDiv, (telePark != 3) ? {backgroundColor: 'lightgrey'} : {backgroundColor: 'seagreen'}]}>Climb</Text></TouchableOpacity>
      </View>
    </View>
  </ScrollView>
);
}

const Notes = () => {
const [notes, setNotes] = useState('');

return (
  <ScrollView style={styles.notesDiv}>
    <TextInput style={{
                  backgroundColor: 'lightblue',
                  color: 'black',
                  borderRadius: 'calc(1.5em - 5px)',
                  boxSizing: 'border-box',
                  padding: '5px',
                  width: '90%',
                  height: '15em',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '1em',
              }} placeholder="Notes" value={notes} multiline={true} onChangeText={(text) => {
                setNotes(text);
                g_notes = text;
                }} />
    <TouchableOpacity style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '1em',
      width: '5em',
      height: '2em',
      padding: 10,
      borderRadius: '2em',
      backgroundColor: 'lightblue'
    }} onPress={finalSubmit}><Text style={{
      textAlign: 'center',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '2em'
    }}>Submit</Text></TouchableOpacity>
  </ScrollView>
);
}


const ScoutScreen = () => {

  // useEffect(() => {
  //   if (Platform.OS === 'web') {
  //     document.body.webkitUserSelect = 'none';
  //     document.body.mozUserSelect = 'none';
  //     document.body.msUserSelect = 'none';
  //     document.body.userSelect = 'none';
  //   }
  // }, []);

  return (
    <View style={{width: '100%', height: '100%'}}>
        <NavigationIndependentTree>
            <Tab.Navigator screenOptions={{ headerShown: true, tabBarStyle: {backgroundColor: "#0a0941"}, tabBarLabelStyle: { fontSize: 14, fontWeight: "bold", color: "#fff" }, tabBarIndicatorStyle: { backgroundColor: "#5C7AFF", height: 4 } }}>
            <Tab.Screen name="Setup" component={Setup} options={{ gestureEnabled: true }}/>
            <Tab.Screen name="Auto" component={Auto} options={{ gestureEnabled: true }}/>
            <Tab.Screen name="Tele" component={Tele} options={{ gestureEnabled: true }}/>
            <Tab.Screen name="Notes" component={Notes} options={{ gestureEnabled: true }}/>
        </Tab.Navigator>
      </NavigationIndependentTree>
    </View>
  );
}

export default ScoutScreen;