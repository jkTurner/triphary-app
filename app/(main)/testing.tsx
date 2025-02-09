import { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text, Image, Pressable, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useVideoPlayer, VideoView } from "expo-video";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { DeleteIcon } from "@/assets/icons/Icons";
import { getUserImageSrc } from "@/services/imageService";

const Testing = () => {
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);

  // Determines if file is an image or video
  const isImage = file?.type === "image";
  const isVideo = file?.type === "video";

  // Video player instance
  const videoPlayer = useVideoPlayer(getUserImageSrc(file), (player) => {
    player.loop = true;
    player.play();
  });

  // Pick media (Image or Video)
  const pickMedia = async (isImage: boolean) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: isImage ? ["images"] : ["videos"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
      console.log("📂 Selected file:", result.assets[0].uri);
    } else {
      console.log("❌ Selection canceled");
    }
  };

  // Log whenever a file is selected
  useEffect(() => {
    if (file) {
      console.log(`🖼️ Selected ${file.type}: ${file.uri}`);
    }
  }, [file]);

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Header title="Testing" showBackButton={true} />
        <ScrollView contentContainerStyle={{ gap: 20 }}>
         	<Button title="Pick an Image" onPress={() => pickMedia(true)} />
          	<Button title="Pick a Video" onPress={() => pickMedia(false)} />

			{/* Media Preview */}
			{file && (
				<View style={styles.mediaContainer}>
				{/* Display Image */}
				{isImage && file?.uri && (
					<Image source={{ uri: file.uri }} style={styles.media} resizeMode="cover" />
				)}

				{/* Display Video */}
				{isVideo && file?.uri && (
					<VideoView player={videoPlayer} style={styles.media} nativeControls />
				)}

				{/* Delete Button */}
				<Pressable style={styles.deleteIcon} onPress={() => setFile(null)}>
					<DeleteIcon color="white" size={22} />
				</Pressable>
				</View>
			)}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Testing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  mediaContainer: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    alignSelf: "center",
    marginTop: 20,
  },
  media: {
    width: "100%",
    height: "100%",
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
