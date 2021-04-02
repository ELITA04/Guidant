import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './src/screen/Home';
import Describe from './src/screen/ObjectDescription';
import Read from './src/screen/Read';

const Tab = createMaterialTopTabNavigator();

const screenOptions = {
  activeTintColor: '#ffffff',
  inactiveTintColor: '#AA3939',
  showIcon: true,
  pressColor: '#9BC9E2',
  scrollEnabled: false,
  tabStyle: {
    paddingTop: 32,
    borderWidth: 1,
    borderColor: '#550000'
  },
  indicatorStyle: {
    backgroundColor: '#801515',
    height: '100%',
  },
  style: {
    backgroundColor: '#FFAAAA',
  },
  labelStyle: { fontSize: 27, }
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" tabBarOptions={screenOptions}>
        < Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Describe" component={Describe} />
        <Tab.Screen name="Read" component={Read} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
