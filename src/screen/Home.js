import React, { useEffect } from 'react';
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


export default function Home() {

    let camera;
    const [recording, setRecording] = React.useState();
    const [hasPermission, setPermission] = React.useState();
    const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back);
    const micColour = {
        micNotRecordingColour: "#7AEEBA",
        micRecordingColour: "#DD2F2F",
    };

    useEffect(() => {
        getPermissions();
    }, []);

    const getPermissions = async () => {
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setPermission({ hasPermission: status === 'granted' });
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
                playThroughEarpieceAndroid: true,
            });
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        command(uri);
    }

    if (hasPermission === null) {
        return <View />
    } else if (hasPermission === false) {
        return <Text>No Access to Camera!</Text>
    } else {
        return (
            <View style={styles.container}>
                <Camera style={{ flex: 1 }} type={cameraType} ref={ref => { camera = ref }}>
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-around", margin: 30 }}>
                        <Text style={styles.textStyle}>Noon Gil</Text>
                        <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.helpLink} >
                            <MaterialIcons name="mic" size={280} color={recording ? micColour.micRecordingColour : micColour.micNotRecordingColour} style={styles.outerCircle} />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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