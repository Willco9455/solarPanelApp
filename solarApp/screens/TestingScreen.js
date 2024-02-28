import { StyleSheet, View, Text } from "react-native";
import Globals from "../util/Globals";
import { PredictionManager } from "../util/solarPrediction";



// converts degrees angle to radians
function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function toDegrees (radians) {
  return radians * 180.0 / Math. PI
} 

function SolarPower() {
  // let L = 53.9436528
  // let G = -1.8942216
  let predictionManager = new PredictionManager()
  predictionManager.runTesting()
}

async function apiRequest() {
  key = Globals.getRadAPIKey()
  let lon = -1.8942216
  let lat = 53.9436528
  key = 'D24MFNil09iOtUdxr3di3BzTN4Yo4p0Q'
  req = `https://api.solcast.com.au/data/historic/radiation_and_weather?period=PT60M&output_parameters=gti,dhi,dni&latitude=${lat}&longitude=${lon}&azimuth=-70&tilt=35&start=2023-02-01T00:00:00.000Z&end=2023-03-01T00:00:00.000Z&format=json&time_zone=utc&api_key=${key}`
  
  // console.log(req)

  // await fetch(req, {
  //   method: 'GET'
  // }).then(function (resp) {
  //   return resp.json();
  // }).then(function (data) {
  //   console.log('Data ', data)
  // }).catch(function (err) {
  //   console.log('something went wrong', err);
  // });


}


export default function TestingScreen() {
  apiRequest()
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