import { Image, StyleSheet, Text, View } from 'react-native';
import { ViroARSceneNavigator, } from '@viro-community/react-viro';
import { useEffect, useState } from 'react';
// import { Magnetometer } from 'expo-sensors';
// import { Accelerometer } from 'expo-sensors';

import CompassHeading from 'react-native-compass-heading';
import ARSunPath from '../components/ARSunPath';
import { getArcToday } from '../util/solarAPI';


export default function ARScreen() {
  const [loading, setLoading] = useState(true)
  const [arcInfo, setArcInfo] = useState(null)
  const [finalHeading, setFinalHeading] = useState(null)
  const [camera, setCamera] = useState(false);
  let currentHeading = 0

  // wait for camera to load first or will crash app
  useEffect(() => {
    setTimeout(() => {
      setCamera(true);
    }, 200);
    
    const loadArc = async () => {
      setArcInfo(await getArcToday())
    }

    loadArc()
  }, []);

  // finished loading when arc path has been loaded and camera is ready
  useEffect(() => {
    if ((camera) && (arcInfo != null)) {
      setLoading(false)
    }
  },[arcInfo, camera])

  // useEffect(() => {
  //   let headingStreak = 0
  //   let heading = null

  //   let calibrateInterval = setInterval(() => {
  //     if (heading == null) {
  //       heading = currentHeading
  //     } else if ((currentHeading <= heading + 5) && (currentHeading >= heading - 5)) {
  //       headingStreak += 1
  //       if (headingStreak >= 20) {
  //         console.log('calibrated')
  //         clearInterval(calibrateInterval)
  //         // setFinalHeading(heading)
  //       }
  //     } else {
  //       headingStreak = 0
  //       heading = null
  //     }
  //     console.log('Streak ', headingStreak)
  //   }, 250)

  // },[])

  // effect to get the heading of the device every 1 degree
  useEffect(() => {
    const degree_update_rate = 1;
    CompassHeading.start(degree_update_rate, ({ heading, accuracy }) => {
      currentHeading = heading
      console.log(heading)
    });
    // REMOVE THIS WHEN YOU WANT IT TO WORK
    CompassHeading.stop()
    return () => {
      CompassHeading.stop();
    };
  }, []);


  const render = () => {
    if (loading) {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{justifyContent: 'center', alignItems: 'center'}}>Loading...</Text>
        </View>
      )
    } else { 
      console.log('arc info ', arcInfo)
      return ARComponent
    }
  }

  const ARComponent = (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: ARSunPath,
        }}
        viroAppProps={{
          camera: camera,
          finalHeading: finalHeading,
          arcInfo: arcInfo
        }}
        style={styles.f1}
      />
    </View>)

  return render()
}

const styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
