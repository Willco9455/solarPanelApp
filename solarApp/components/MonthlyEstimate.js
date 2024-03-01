import { StyleSheet, Text, View } from "react-native";


export default function MonthlyEstimate({ predictionManager }) {
  return (
    <View style={styles.monthEstimateContainer}>
      <Text style={styles.title}>Monthly Estimates</Text>
      <View style={styles.monthsContainer}>
        <View style={styles.monthPredictWrap}>
          <Text>Jan</Text>
          <Text>{Math.round(predictionManager.predictMonthPower(1))} Kwh</Text>
        </View>
        <View style={styles.monthPredictWrap}>
          <Text>Feb</Text>
          <Text>{Math.round(predictionManager.predictMonthPower(2))} Kwh</Text>
        </View>
        <View style={styles.monthPredictWrap}>
          <Text>Mar</Text>
          <Text>{Math.round(predictionManager.predictMonthPower(3))} Kwh</Text>
        </View>
        <View style={styles.monthPredictWrap}>
          <Text>Apr</Text>
          <Text>{Math.round(predictionManager.predictMonthPower(4))} Kwh</Text>
        </View>
      </View>

      <View style={styles.monthsContainer}>
        <View style={styles.monthPredictWrap}>
          <Text>May</Text>
          <Text>{Math.round(predictionManager.predictMonthPower(5))} Kwh</Text>
        </View>
        <View style={styles.monthPredictWrap}>
          <Text>Jun</Text>
          <Text>{Math.round(predictionManager.predictMonthPower(6))} Kwh</Text>
        </View>
        <View style={styles.monthPredictWrap}>
          <Text>Jul</Text>
          <Text>{Math.round(predictionManager.predictMonthPower(7))} Kwh</Text>
        </View>
        <View style={styles.monthPredictWrap}>
          <Text>Aug</Text>
          <Text>{Math.round(predictionManager.predictMonthPower(8))} Kwh</Text>
        </View>
      </View>

      <View style={styles.monthsContainer}>
        <View style={styles.monthPredictWrap}>
          <Text>Sep</Text>
          <Text>{Math.round(predictionManager.predictMonthPower(9))} Kwh</Text>
        </View>
        <View style={styles.monthPredictWrap}>
          <Text>Oct</Text>
          <Text>{Math.round(predictionManager.predictMonthPower(10))} Kwh</Text>
        </View>
        <View style={styles.monthPredictWrap}>
          <Text>Nov</Text>
          <Text>{Math.round(predictionManager.predictMonthPower(11))} Kwh</Text>
        </View>
        <View style={styles.monthPredictWrap}>
          <Text>Dec</Text>
          <Text>{Math.round(predictionManager.predictMonthPower(12))} Kwh</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  monthEstimateContainer: {
    backgroundColor: 'orange',
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 14,
    marginHorizontal: 8,
    paddingHorizontal: 20
  },
  monthsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  monthPredictWrap: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    flex: 1,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  }
})