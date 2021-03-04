import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import Config from 'react-native-config'

import { 
    Text, 
    View ,
    TouchableOpacity,
    Platform, 
} from 'react-native';

Config.IMGUR_API_KEY;
Config.PREDICTION_LINK;
Config.OBJECT_DESCRIPTION_KEY;

export default class OCRScreen extends Component {
    state = {
      photoId: 1,
      hasPermission: null,
      cameraType: Camera.Constants.Type.back,
    }
  
    async componentDidMount() {
      this.getPermissionAsync();
      var file_info = await FileSystem.getInfoAsync(
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
  
    getPermissionAsync = async () => {
      // Camera roll Permission 
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      // Camera Permission
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasPermission: status === 'granted' });
    }
  
    handleCameraType=()=>{
      const { cameraType } = this.state
  
      this.setState({cameraType:
        cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
      })
    }

    sendImage = async (url) => {
      const data = {
        url: url
      };
      const config = {
        headers: {
          "Ocp-Apim-Subscription-Key": OBJECT_DESCRIPTION_KEY,
          "Content-Type": "application/json"
        }
      };
      axios.post(PREDICTION_LINK , data, config)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error.json());
        });
    }

    sendToImgur = async (photoLoc) => {
      try {
        // Use Image Manipulator to downsize image
        let manipulatedObj = await ImageManipulator.manipulateAsync(
            photoLoc,
            [{ resize: { width: 200 } }],
            { base64: true }
        );
        var xmlHttp = new XMLHttpRequest();
        const data = new FormData();
        xmlHttp.onreadystatechange = e => {
          if (xmlHttp.readyState == 4) {
            if (xmlHttp.status === 200) {
                // Send Imgur link to photo to be sent to Prediction API
                let imgur_json = JSON.parse(xmlHttp.responseText);
                console.log('Link : ', imgur_json.data.link);
                this.sendImage(imgur_json.data.link);
            } else {
                // Debug errors
                console.log(xmlHttp.responseJson);
            }
          }
        };
        xmlHttp.open("POST", "https://api.imgur.com/3/upload", true);
        xmlHttp.setRequestHeader(
            "Authorization",
            "Client-ID " + IMGUR_API_KEY
        );
        data.append("type", "base64");
        data.append("image", manipulatedObj.base64);
        xmlHttp.send(data);
      }catch (error) {
          console.error(error);
        }
    }

    takePicture = async () => {
      var photoLoc = `${FileSystem.documentDirectory}photos/Photo_${
        this.state.photoId
      }_Base64`;
      if (this.camera) {
        let photo = await this.camera.takePictureAsync({ base64 : true });
        // let photo_bytes = await Buffer.from(photo.base64, "base64");
        // console.log(photo);
        FileSystem.moveAsync({
          from: photo.uri,
          to: photoLoc
        }).then(() => {
          this.setState({
              photoId: this.state.photoId + 1
          });
          this.sendToImgur(photoLoc);
      });
      }
    }
  

    pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });
      console.log(result);
    }

    render() {
      const { hasPermission } = this.state
      if (hasPermission === null) {
        return <View />;
      } else if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
            <View style={{ flex: 1 }}>
              <Camera style={{ flex: 1 }} type={this.state.cameraType}  ref={ref => {this.camera = ref}}>
                <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:30}}>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                      backgroundColor: 'transparent'                 
                    }}
                    onPress={()=>this.pickImage()}>
                    <Ionicons
                        name="ios-photos"
                        style={{ color: "#fff", fontSize: 40}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                    }}
                    onPress={()=>this.takePicture()}
                    >
                    <FontAwesome
                        name="camera"
                        style={{ color: "#fff", fontSize: 40}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                    }}
                    onPress={()=>this.handleCameraType()}
                    >
                    <MaterialCommunityIcons
                        name="camera-switch"
                        style={{ color: "#fff", fontSize: 40}}
                    />
                  </TouchableOpacity>
                </View>
              </Camera>
          </View>
        );
      }
    }
    
  }