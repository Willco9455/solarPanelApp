import { Image, StyleSheet, Text, View } from 'react-native';
import { ViroARScene,
  ViroText,
  ViroBox,
  ViroARPlane,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroCamera
} from '@viro-community/react-viro';
import { useEffect, useState } from 'react';
// import { Magnetometer } from 'expo-sensors';
import { Accelerometer } from 'expo-sensors';

import CompassHeading from 'react-native-compass-heading';
// import {NativeModules} from 'react-native';
// const {BearingModule} = NativeModules;

const HelloWorldSceneAR = (props) => {
  if (props.sceneNavigator.viroAppProps.finalHeading == null) {
    heading = 0
  } else {
    heading = props.sceneNavigator.viroAppProps.finalHeading
  }
  return (
    <ViroARScene
    // onAnchorFound={(data) => console.log(data)}
    // onAnchorUpdated={() => console.log('onAnchorUpdated')}
    // onAnchorRemoved={() => console.log('onAnchorRemoved')}
    >
      {/* need to wait for camera else app will crash */}
      {props.sceneNavigator.viroAppProps.camera ? 
      <ViroCamera position={[0, 0, 0]} rotation={[0, 360 - heading, 0]} active={true} /> : null}
    
      <Viro3DObject
      source={require('../assets/cow.obj')}
      position={[101.05629718294654,420.3612930881974, 994.8807088287882]}
      rotation={[20,90,0]}
      scale={[10, 10, 10]}
      // materials={["heart"]}
      type="OBJ" /> 
  </ViroARScene>
  );

  return (
    <ViroARScene
    onAnchorFound={() => console.log('onAnchorFound')}
    onAnchorUpdated={() => console.log('onAnchorUpdated')}
    onAnchorRemoved={() => console.log('onAnchorRemoved')}>
     <Viro3DObject
      source={require('../assets/halfArc2.obj')}
      position={[0, -10, 0]}
      rotation={[20,90,0]}
      scale={[50, 50, 50]}
      // materials={["heart"]}
      type="OBJ" /> 
  </ViroARScene>
  );
};

export default function ARScreen() {
  const [finalHeading, setFinalHeading] = useState(null)
  let currentHeading = 0
  const [camera, setCamera] = useState(false);

  useEffect(() => {
      setTimeout(() => {
        setCamera(true);
      }, 200);
    }, []);
    
  useEffect(() => {
    let headingStreak = 0
    let heading = null

    let calibrateInterval = setInterval(() => {
      if (heading == null) {
        heading = currentHeading
      // } else if (heading - 5 >= currentHeading <= heading + 5) {
      } else if ((currentHeading <= heading + 5) && (currentHeading >= heading - 5)) {
        headingStreak += 1
        if (headingStreak >= 20) {
          clearInterval(calibrateInterval)
          setFinalHeading(heading)
        }
      } else {
        headingStreak = 0
        heading = null
      }
      console.log('Streak ', headingStreak)
    }, 100)

  },[])

  useEffect(() => {
    const degree_update_rate = 1;
    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      currentHeading = heading
      console.log(currentHeading)
    });


    return () => {
      CompassHeading.stop();
    };
  }, []);


  return (
    <View style={{flex: 1}}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
        }}
        viroAppProps={{
          camera: camera,
          finalHeading: finalHeading
        }}
        style={styles.f1}
      />
    </View>
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
