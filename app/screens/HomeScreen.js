import { Text, SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';

// import { createMaterialTopTabNavigator } from '@react-navigation/native-stack';

// const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  // const route = useRoute();

  // console.log(route.params);

  return (
    <View style={{height: "100%",
      width: "100%",
      // backgroundColor: "#00ad6b"
      backgroundImage: "linear-gradient(to bottom, #0a0941 10%, #00ad6b 90%)",}}>
        <View style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '1.5em'}}><Text style={{fontSize: 40, color: 'white'}}>Scouting for Team 4188, reimagined.</Text></View>
      </View>
  );
}

export default HomeScreen;