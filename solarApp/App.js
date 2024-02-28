import { StyleSheet, SafeAreaView } from 'react-native';
import ARScreen from './screens/ARScreen';
import HomeScreen from './screens/HomeScreen';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CNN from './screens/CNN';
import TestingScreen from './screens/TestingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="black"
        />
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="TestingScreen">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ARScreen" component={ARScreen} />
          <Stack.Screen name="CNNScreen" component={CNN} />
          <Stack.Screen name="TestingScreen" component={TestingScreen} />
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
