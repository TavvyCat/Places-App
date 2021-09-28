import React, { useState } from "react";
import { StyleSheet, View, Button, Text, Image, Alert } from "react-native";
import * as ImgPicker from "expo-image-picker";
import Colors from "../constants/Colors";

const ImagePicker = (props) => {
  const [imageUri, setImageUri] = useState("");

  const verifyPermissions = async () => {
    const result = await ImgPicker.requestCameraPermissionsAsync() 
    const result2 = await ImgPicker.requestMediaLibraryPermissionsAsync() 
    if (result.status !== "granted" && result2.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    const image = await ImgPicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 16],
      quality: 0.5,
    });

    setImageUri(image.uri);

    props.onImageTaken(image.uri)
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!imageUri ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: imageUri }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    marginBottom: 15,
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
