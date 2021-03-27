const takePicture = async (camera) => {
    if (camera) {
        let photo = await camera.takePictureAsync();
        return photo.uri;
    }
}

export { takePicture };