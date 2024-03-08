import { useEffect, useState } from 'react';
import {
  ViroARScene,
  Viro3DObject,
  ViroCamera
} from '@viro-community/react-viro';
import { Text, View } from 'react-native';


export default function ARSunPath(props) {
  const [loading, setLoading] = useState(false)
  const [arcInfo, setArcInfo] = useState(props.sceneNavigator.viroAppProps.arcInfo)

  useEffect(() => {
    setLoading(true)
    // wait for camera to load
    setTimeout(() => { setLoading(false) }, 200)
    setArcInfo(props.sceneNavigator.viroAppProps.arcInfo)
  }, [props.sceneNavigator.viroAppProps.arcInfo])

  // useEffect(() => {
  //   const capture = async () => {
  //     result = await props.sceneNavigator.takeScreenshot('temp', true)
  //     console.log(result)
  //   }
  //   capture()
  // }, [props.sceneNavigator.viroAppProps.screenshot])


  const renderArcs = () => {
    if (loading) {
      return null
    }
    return arcInfo.map((item) => {
      return (
        <Viro3DObject
          key={item.name}
          source={require('../assets/halfArc2.obj')}
          rotation={[90 - item.info.angle, 0, 0]}
          position={[item.info.y, 0, -item.info.x]}
          scale={[50000, 50000, 50000]}
          // materials={["heart"]}
          type="OBJ" />
      )
    })
  }
  return (
    <ViroARScene>
      {renderArcs()}
    </ViroARScene>
  );
};