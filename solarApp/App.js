import { StyleSheet} from 'react-native';
import { useState } from 'react';
import ARScreen from './screens/ARScreen';
import HomeScreen from './screens/HomeScreen';



export default function App() {
  return (
    <ARScreen/>
  );
}

const styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
