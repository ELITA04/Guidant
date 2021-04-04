import React, { Component } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { Card } from 'react-native-paper';

export default function Help() {
    const speakMessage = async (text) => {
        Speech.speak(text)
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.textStyle}>Guidant</Text>
                <Card style={styles.card}>
                    <TouchableOpacity onPress={() => speakMessage('This tool will give you a description of your surrounding environment. Point the camera in your desired direction and click on the capture button. Once captured, the phone will speak what is infront of you.')}>
                        <MaterialIcons name="preview" size={100} color="#801515" style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Describe</Text>
                    <Text style={styles.content}>This tool will give you a description of your surrounding environment. Point the camera in your desired direction and click on the capture button. Once captured, the phone will speak what is infront of you.</Text>
                </Card>

                <Card style={styles.card}>
                    <TouchableOpacity onPress={() => speakMessage('This tool will help you read any document or text. Point the camera over the document or text and click on the capture button. Once captured, the phone will read what is in the document or the text in front of you.')}>
                        <MaterialIcons name="plagiarism" size={100} color="#801515" style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Read</Text>
                    <Text style={styles.content}>This tool will help you read any document or text. Point the camera over the document or text and click on the capture button. Once captured, the phone will read what is in the document or the text in front of you.</Text>
                </Card>
            </ScrollView>
        </View>

    );
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
    icon: {
        textAlign: 'center',

    },
    title: {
        fontWeight: 'bold',
        fontSize: 36,
        fontFamily: 'sans-serif',
        width: '100%',
        textAlign: 'center'
    },
    content: {
        fontSize: 20,
        fontFamily: 'sans-serif',
        width: '100%',
        textAlign: 'justify'
    },
    textStyle: {
        color: '#801515',
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 40,
        textAlign: 'center',
        textShadowColor: '#AA3939',
        fontFamily: 'sans-serif',
        textShadowRadius: 4,
        textShadowOffset: { width: 2, height: 2 },
        textTransform: 'uppercase',
        textAlignVertical: 'top',
        padding: 35
    }
});