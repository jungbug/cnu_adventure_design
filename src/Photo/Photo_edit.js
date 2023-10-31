import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import foodlist from './Photo.js';

const Photo_edit = () => {
  const [food, setFood] = useState(''); // State to store the edited food name
  const [isLoading, setIsLoading] = useState(false); // State to control loading indicator

  // Function to handle the submission of edited food name
  const handleSubmit = () => {
    if (food.trim() === '') {
      Alert.alert('Error', 'Please enter a valid food name');
      return;
    }
    // Set isLoading to true to show the loading indicator
    setIsLoading(true);

    // Perform your server request to update the food name
    // For example, you can use fetch or any other method to update the food name on the server.
    // Once the update is successful, you can update the "result" array with the new food name.

    // After updating the server, set isLoading back to false to hide the loading indicator
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#50a5ff" />
      ) : (
        <>
          <Image source={iconImage} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="음식 이름을 입력하세요."
            value={food}
            onChangeText={text => setFood(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    // Define your icon styles here
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#50a5ff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Photo_edit;
