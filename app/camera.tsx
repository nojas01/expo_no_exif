import {CameraView, CameraCapturedPicture, CameraPictureOptions, useCameraPermissions} from 'expo-camera';
import React, { useState } from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageType} from "expo-camera/legacy";

interface PhotoCameraProps {
    onPhotoTaken: (photo: CameraCapturedPicture) => void;
}

export function PhotoCamera({
                                onPhotoTaken,
                            }: Readonly<PhotoCameraProps>) {
    const cameraRef = React.useRef<CameraView>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    const cameraOptions: CameraPictureOptions = {
        quality: 1.0,
        base64: false,
        imageType: ImageType.jpg,
        exif: true,
        additionalExif: { UserComment: 'This is a valid exif field' }
    };

    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.previewWrapper}>
                <CameraView
                    style={styles.preview}
                    ref={cameraRef}
                    onCameraReady={() => setIsCameraReady(true)}
                />
            </View>

            <View style={styles.actionBar}>
                <View style={styles.actionInner}>
                    <TouchableOpacity
                        disabled={!isCameraReady}
                        onPress={() => handleTakePhotoPress()}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        style={styles.capture}
                    >
                        <Text>Take Photo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    async function handleTakePhotoPress() {
        try {
            const data = await cameraRef.current?.takePictureAsync(cameraOptions);

            if (!data) {
                console.error('No photo taken');
                return;
            }

            onPhotoTaken(data);
        } catch (error) {
            console.error('Error taking photo', error);
            return;
        }
    }
}

const styles = StyleSheet.create({
    actionBar: {
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        top: 0,
    },
    actionInner: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginRight: 15,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    capture: {
        flex: 0,
        marginVertical: 10,
        padding: 5,
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
    },
    preview: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    previewWrapper: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
    },
});
