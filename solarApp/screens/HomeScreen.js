import { StyleSheet, View, Text} from 'react-native';
import { getAsimov, getElevation, to3d } from '../util/solarAPI';
import { useState } from 'react';
import ARScreen from './ARScreen';



export default function HomeScreen() {
  const load = async () => {
    data = await getElevation()
    // console.log('data:', data)
    console.log(data)
  }
  console.log(to3d(174.2, 22.8))
  return (
    <ARScreen/>
    // <View style={styles.container}>
    //   <Text style={styles.helloWorldTextStyle}>Solar Stats</Text>
    // </View>
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
  },
});

