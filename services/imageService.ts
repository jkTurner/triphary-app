import { supabaseUrl } from "@/constants";
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer'
import { supabase } from '@/lib/supabase';
import { hp, wp } from "@/helpers/common";
import { Image as RNImage } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails'

const SUPABASE_STORAGE_URL = "https://byqasqcvwfgxerrysacf.supabase.co/storage/v1/object/public/uploads/";

export const getImageDimensions = (mediaPath: string): Promise<number> => {
	return new Promise((resolve, reject) => {
		if (!mediaPath) {
			reject("Invalid image path");
			return;
		}

		const mediaUrl = `${SUPABASE_STORAGE_URL}${mediaPath}`;
		console.log("Fetching media size for: ", mediaUrl);

		RNImage.getSize(
			mediaUrl,
			(width, height) => {
				console.log(`Media size - Width: ${width}, Height: ${height}`);
				const aspectRatio = width / height;
				const calculatedHeight = wp(100) / aspectRatio; // we maintain full width

				console.log(`Adjusted Height: ${calculatedHeight}`);
				resolve(calculatedHeight);
			},
			(error) => {
				console.log("Failed to get media size: ", error);
				reject(error);
			}
		)
	})
}

export const getVideoThumbnailSize = async (videoUri: string): Promise<number> => {
	try {
		const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
			time: 500, // Take a frame at 0.5 seconds
		});

		return new Promise<number>((resolve, reject) => {
			RNImage.getSize(uri, (width, height) => {
				console.log(`✅ Video Thumbnail size - Width: ${width}, Height: ${height}`);

				const aspectRatio = Number(width) / Number(height);
				const calculatedHeight = wp(100) / aspectRatio; // Maintain full width

				console.log(`🔄 Adjusted Video Height: ${calculatedHeight}`);
				resolve(calculatedHeight);
			}, (error) => {
				console.error("❌ Failed to get video thumbnail size: ", error);
				reject(error);
			});
		});
	} catch (error) {
		console.error("❌ Failed to generate video thumbnail: ", error);
		throw error;
	}
};



// this function makes sure to return an object doesn't matter the type of image path
export const getUserMediaSrc = (imagePath?: string | { uri: string } | null) => {
    // console.log("▶️ getUserMediaSrc called with:", imagePath);

    if (!imagePath) {
        console.log("▶️ (getUserMediaSrc) Returning default image");
        return require('@/assets/images/profile-default.jpg');
    }

    if (typeof imagePath === "string") {
        if (imagePath.trim() === '') {
            console.log("▶️ (getUserMediaSrc) Empty string detected, returning default image");
            return require('@/assets/images/profile-default.jpg');
        }

        if (imagePath.startsWith('file://')) {
            console.log("▶️ (getUserMediaSrc) Returning local file:", imagePath);
            return { uri: imagePath };
        }

        // console.log("▶️ (getUserMediaSrc) Assuming Supabase URL:", getSupabaseFileUrl(imagePath));
        return getSupabaseFileUrl(imagePath);
    }

    // If imagePath is already an object with a valid `uri` property
    if (typeof imagePath === "object" && "uri" in imagePath) {
        console.log("▶️ (getUserMediaSrc) Returning provided object URI:", imagePath.uri);
        return imagePath;
    }

    console.log("❌ (getUserMediaSrc) Unexpected format, returning default image");
    return require('@/assets/images/profile-default.jpg');
};


export const getSupabaseFileUrl = (filePath: string) => {
	if(filePath) {
		return {uri:`${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`}
	}
	return null;
}

export const uploadFile = async (folderName: string, fileUri: string, isImage = true) => {
	try {

		console.log("📤 UploadFile called with:", fileUri); // ✅ Check if this function runs

		// extract file extension to use when uploading to supabase
		let fileExtension = fileUri.split('.').pop() || 'png'; // Default to PNG if undefined

		// this part prepare directory and file name to send to supabase
		// eg. /profile_pictures/1706907891234.png
		let fileName = getFilePath(folderName, fileExtension);

		console.log("📤 Generated File Path:", fileName); // ✅ Verify file path

		// convert local image to base64
		const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
			encoding: FileSystem.EncodingType.Base64
		});

		// then convert base64 to image data
		// because react native doesn't have direct access to native filesystem like in browser
		// so we have to convert to base64 (format that supabase can understand)
		let imageData = decode(fileBase64); // array buffer

		// now we can upload array buffer data to supabase
		let {data, error} = await supabase
		.storage
		.from('uploads') // name of the supabase bucket storage
		.upload(fileName, imageData, {
			cacheControl: '3600',
			upsert: false,
			contentType: isImage ? `image/${fileExtension}` : 'video/mp4', // 🔥 Detect file type dynamically
		});

		if(error) {
			console.error("❌ Upload Error:", error);
			return { success: false, msg: 'Could not upload the media'}
		}

		console.log("✅ Upload Successful:", data);
		return {success: true, data: data?.path}

	} catch (error) {
		console.error("❌ File Upload Error:", error);
		return { success: false, msg: 'Could not upload the media'}
	}
}

export const getFilePath = (folderName: string, fileExtension: string) => {
	return `${folderName}/${Date.now()}.${fileExtension}`;
};

