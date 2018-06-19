const images = {
  maxImageWidth: 100,
  imagePickerOptions: {
    mediaType: 'photo',
    noData: true, // don't attach base64 data - greatly improves performance
    storageOptions: {
      skipBackup: true, // don't backup to iOS cloud
    },
    allowsEditing: true, // ios rezise mode
  },
  imageResizerOptions: [
    100, // maxWidth
    100, // maxHeight
    'PNG', // format
    100, // quality
    0, // rotation
  ],
  firebaseStorageOptions: {
    contentType: 'image/png',
    contentEncoding: 'base64',
  },
};

export default images;
