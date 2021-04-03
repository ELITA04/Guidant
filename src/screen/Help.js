import React, { Component } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { Card } from 'react-native-paper';

export default class HelpScreen extends Component{
  speakMessage = async (text) => {
    Speech.speak(text)
  }
    render(){

        return(
            <View style={styles.container}>
            <ScrollView>
            <Text style={styles.textStyle}>Guidant</Text>
            <Card style={styles.card}>
              <TouchableOpacity onPress= {() => this.speakMessage('This is Object Detection, it does the following... blah blah blah')}>
                <MaterialIcons name="mic" size={100} color="#7AEEBA" style={styles.icon} />
              </TouchableOpacity>
                <Text style={styles.title}>Describe</Text>
                <Text style={styles.content}>Describes the scenario</Text>
            </Card>

            <Card style={styles.card}>
              <TouchableOpacity onPress= {() => this.speakMessage('This is Optical Character Recongition, it does the following... blah blah blah')}>
                <MaterialIcons name="text-snippet" size={100} color="#7AEEBA" style={styles.icon} />
              </TouchableOpacity>
                <Text style={styles.title}>Read</Text>
                <Text style={styles.content}>Reads your document</Text>
            </Card>
            </ScrollView>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 20,
      },
      card: {
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        marginBottom: 20,
      },
      icon:{
       textAlign: 'center',
        
      },
      title:{
        fontWeight: 'bold',
        fontSize: 40,
        fontFamily: 'sans-serif',
        width: '100%',
      },
      content:{
        fontSize: 32,
        fontFamily: 'sans-serif',
        width: '100%',
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
        padding: 35
      }
})
