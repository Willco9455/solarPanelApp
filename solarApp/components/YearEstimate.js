import { StyleSheet, Text, View } from "react-native";
import { useEffect, useReducer, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function YearEstimate({ predictionManager }) {
  const avgHousePowerDay = 7.39726027397
  const lightBulbDay = 0.08 * 24
  const carPerMile = 0.32
  let yearPower = (Math.round(predictionManager.predictYearPower()))


  return (
    <View style={styles.outerContainer}>
      <Text style={styles.title}>Yearly Estimate</Text>
      <View style={styles.innerContainer}>
        <View style={styles.infoConatiner}>
          <MaterialCommunityIcons name="lightning-bolt-circle" size={35} color="black" />
          <Text>{yearPower} Kwh</Text>
        </View>
        <View style={styles.infoConatiner}>
          <MaterialCommunityIcons name="home-lightning-bolt" size={35} color="black" />
          <Text>{Math.round(yearPower / avgHousePowerDay)} Days</Text>
        </View>
        <View style={styles.infoConatiner}>
          <MaterialCommunityIcons name="lightbulb" size={35} color="black" />
          <Text>{Math.round(yearPower / lightBulbDay)} Hours</Text>
        </View>
        <View style={styles.infoConatiner}>
          <MaterialCommunityIcons name="car" size={35} color="black" />
          <Text>{Math.round(yearPower / carPerMile)} Miles</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'orange',
    paddingVertical: 20,
    borderRadius: 14,
    marginHorizontal: 8,
    paddingHorizontal: 10
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  infoConatiner: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  }

})