import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { getDescription, takePicture, pickImage } from '../utils'


export default function Describe() {

  let camera;
  const [state, setState] = useState({
    hasPermission: null,
    cameraType: Camera.Constants.Type.back
  });

  useEffect(() => {
    getPermissionAsync();
    getFilePermissions();
    console.log("Describe", state);
  }, []);

  const getFilePermissions = async () => {
    let file_info = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + "photos"
    );
    if (!file_info.exists) {
      FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "photos"
      ).catch(e => {
        console.log(e, "Directory exists");
      });
    }
  }

  const getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setState({ ...state, hasPermission: status === 'granted' });
  }

  const handleCameraType = () => {
    const cameraType = state.cameraType;

    setState({
      ...state,
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  }

  const takePictureAndGetDescription = async () => {
    let uri = await takePicture(camera);
    getDescription(uri);
  }

  const choosePictureAndGetDescription = async () => {
    let result = await pickImage();
    if (!result.cancelled) getDescription(result.uri);
  }

  const focused = useIsFocused();
  if (state.hasPermission === null) {
    return <View />;
  } else if (state.hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        {focused && <Camera style={{ flex: 1 }} type={state.cameraType} ref={ref => { camera = ref }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 30 }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent'
              }}
              onPress={() => choosePictureAndGetDescription()}>
              <MaterialIcons
                name="image"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={() => takePictureAndGetDescription()}
            >
              <FontAwesome
                name="camera"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={() => handleCameraType()}
            >
              <MaterialCommunityIcons
                name="camera-switch"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
        }
      </View>
    );
  }
}