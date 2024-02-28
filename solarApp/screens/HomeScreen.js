import { StyleSheet, View, Text, Pressable } from 'react-native';
import { getArcToday } from '../util/solarAPI';
import { useEffect, useState } from 'react';
import ARScreen from './ARScreen';
import GetLocation from 'react-native-get-location'
import { Magnetometer } from 'expo-sensors';
import Globals from '../util/Globals';



export default function HomeScreen({ navigation }) {


  GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
  })
  .then(location => {
    Globals.setLocation([location.latitude, location.longitude])
    console.log(Globals.getLocation())
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })


  return (
    <View style={styles.container}>
      <Text style={styles.helloWorldTextStyle}>Solar Stats</Text>
      <View style={[styles.widgetRowConatiner, { marginTop: 40 }]}>
        <Pressable onPress={() => navigation.navigate('ARScreen')}>
          <View on style={styles.widgetContainer}>
            {/* <Text style={{textAlign: 'center'}}>Hello there</Text> */}
          </View>
        </Pressable>
        <View style={styles.widgetContainer}>
          {/* <Text style={{textAlign: 'center'}}>Hello there 2</Text> */}
        </View>
      </View>
      <View style={[styles.widgetRowConatiner, { marginTop: 40 }]}>
        <View style={styles.widgetContainer}>
          {/* <Text style={{textAlign: 'center'}}>Hello there</Text> */}
        </View>
        <View style={styles.widgetContainer}>
          {/* <Text style={{textAlign: 'center'}}>Hello there 2</Text> */}
        </View>
      </View>
      <View style={[styles.widgetRowConatiner, { marginTop: 40 }]}>
        <View style={styles.widgetContainer}>
          {/* <Text style={{textAlign: 'center'}}>Hello there</Text> */}
        </View>
        <View style={styles.widgetContainer}>
          {/* <Text style={{textAlign: 'center'}}>Hello there 2</Text> */}
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  helloWorldTextStyle: {
    fontSize: 30,
    color: 'black',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: 20
  },
  widgetContainer: {
    backgroundColor: 'orange',
    borderRadius: 19,
    padding: 10,
    width: 180,
    height: 150,
    elevation: 6,
  },
  widgetRowConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

