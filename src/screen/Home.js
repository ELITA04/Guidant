import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { command } from '../utils';


export default function Home({ navigation }) {

    let camera;
    const [recording, setRecordingState] = React.useState();
    const [state, setCameraState] = useState({
        hasPermission: null,
        cameraType: Camera.Constants.Type.back,
    });
    const micColour = {
        micNotRecordingColour: "#7AEEBA",
        micRecordingColour: "#DD2F2F",
    };

    useEffect(() => {
        console.log("Home", state);
        getPermissions();
    }, []);

    const getPermissions = async () => {
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setCameraState({ ...state, hasPermission: status === 'granted' });
    }

    const recordingOptions = {
        // android not currently in use, but parameters are required
        android: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
        },
        ios: {
            extension: '.wav',
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
        },
    };


    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playThroughEarpieceAndroid: false,
            });
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();
            setRecordingState(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecordingState(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        command(uri, navigation);
    }

    const focused = useIsFocused();
    if (state.hasPermission === null) {
        return <View />
    } else if (state.hasPermission === false) {
        return <Text>No Access to Camera!</Text>
    } else {
        return (
            <View style={styles.container}>
                {focused && <Camera style={{ flex: 1 }} type={state.cameraType} ref={ref => { camera = ref }}>
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-around", margin: 30 }}>
                        <TouchableOpacity onPressIn={startRecording} onPressOut={stopRecording} style={styles.helpLink} >
                            <MaterialIcons name="mic" size={280} color={recording ? micColour.micRecordingColour : micColour.micNotRecordingColour} style={styles.outerCircle} />
                        </TouchableOpacity>
                    </View>
                </Camera>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
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
        borderColor: '#339989',
        borderWidth: 1
    },
    textStyle: {
        color: '#FFBF00',
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 40,
        textAlign: 'center',
        textShadowColor: '#D50000',
        fontFamily: 'sans-serif',
        textShadowRadius: 4,
        textShadowOffset: { width: 2, height: 2 },
        textTransform: 'uppercase',
        textAlignVertical: 'top',
    }
});