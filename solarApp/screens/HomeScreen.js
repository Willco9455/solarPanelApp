import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {

  
  return(
    <View style={styles.container}>
      <Text>Hello! There</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center'
  }
})