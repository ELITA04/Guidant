import { SERVER_URL } from '../config';

const command = async (audioUri, navigation) => {

    let apiUrl = SERVER_URL + '/command';
    let name = 'command_audio.' + audioUri.substr(-3);
    try {
        let data = new FormData();
        data.append('audio', {
            uri: audioUri,
            name: name,
            type: 'audio/wav'
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
                if (responseJson.command === 'describe') {
                    navigation.navigate('Describe');
                } else if (responseJson.command === 'read') {
                    navigation.navigate('Read')
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

export { command };