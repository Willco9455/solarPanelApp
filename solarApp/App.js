import { StyleSheet, SafeAreaView } from 'react-native';
import ARScreen from './screens/ARScreen';
import HomeScreen from './screens/HomeScreen';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CNN from './screens/CNN';
import TestingScreen from './screens/TestingScreen';
import PredictionScreen from './screens/PredictionScreen';
import ShadeFactorScreen from './screens/ShadeFactorScreen';
import * as MediaLibrary from 'expo-media-library';



const Stack = createNativeStackNavigator();

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  
  if (status === null) {
    requestPermission();
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="black"
        />
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ShadeFactorScreen">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ARScreen" component={ARScreen} />
          <Stack.Screen name="CNNScreen" component={CNN} />
          <Stack.Screen name="TestingScreen" component={TestingScreen} />
          <Stack.Screen name="PredictionScreen" component={PredictionScreen} />
          <Stack.Screen name="ShadeFactorScreen" component={ShadeFactorScreen} />
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
