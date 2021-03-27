import * as ImageManipulator from 'expo-image-manipulator';
import * as Speech from 'expo-speech';
import { SERVER_URL } from '../config';

const getDescription = async (photoUri) => {

    let apiUrl = SERVER_URL + '/describe';
    console.log(apiUrl);
    let manipulatedObj = await ImageManipulator.manipulateAsync(
        photoUri,
        [{ resize: { width: 200 } }],
    );

    try {
        let data = new FormData();
        data.append('image', {
            uri: manipulatedObj.uri,
            name: 'describe_image.jpg',
            type: 'image/jpg'
        });
        fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST',
            body: data
        })
            .then(response => response.json())
            .then(responseJson => {
                let caption = responseJson.description.captions[0].text;
                Speech.speak(caption);
            })
            .catch(error => {
                console.error(error);
            });
    } catch (e) {
        console.log("Error", e)
    }

}

export { getDescription };