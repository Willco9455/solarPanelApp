import { StyleSheet, Text, TextInput, View } from "react-native";

export default function EstimateInput({
  panelNum,
  updatePanelNum,
  efficency,
  updateEfficency,
  azi,
  updateAzi,
  tilt,
  updateTilt
}) {
  return (
    <View style={styles.outerContainer}>
      <Text style={styles.title}>Solar Input</Text>
      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text>Number of Panels: </Text>
          <TextInput
            style={styles.panelInput}
            value={panelNum.toString()}
            inputMode="numeric"
            onChangeText={updatePanelNum}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Efficency: </Text>
          <TextInput
            style={styles.panelInput}
            value={efficency.toString()}
            inputMode="numeric"
            onChangeText={updateEfficency}
          />
          <Text>%</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text>Azimuth: </Text>
          <TextInput
            style={styles.panelInput}
            value={azi.toString()}
            inputMode="numeric"
            onChangeText={updateAzi}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Tilt: </Text>
          <TextInput
            style={styles.panelInput}
            value={tilt.toString()}
            inputMode="numeric"
            onChangeText={updateTilt}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'orange',
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 14,
    marginHorizontal: 8,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  panelInput: {
    paddingHorizontal: 8,
    marginLeft: 10,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 1,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'collumn',
    justifyContent: 'space-evenly'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})