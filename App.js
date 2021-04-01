import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './src/screen/Home';
import Describe from './src/screen/ObjectDescription';
import Read from './src/screen/Read';

const Tab = createMaterialTopTabNavigator();

const screenOptions = {
  tabStyle: {
    backgroundColor: '#FFAAAA',
    borderColor: '#550000',
    borderWidth: 3,
    activeBackgroundColor: '#801515'
  },
  labelStyle: {
    fontSize: 25
  },
  activeBackgroundColor: "#801515",
  inactiveBackgroundColor: "#ffffff"
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" tabBarOptions={screenOptions}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Describe" component={Describe} />
        <Tab.Screen name="Read" component={Read} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
