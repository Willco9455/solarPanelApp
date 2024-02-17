import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useState } from 'react';
import ARScreen from './screens/ARScreen';
import HomeScreen from './screens/HomeScreen';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="black"
        />
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ARScreen" component={ARScreen} />
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
