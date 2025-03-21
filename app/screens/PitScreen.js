import { Text, SafeAreaView, StyleSheet, View, Pressable, Button, TouchableOpacity, TouchableHighlight, ListView, ScrollView, Platform } from 'react-native';
import { TextInput } from "react-native-web";

import DropDownPicker from 'react-native-dropdown-picker';

import * as FIREBASE from '../../firebaseConfig';

import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  view: {
    height: "100%",
    width: "100%",
    // backgroundColor: "#00ad6b"
    backgroundImage: "linear-gradient(to bottom, #0a0941 10%, #00ad6b 90%)",
  },

  teamNumberDiv: {
    marginTop: '1em',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '95%',
    height: '50px',
    backgroundColor: 'lightgrey',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f1efed',
    borderRadius: '3.5em',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  
  teamNumberSpan: {
    height: '100%',
    width: '40%',
    textAlign: 'center',
    alignContent: 'center',
  },

  teamNumberInput: {
    marginLeft: '10px',
    border: 'none',
    padding: '7px',
    boxSizing: 'border-box',
    backgroundColor: 'lightblue',
    fontSize: '14px',
    height: '2em',
    borderRadius: '2em',
    marginRight: '0.3em',
    width: '50%'
  },

  drivetrainSelect: {
    border: 'none',
    boxSizing: 'border-box',
    backgroundColor: 'lightblue',
    borderRadius: '2em',
    width: '100%',
    height: '80%'
  },

  questionDiv: {
    zIndex: 1,
    display: 'flex',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#f1efed',
    height: '2.5em',
    boxSizing: 'border-box',
    marginTop: '0.25em',
    marginBottom: '0.5em',
    borderRadius: '2.5em',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  button: {
    height: '2.5em',
    textAlign: 'center',
    alignContent: 'center',
  },
  left: {
      borderTopLeftRadius: '2.5em',
      borderBottomLeftRadius: '2.5em',
  },
  right: {
      borderTopRightRadius: '2.5em',
      borderBottomRightRadius: '2.5em',
  },
  text: {
    textAlign: 'center',
    alignContent: 'center',
    height: '100%'
  },

  deselected: {
    backgroundColor: 'gainsboro'
  },

  selected: {
    backgroundColor: 'seagreen'
  },

  oneOfTwo: {
    width: '30%'
  },

  oneOfThree: {
    width: '20%'
  },

  oneOfFour: {
    width: '15%'
  }
});

const g_eventWeAreAt = '2025gagai';

let k_teamNumber = '';
let k_drivetrain = '';
let k_autoMobility = '';
let k_autoCapability = '';
let k_teleCapability = '';
let k_l1 = 'no';
let k_l2 = 'no';
let k_l3 = 'no';
let k_l4 = 'no';
let k_barge = 'no';
let k_processor = 'no';
let k_climbAbility = '';
let k_notes = '';

const submitPS = (teamNumber, drivetrain, notes, setTeamNumber, setDrivetrain, setAutoMobility, setAutoCapability, setTeleCapability, setClimbAbility, setNotes, setl1, setl2, setl3, setl4, setBarge, setProcessor) => {
    let reefScoreArr = [];
    if (k_l1 == 'yes') reefScoreArr.push('L1');
    if (k_l2 == 'yes') reefScoreArr.push('L2');
    if (k_l3 == 'yes') reefScoreArr.push('L3');
    if (k_l4 == 'yes') reefScoreArr.push('L4');

    let reefScoreStr = reefScoreArr.join(", ");

    let algaeScoreArr = [];
    if (k_barge == 'yes') algaeScoreArr.push('Net');
    if (k_processor == 'yes') algaeScoreArr.push('Processor');

    let algaeScoreStr = algaeScoreArr.join(', ');

    let dataObject = {
        teamNumber: teamNumber,
        drivetrainType: drivetrain,
        notes: notes,
        autoMobility: k_autoMobility,
        autoCapability: k_autoCapability,
        teleCapability: k_teleCapability,
        reefScore: reefScoreStr,
        algaeScore: algaeScoreStr,
        climbAbility: k_climbAbility,
        event: g_eventWeAreAt,
    }

    FIREBASE.addEmitter().open('pitscout').add(dataObject).commit().then(() => {
        window.alert('[Success] Entry Recorded. Good work Pit Scouter!');
        resetPS(setTeamNumber, setDrivetrain, setAutoMobility, setAutoCapability, setTeleCapability, setClimbAbility, setNotes, setl1, setl2, setl3, setl4, setBarge, setProcessor);
        {
            k_autoMobility = '';
            k_autoCapability = '';
            k_teleCapability = '';
            // k_reefScore = '';
            // k_algaeScore = '';
            k_climbAbility = '';
        }
    });
}

const resetPS = (setTeamNumber, setDrivetrain, setAutoMobility, setAutoCapability, setTeleCapability, setClimbAbility, setNotes, setl1, setl2, setl3, setl4, setBarge, setProcessor) => {
    setTeamNumber('');
    setDrivetrain('');
    setAutoMobility(0);
    setAutoCapability(0);
    setTeleCapability(0);
    setl1(false);
    setl2(false);
    setl3(false);
    setl4(false);
    setBarge(false);
    setProcessor(false);
    setClimbAbility(0);
    setNotes('');
}

const PitScreen = () => {
  const [teamNumber, setTeamNumber] = useState('');

  const [drivetrainChoices, setDrivetrainChoices] = useState([
    {label: 'Swerve', value: 'swerve'},
    {label: 'Tank/Differential', value: 'tank'}
  ]);
  const [drivetrain, setDrivetrain] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [autoMobility, setAutoMobility] = useState(0);
  const [autoCapability, setAutoCapability] = useState(0);
  const [teleCapability, setTeleCapability] = useState(0);

  const [l1, setl1] = useState(false);
  const [l2, setl2] = useState(false);
  const [l3, setl3] = useState(false);
  const [l4, setl4] = useState(false);

  const [barge, setBarge] = useState(false);
  const [processor, setProcessor] = useState(false);

  const [climbAbility, setClimbAbility] = useState(0);
  const [notes, setNotes] = useState('');

  return (
    <ScrollView style={styles.view}>
      <View style={styles.teamNumberDiv}>
        <Text style={styles.teamNumberSpan}>Team #:</Text>
        <TextInput style={styles.teamNumberInput} placeholder="Team Number" value={teamNumber} onChangeText={text => setTeamNumber(text)}/>
      </View>

      <View style={styles.teamNumberDiv}>
        <Text style={styles.teamNumberSpan}>Drivetrain:</Text>
        <DropDownPicker open={dropdownOpen} value={drivetrain} items={drivetrainChoices} setOpen={setDropdownOpen} setValue={setDrivetrain} setItems={setDrivetrainChoices} placeholder="Select DT Type" containerStyle={{width: '60%', zIndex: "3000"}} style={styles.drivetrainSelect} dropDownContainerStyle={{ backgroundColor: 'lightblue', zIndex: "3000" }} zIndex={3000}   // Bring dropdown to the front
        zIndexInverse={1000} elevation={3000}/>
      </View>

      <View style={[styles.questionDiv, {marginTop: "5em"}]}>
        <Text style={styles.teamNumberSpan}>Auto Mobility:</Text>
        <TouchableOpacity style={[styles.button, styles.oneOfTwo, styles.left, (autoMobility != 1) ? styles.deselected : styles.selected]} onPress={() => {
          setAutoMobility(1);
          k_autoMobility = 'yes';
        }}><Text style={styles.text}>Yes</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.oneOfTwo, styles.right, (autoMobility != 2) ? styles.deselected : styles.selected]} onPress={() => {
          setAutoMobility(2);
          k_autoMobility = 'no';
        }}><Text style={styles.text}>No</Text></TouchableOpacity>
      </View>

      <View style={styles.questionDiv}>
        <Text style={styles.teamNumberSpan}>Auto Capability:</Text>
        <TouchableOpacity style={[styles.button, styles.oneOfThree, styles.left, (autoCapability != 1) ? styles.deselected : styles.selected]} onPress={() => {
          setAutoCapability(1);
          k_autoCapability = 'coral';
        }}><Text style={styles.text}>Coral</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.oneOfThree, (autoCapability != 2) ? styles.deselected : styles.selected]} onPress={() => {
          setAutoCapability(2);
          k_autoCapability = 'algae';
        }}><Text style={styles.text}>Algae</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.oneOfThree, styles.right, (autoCapability != 3) ? styles.deselected : styles.selected]} onPress={() => {
          setAutoCapability(3);
          k_autoCapability = 'both';
        }}><Text style={styles.text}>Both</Text></TouchableOpacity>
      </View>

      <View style={styles.questionDiv}>
        <Text style={styles.teamNumberSpan}>Tele Capability:</Text>
        <TouchableOpacity style={[styles.button, styles.oneOfThree, styles.left, (teleCapability != 1) ? styles.deselected : styles.selected]} onPress={() => {
          setTeleCapability(1);
          k_teleCapability = 'coral';
        }}><Text style={styles.text}>Coral</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.oneOfThree, (teleCapability != 2) ? styles.deselected : styles.selected]} onPress={() => {
          setTeleCapability(2);
          k_teleCapability = 'algae';
        }}><Text style={styles.text}>Algae</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.oneOfThree, styles.right, (teleCapability != 3) ? styles.deselected : styles.selected]} onPress={() => {
          setTeleCapability(3);
           k_teleCapability = 'both';
        }}><Text style={styles.text}>Both</Text></TouchableOpacity>
      </View>

      <View style={styles.questionDiv}>
        <Text style={styles.teamNumberSpan}>Reef Score:</Text>
        <TouchableOpacity style={[styles.button, styles.oneOfFour, styles.left, (!l1) ? styles.deselected : styles.selected]} onPress={() => {
          if (l1) {
            setl1(false);
            k_l1 = 'no';
          } else {
            setl1(true);
            k_l1 = 'yes';
          };
        }}><Text style={styles.text}>L1</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.oneOfFour, (!l2) ? styles.deselected : styles.selected]} onPress={() => {
          if (l2) {
            setl2(false);
            k_l2 = 'no';
          } else {
            setl2(true);
            k_l2 = 'yes';
          };
        }}><Text style={styles.text}>L2</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.oneOfFour, (!l3) ? styles.deselected : styles.selected]} onPress={() => {
          if (l3) {
            setl3(false);
            k_l3 = 'no';
          } else {
            setl3(true);
            k_l3 = 'yes';
          };
        }}><Text style={styles.text}>L3</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.oneOfFour, styles.right, (!l4) ? styles.deselected : styles.selected]} onPress={() => {
          if (l4) {
            setl4(false);
            k_l4 = 'no';
          } else {
            setl4(true);
            k_l4 = 'yes';
          };
        }}><Text style={styles.text}>L4</Text></TouchableOpacity>
      </View>

      <View style={styles.questionDiv}>
        <Text style={styles.teamNumberSpan}>Algae Score:</Text>
        <TouchableOpacity style={[styles.button, styles.oneOfTwo, styles.left, (!barge) ? styles.deselected : styles.selected]} onPress={() => {
          if (barge) {
            setBarge(false);
            k_barge = 'no';
          } else {
            setBarge(true);
            k_barge = 'yes';
          };
        }}><Text style={styles.text}>Net</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.oneOfTwo, styles.right, (!processor) ? styles.deselected : styles.selected]} onPress={() => {
          if (processor) {
            setProcessor(false);
            k_processor = 'no';
          } else {
            setProcessor(true);
            k_processor = 'yes';
          };
        }}><Text style={styles.text}>Prcsr</Text></TouchableOpacity>
      </View>

      <View style={styles.questionDiv}>
        <Text style={styles.teamNumberSpan}>Climb Ability:</Text>
        <TouchableOpacity style={[styles.button, styles.oneOfThree, styles.left, (climbAbility != 1) ? styles.deselected : styles.selected]} onPress={() => {
          setClimbAbility(1);
          k_climbAbility = 'none';
        }}><Text style={styles.text}>None</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.oneOfThree, (climbAbility != 2) ? styles.deselected : styles.selected]} onPress={() => {
          setClimbAbility(2);
          k_climbAbility = 'shallow';
        }}><Text style={styles.text}>Shlw</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.oneOfThree, styles.right, (climbAbility != 3) ? styles.deselected : styles.selected]} onPress={() => {
          setClimbAbility(3);
          k_climbAbility = 'deep';
        }}><Text style={styles.text}>Deep</Text></TouchableOpacity>
      </View>

      <View style={[styles.teamNumberDiv, {height: '5em'}]}>
        <TextInput style={[styles.teamNumberInput, {width: '100%', height: '100%'}]} placeholder="Extra Notes" value={notes} onChangeText={text => setNotes(text)} multiline={true}/>
      </View>

      <TouchableOpacity style={[styles.button, styles.oneOfTwo, styles.right, styles.left, styles.deselected, {marginTop: '1em', marginLeft: 'auto', marginRight: 'auto'}]} onPress={() => resetPS(setTeamNumber, setDrivetrain, setAutoMobility, setAutoCapability, setTeleCapability, setReefScore, setAlgaeScore, setClimbAbility, setNotes, setl1, setl2, setl3, setl4, setBarge, setProcessor)}><Text style={styles.text}>Reset</Text></TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.oneOfTwo, styles.right, styles.left, styles.deselected, {marginTop: '1em', marginLeft: 'auto', marginRight: 'auto'}]} onPress={() => submitPS(teamNumber, drivetrain, notes, setTeamNumber, setDrivetrain, setAutoMobility, setAutoCapability, setTeleCapability, setReefScore, setAlgaeScore, setClimbAbility, setNotes, setl1, setl2, setl3, setl4, setBarge, setProcessor)}><Text style={styles.text}>Submit</Text></TouchableOpacity>
      
    </ScrollView>
  );
}

export default PitScreen;