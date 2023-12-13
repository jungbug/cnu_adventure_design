import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { photo_uri } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Photo({navigatetoPhotoEdit}) {
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('accessToken:', accessToken);
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      uploadPhoto(photo);
    }
  };

  const uploadPhoto = async (photo) => {
    console.log(photo)
    const data = new FormData();
    
    data.append('photo', {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    
    try {
      const response = await fetch('https://1dca-110-35-22-115.ngrok-free.app/predict/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        try {
          const input = result["result"];
          const modifiedInput = input.map(item => item.replace(/"/g, ''));
          const output = modifiedInput.join(', ');
          Alert.alert("사진 분석이 완료되었습니다.")
          const imagedecode = result["image"]
          await AsyncStorage.setItem('foodlist', output);
          await AsyncStorage.setItem('YoloImage', imagedecode);
        } catch (error) {
          console.log("2",await AsyncStorage.getItem('foodlist'))
          Alert.alert("분석된 결과가 없습니다 사진을 다시 찍어주세요.")
        }
        // 예측 결과 처리
      } else {
        Alert.alert('Error', 'Failed to upload photo');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1, aspectRatio: 4 / 3 }}
        type={Camera.Constants.Type.back}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
            {/* Capture button UI */}
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
