import { SERVER_URL } from '../config';

const command = async (audioUri) => {

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
                console.log(responseJson);
            })
            .catch(error => {
                console.error(error);
            });
    } catch (e) {
        console.log("Error", e)
    }

}

export { command };