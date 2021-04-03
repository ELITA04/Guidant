import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './src/screen/Home';
import Describe from './src/screen/ObjectDescription';
import Read from './src/screen/Read';
import Help from './src/screen/Help';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
  activeTintColor: '#ffffff',
  inactiveTintColor: '#AA3939',
  showIcon: true,
  pressColor: '#9BC9E2',
  scrollEnabled: false,
  tabStyle: {
    paddingTop: 32,
    borderWidth: 1,
    borderColor: '#550000',
  },
  indicatorStyle: {
    backgroundColor: '#801515',
    height: '100%',
  },
  style: {
    backgroundColor: '#FFAAAA',
  },
  labelStyle: { fontSize: 15, },
  iconStyle: { height: 40, width: 40 }
}

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'home';
    } else if (route.name === 'Describe') {
      iconName = 'preview';
    } else if (route.name === 'Read') {
      iconName = 'plagiarism';
    } else if (route.name === 'Help') {
      iconName = 'help';
    }

    // You can return any component that you like here!
    return <MaterialIcons name={iconName} size={40} color={color} style={{ textAlign: 'center' }} />;
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
        < Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Describe" component={Describe} />
        <Tab.Screen name="Read" component={Read} />
        <Tab.Screen name="Help" component={Help} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
