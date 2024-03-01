import { StyleSheet, View, Text } from "react-native";
import Globals from "../util/Globals";
import { PredictionManager } from "../util/solarPrediction";


function SolarPower() {
  let predictionManager = new PredictionManager()
  predictionManager.runTesting()
}



export default function TestingScreen() {
  SolarPower()
  return(
    <View style={styles.container}>
      <Text>Testing Stuff</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})