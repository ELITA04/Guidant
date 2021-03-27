import * as ImageManipulator from 'expo-image-manipulator';
import * as Speech from 'expo-speech';
import { SERVER_URL } from '../config';

const read = async (photoUri) => {

    let apiUrl = SERVER_URL + '/read';
    console.log(apiUrl);
    let manipulatedObj = await ImageManipulator.manipulateAsync(
        photoUri,
        [{ resize: { width: 200 } }],
    );

    try {
        let data = new FormData();
        data.append('image', {
            uri: manipulatedObj.uri,
            name: 'read_image.jpg',
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
                let texts = responseJson.texts;
                console.log(texts);
                for (let text of texts) {
                    Speech.speak(text);
                }
            })
            .catch(error => {
                console.error(error);
            });
    } catch (e) {
        console.log("Error", e)
    }

}

export { read };