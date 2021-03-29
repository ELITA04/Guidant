import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AudioCommand from './src/screen/AudioCommand';
import ObjectDescriptionScreen from './src/screen/ObjectDescription';

export default function App() {
  return (
    <AudioCommand />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
