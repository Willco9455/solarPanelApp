import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ViroARSceneNavigator, } from '@viro-community/react-viro';
import { useEffect, useState } from 'react';

import ARSunPath from '../components/ARSunPath';
import { getArcFromDate, getArcToday } from '../util/solarAPI';
import Globals from '../util/Globals';



export default function ARScreen() {
  const [loading, setLoading] = useState(true)
  const [arcInfo, setArcInfo] = useState([])
  const [activeButtons, setActiveButtons] = useState({
    today: true,
    summer: false,
    winter: false,
    spring: false,
    autumn: false
  })
  // wait for camera to load first or will crash app
  useEffect(() => {
    const loadArc = async () => {
      newInfo = await getArcFromDate(new Date(), Globals.getLocation())
      arcObj = {
        name: 'Today',
        info: newInfo
      }
      setArcInfo([...arcInfo, arcObj])
    }
    loadArc()
  }, []);

  // finished loading when arc path has been loaded and camera is ready
  useEffect(() => {
    console.log('Arc Info Changed ->', arcInfo)
    if (arcInfo.length != 0) {
      setLoading(false)
    }
  }, [arcInfo])

  async function updateArcInfo(arcName) {

    date = new Date()
    switch (arcName) {
      case 'Today':
        activeButtons.today = !activeButtons.today
        break
      case 'Winter':
        date.setMonth(1)
        date.setDate(3)
        date.setYear(2025)
        activeButtons.winter = !activeButtons.winter
        break
      case 'Summer':
        date.setMonth(7)
        date.setDate(6)
        date.setYear(2025)
        activeButtons.summer = !activeButtons.summer
        break
      case 'Spring':
        date.setMonth(3)
        date.setDate(1)
        date.setYear(2025)
        activeButtons.spring = !activeButtons.spring
        break
      case 'Autumn':
        date.setMonth(9)
        date.setDate(10)
        date.setYear(2025)
        activeButtons.autumn = !activeButtons.autumn
        break
    }
    setActiveButtons(activeButtons)

    // gets a list 
    results = arcInfo.filter((obj) => {
      return (obj.name == arcName)
    })
    // if the arc is currently already in the render array 
    if (results.length != 0) {
      setArcInfo(arcInfo.filter((obj) => {
        return (obj.name != arcName)
      }))
      // quit out of rest of function 
      return
    }

    newInfo = await getArcFromDate(date, Globals.getLocation())
    newObj = {
      name: arcName,
      info: newInfo
    }
    setArcInfo([...arcInfo, newObj])
  }

  const render = () => {
    if (loading) {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Loading...</Text>
        </View>
      )
    } else {
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
          arcInfo: arcInfo
        }}
        style={styles.f1}
      />
      <View style={styles.arcSelectContainer}>
        <View style={styles.arcSelect}>
          <Pressable style={[styles.button, activeButtons.today ? styles.buttonActive : styles.buttonInactive]}
            onPress={() => { updateArcInfo('Today') }}>
            <Text>Today</Text>
          </Pressable>
          <Pressable style={[styles.button, activeButtons.summer ? styles.buttonActive : styles.buttonInactive]}
            onPress={() => { updateArcInfo('Summer') }}>
            <Text>Summer</Text>
          </Pressable>
          <Pressable style={[styles.button, activeButtons.autumn ? styles.buttonActive : styles.buttonInactive]}
            onPress={() => { updateArcInfo('Autumn') }}>
            <Text>Autumn</Text>
          </Pressable>
          <Pressable style={[styles.button, activeButtons.winter ? styles.buttonActive : styles.buttonInactive]}
            onPress={() => { updateArcInfo('Winter') }}>
            <Text>Winter</Text>
          </Pressable>
          <Pressable style={[styles.button, activeButtons.spring ? styles.buttonActive : styles.buttonInactive]}
            onPress={() => { updateArcInfo('Spring') }}>
            <Text>Spring</Text>
          </Pressable>
        </View>
      </View>
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
  arcSelectContainer: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    paddingBottom: 70
  },
  arcSelect: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center'
  },
  button: {
    opacity: 1,
    backgroundColor: 'orange',
    // padding: 10,
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center'
  },
  buttonActive: {
    opacity: 1
  },
  buttonInactive: {
    opacity: 0.5
  }
});
