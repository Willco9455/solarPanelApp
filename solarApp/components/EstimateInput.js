import { StyleSheet, Text, TextInput, View } from "react-native";

export default function EstimateInput({ panelNum, updatePanelNum, efficency, updateEfficency }) {
  return (
    <View style={styles.outerContainer}>
      <Text style={styles.title}>Solar Input</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.panelInput}
          value={panelNum.toString()}
          inputMode="numeric"
          onChangeText={updatePanelNum}
        />
        <TextInput
          style={styles.panelInput}
          value={efficency.toString()}
          inputMode="numeric"
          onChangeText={updateEfficency}
        />
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
    height: 40,
    width: 50,
    borderWidth: 1,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})