import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    return result;
}

export { pickImage };