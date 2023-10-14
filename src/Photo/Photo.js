import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_uri } from '@env';

export default function Photo() {
  const [isLoading, setIsLoading] = useState(false);
  const [foodName, setFoodName] = useState('');
  let [accessToken, setAccessToken] = useState('');
  const [hasPermission, setHasPermission] = useState(null);

  const cameraRef = useRef(null);

  const getData = async () => {
    try {
      const accessTokenValue = await AsyncStorage.getItem('accessToken');
      const popName = await AsyncStorage.getItem('userId');

      return [accessTokenValue, popName];
    } catch (error) {
      console.error('Error getting data:', error);
      return [null, null];
    }
  };

  useEffect(() => {
    getData().then(([token, name]) => {
      setAccessToken(token);
      setFoodName(name);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      setIsLoading(true);

      const photo = await cameraRef.current.takePictureAsync();
      uploadPhoto(photo);
    }
  };

  const uploadPhoto = async (photo) => {
    const formData = new FormData();
    formData.append('file', {
      uri: photo.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      console.log(accessToken)
      const response = await fetch(api_uri + '/api/v1/upload/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer " + accessToken,
        },
        body: formData,
      });

      if (response.status === 200) {
        const responseData = await response.json();
        const newFoodName = Object.values(responseData)[2];
        console.log(newFoodName);
        setFoodName(newFoodName);
        await AsyncStorage.setItem('foodName', newFoodName);

        Alert.alert('사진이 보내졌습니다', '음식분석화면으로 이동해주세요.');
      } else {
        Alert.alert('사진을 보내는데 문제가 발생했습니다', '다시 시도해주세요.');
      }
    } catch (error) {
      Alert.alert('사진을 보내는데 문제가 발생했습니다', '다시 시도해주세요.');
      console.log('사진을 보내는데 문제가 발생했습니다', error);
    } finally {
      setIsLoading(false);
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
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <Camera
          ref={cameraRef}
          style={{ flex: 1, aspectRatio: 4 / 3 }}
          type={Camera.Constants.Type.back}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
              {/* 버튼 UI */}
            </TouchableOpacity>
          </View>
        </Camera>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});


