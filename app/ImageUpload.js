import { Alert } from 'react-native';

const uploadToImgbb = async (base64Image) => {
  console.log('working');
  try {
    const apiKey = "c6df9d916e83576a8a666892a9b60f71"; // Replace with your API key
    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("image", base64Image);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      console.log("Image URL:", data.data.url);
      Alert.alert('HELP');
      return data.data.url;
    } else {
      console.error("Upload failed:", data);
    }
  } catch (error) {
    console.error(error);
  }
};

export {uploadToImgbb}