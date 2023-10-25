import { StyleSheet, Text, View } from 'react-native';
import { ViroARScene,
  ViroText,
  ViroARSceneNavigator} from '@viro-community/react-viro';
import { useState } from 'react';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');
  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    setText('Hello World!');
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
  );
};

export default function App() {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
    // <View>
    //   <Text>Hello World</Text>
    // </View>
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
