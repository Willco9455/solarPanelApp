import { StyleSheet, View, SafeAreaView} from 'react-native';
import { useState } from 'react';
import ARScreen from './screens/ARScreen';
import HomeScreen from './screens/HomeScreen';




export default function App() {
  return (
    <View style={styles.container}>
        <HomeScreen/>
      {/* <ARScreen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    flex:1
  }
});
