import { useEffect, useState } from 'react';
import { ViroARScene,
  Viro3DObject,
  ViroCamera
} from '@viro-community/react-viro';


export default function ARSunPath(props) {
  // if (props.sceneNavigator.viroAppProps.finalHeading == null) {
  //   heading = 0
  // } else {
  //   heading = props.sceneNavigator.viroAppProps.finalHeading
  //   // heading = props.sceneNavigator.viroAppProps.headingTest
  // }

  const [arcInfo, setArcInfo] = useState(props.sceneNavigator.viroAppProps.arcInfo)

  let z = 0
  let [[x, y], elevation] = arcInfo

  return (
    <ViroARScene>
     <Viro3DObject
      source={require('../assets/halfArc2.obj')}
      // position={[0, -10, 0]}
      rotation={[90 - elevation ,0,0]}
      position={[y,0,-x]}
      scale={[500, 500, 500]}
      // materials={["heart"]}
      type="OBJ" /> 
    </ViroARScene>
  );

  return (
    <ViroARScene
    // onAnchorFound={(data) => console.log(data)}
    // onAnchorUpdated={() => console.log('onAnchorUpdated')}
    // onAnchorRemoved={() => console.log('onAnchorRemoved')}
    >
      {/* need to wait for camera else app will crash */}
      {props.sceneNavigator.viroAppProps.camera ? 
      <ViroCamera position={[0, 0, 0]} rotation={[0, 0, 0]} active={true} /> : null}
    
      <Viro3DObject
      getBoundingBoxAsync={x => console.log('BoundingBox ', x)}
      source={require('../assets/cow.obj')}
      position={[101.05629718294654,420.3612930881974, 994.8807088287882]}
      rotation={[20,90,0]}
      scale={[10, 10, 10]}
      // materials={["heart"]}
      type="OBJ" /> 
  </ViroARScene>
  );
};