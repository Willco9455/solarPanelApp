import { StyleSheet, SafeAreaView } from 'react-native';
import ARScreen from './screens/ARScreen';
import HomeScreen from './screens/HomeScreen';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CNN from './screens/CNN';
import TestingScreen from './screens/TestingScreen';
import PredictionScreen from './screens/PredictionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="black"
        />
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ARScreen">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ARScreen" component={ARScreen} />
          <Stack.Screen name="CNNScreen" component={CNN} />
          <Stack.Screen name="TestingScreen" component={TestingScreen} />
          <Stack.Screen name="PredictionScreen" component={PredictionScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
    flex: 1
  }
});
