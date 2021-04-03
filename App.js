import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ObjectDescriptionScreen from './src/screen/ObjectDescription';
import VoiceRec from './src/screen/VoiceRec';
import HelpScreen from './src/screen/Help';

export default function App() {
  return (
    <HelpScreen />
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
