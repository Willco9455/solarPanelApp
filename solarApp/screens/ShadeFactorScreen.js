import { useEffect, useState, useRef } from "react";
import { Button, StyleSheet, Text, View, PermissionsAndroid } from "react-native";
import Globals from "../util/Globals";
import { getArcFromDate } from "../util/solarAPI";
import { ViroARSceneNavigator } from "@viro-community/react-viro";
import ARSunPath from "../components/ARSunPath";
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

import RecordScreen, { RecordingResult } from 'react-native-record-screen';



export default function ShadeFactorScreen() {
  const [calibrated, setCalibrated] = useState(false)
  const [arcInfo, setArcInfo] = useState([])
  const [screenshot, setScreenshot] = useState(false)
  const [recording, setRecording] = useState(false)


  let _arScene = null
  // wait for camera to load first or will crash app
  useEffect(() => {
    // load the initial arc for the winter month 
    const loadArc = async () => {
      date = new Date();
      date.setMonth(1);
      date.setDate(3);
      date.setYear(2025);
      newInfo = await getArcFromDate(date, Globals.getLocation())
      arcObj = {
        name: 'Winter',
        info: newInfo
      }
      setArcInfo([...arcInfo, arcObj])
      console.log('Here is the arc Info', arcInfo)
    }
    loadArc()

  }, []);




  // First the user must calibrate the phone to be pointing North
  if (!calibrated) {
    return (
      <View style={styles.outerContainer}>
        <Text>Please point your phone camera in the direction of north and press calibrate button</Text>
        <Button onPress={() => { setCalibrated(true) }} title="Calibrate" />
      </View>
    )
  }

  const takeScreenshot = () => {
    const stopRecord = async () => {
      // recording stop
      const res = await RecordScreen.stopRecording().catch((error) =>
        console.warn(error)
      );
      if (res) {
        const url = res.result.outputURL;
        await MediaLibrary.saveToLibraryAsync(url);
        console.log('Saved to media library')
      }
    }

    const startRecording = () => {
      const res = RecordScreen.startRecording().catch((error) => console.error(error));
      // if (res === RecordingStartResponse.PermissionError) {
      //   // user denies access
      //   console.log('Permission error')
      // }
    }

    // recording start
    if (!recording) {
      startRecording()
      setRecording(true)
      console.log('Started recording')
    } else {
      stopRecord()
      console.log('Stopped recording')
      setRecording(false)
    }
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      console.log('image captured successfully')
      MediaLibrary
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
    console.log('iamge save complete')
  };


  // once calibrated 
  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator
        ref={(c) => _arScene = c}
        autofocus={true}
        initialScene={{
          scene: ARSunPath,
        }}
        viroAppProps={{
          arcInfo: arcInfo,
          screenshot: screenshot,
        }}
        style={styles.f1}
      />
      <Button onPress={takeScreenshot} title="Pic" />
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  f1: { flex: 1 },
})