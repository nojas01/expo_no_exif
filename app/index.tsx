import {Button, View, Image} from "react-native";
import {useEffect, useState} from "react";
import * as MediaLibrary from 'expo-media-library';
import {PhotoCamera} from "@/app/camera";
import {CameraCapturedPicture} from "expo-camera";
import {FlipType, manipulateAsync, SaveFormat} from "expo-image-manipulator";
import {Asset} from "expo-media-library";

export default function Index() {
    const [cameraOpen, setCameraOpen] = useState(false);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [image, setImage] = useState<Asset | null>(null);
    useEffect(() => {

    }, []);

    if (cameraOpen) {
        return (
           <PhotoCamera onPhotoTaken={onPhotoTaken} />
        )
    }

    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Button title={'Take a photo'} onPress={() => setCameraOpen(true)} />
        {image && image.uri &&
         <Image source={{ uri: image.uri }} width={200} height={200} />
        }
    </View>
  );

    async function onPhotoTaken(photo: CameraCapturedPicture) {
        setCameraOpen(false);
        // exif contains additional exif props: "UserComment":"This is a valid exif field"
        console.log('PHOTO TAKEN WITH EXIF: ', JSON.stringify(photo.exif));
        await rotate90andFlip(photo);
    }

    async function rotate90andFlip(image: CameraCapturedPicture) {
        const manipResult = await manipulateAsync(
            image.uri,
            [{ rotate: 90 }, { flip: FlipType.Vertical }],
            { compress: 1, format: SaveFormat.PNG }
        );
        // manipulateAsync removes all exif data
        console.log('MANIPULATED IMAGE URI: ', manipResult.uri);
        await saveImage(manipResult.uri)
    }

    async function saveImage(uri: string) {
        try {
            if (permissionResponse?.status !== 'granted') {
                await requestPermission();
            }
                // Save image to media library
                const asset = await MediaLibrary.createAssetAsync(uri);
                const info = await MediaLibrary.getAssetInfoAsync(asset);
                // Read exif data from manipulated image: most exif is removed
                console.log("Image Info: ", JSON.stringify(info.exif));
                setImage(asset)

        } catch (error) {
            console.log(error);
        }
    }
}
