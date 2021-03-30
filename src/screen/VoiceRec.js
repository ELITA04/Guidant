import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { render } from 'react-dom';

export default function App() {
  const [recording, setRecording] = React.useState();

  startRecording = async() => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  stopRecording = async() => {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Noon Gil</Text>
      <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.helpLink} >
        <MaterialIcons name="mic" size={280} color="#7AEEBA" style={styles.outerCircle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '',
    padding: 10,
  },
  helpLink: {
    paddingVertical: 15,
  },
  outerCircle: {
    borderRadius: 300,
    width: 280,
    height: 280,
    margin: 50,
    backgroundColor: '#FFFFFF',
    borderColor : '#339989',
    borderWidth : 1
  },
  textStyle:{
    color: '#FFBF00',
    fontSize: 40,
    fontWeight: 'bold',
    lineHeight: 40,
    textAlign: 'center',
    textShadowColor: '#D50000',
    fontFamily: 'sans-serif',
    textShadowRadius: 4,
    textShadowOffset: {width: 2, height: 2},
    textTransform: 'uppercase',
    textAlignVertical : 'top',
  }
});