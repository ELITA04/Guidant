import * as ImageManipulator from 'expo-image-manipulator';
import * as Speech from 'expo-speech';
import { SERVER_URL } from '../config';

const read = async (photoUri) => {

    Speech.speak("I will now read what I can see.");

    let apiUrl = SERVER_URL + '/read';
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
                for (let text of texts) {
                    Speech.speak(text);
                }
            })
            .catch(error => {
                console.error(error);
                Speech.speak("I'm sorry, an error has occured. Please try again.");
            });
    } catch (e) {
        console.log("Error", e)
    }

}

export { read };