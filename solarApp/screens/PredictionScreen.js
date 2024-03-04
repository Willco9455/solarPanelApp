import { StyleSheet, Text, View } from "react-native";
import { PredictionManager } from "../util/solarPrediction";
import MonthlyEstimate from "../components/MonthlyEstimate";
import YearEstimate from "../components/YearEstimate";
import EstimateInput from "../components/EstimateInput";
import { useEffect, useState } from "react";

const predictionManager = new PredictionManager()

export default function PredictionScreen() {
  const [panelNum, setPanelNum] = useState(11)
  const [efficency, setEfficency] = useState(20)
  const [azi, setAzi] = useState(290)
  const [tilt, setTilt] = useState(35)
  const [loading, setLoading] = useState(true)

  // wait for data from api to be loaded before stopping loading screen
  useEffect(() => {
    predictionManager.loadData().then(() => {
      console.log('fully loaded wow')
      setLoading(false)
    }).catch(() => {
      console.log('error fetching the data')
    })
  },[])

  function updatePanelNum(value) {
    predictionManager.setPanelNum(value)
    setPanelNum(value)
  }

  function updateEfficency(value) {
    predictionManager.setEfficency(value)
    setEfficency(value)
    console.log('efficency changed ', value)
  }

  function updateAzi(value) {
    predictionManager.setAzi(value)
    setAzi(value)
    console.log('Azi Changed ', value)
  }

  function updateTilt(value) { 
    predictionManager.setTilt(value)
    setTilt(value)
    console.log('Tilt Changed ', value)
  }

  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <EstimateInput
        panelNum={panelNum}
        updatePanelNum={updatePanelNum}
        efficency={efficency}
        updateEfficency={updateEfficency}
        azi={azi}
        updateAzi={updateAzi}
        tilt={tilt}
        updateTilt={updateTilt}
      />
      <View style={styles.yearEstimateConatiner}>
        <MonthlyEstimate predictionManager={predictionManager} />
      </View>
      <View style={styles.yearEstimateConatiner}>
        <YearEstimate predictionManager={predictionManager} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  yearEstimateConatiner: {
    marginTop: 20
  }
})