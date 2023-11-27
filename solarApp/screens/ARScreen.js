import { Image, StyleSheet, Text, View } from 'react-native';
import { ViroARScene,
  ViroText,
  ViroBox,
  ViroARPlane,
  ViroARSceneNavigator,
  Viro3DObject} from '@viro-community/react-viro';
import { useState } from 'react';
 
const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');
  function onInitialized(state, reason) {
    // console.log('guncelleme', state, reason);
    if(state === 1) { 
      console.log('Lost anchor')
      setText('oops looks like something is wrong wit the camera')
    } else {
      console.log('Has anchor')
      setText('Hello World!')
    }
  }

  function onCameraMove(transofrmation) {
    console.log(transofrmation.position)
  }


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
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
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
