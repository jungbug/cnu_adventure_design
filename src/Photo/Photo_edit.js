import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { photo_url,API_KEY,api_uri  } from '@env';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const Photo_Edit = () => {
  const [food, setFood] = useState(""); // State to store the edited food name
  const [isLoading, setIsLoading] = useState(false); // State to control loading indicator
  const [accessToken, setAccessToken] = useState('');
  const [foodlist, setFoodlist] = useState("");
  const [yolo, setYolo] = useState("");


  const getData = async () => {
    try {
      // const foodin = await AsyncStorage.setItem('foodlist', "밥, 김치, 돼지고기, 양파, 계란");
      const accessTokenValue = await AsyncStorage.getItem('accessToken');
      const foodlist = await AsyncStorage.getItem('foodlist');
      const YoloImage = await AsyncStorage.getItem("YoloImage")
      console.log(foodlist)
      
      return [accessTokenValue, foodlist, YoloImage];
    } catch (error) {
      console.error('Error getting data:', error);
      return [null, []];
    }
  };

  useEffect(() => {
    getData().then(([token, foodlist, YoloImage]) => {
      setAccessToken(token);
      setFoodlist(foodlist);
      setYolo(YoloImage)
    });
  }, []);

  console.log("foodlist:",foodlist)

  console.log("food:",food)

  const changefood = (text) => {
    setFood(text)
    setFoodlist(text)
  }

  // // Function to handle the submission of edited food name
  const handleSubmit = () => {
    // console.log(food)
  //   // Set isLoading to true to show the loading indicator
    setIsLoading(true);



  //   // Perform your server request to update the food name
  //   // For example, you can use fetch or any other method to update the food name on the server.
  //   // Once the update is successful, you can update the "result" array with the new food name.

  //   // After updating the server, set isLoading back to false to hide the loading indicator
    setIsLoading(false);

  };

  

  return (
    <View style={styles.container}>
          <Image
            source={{uri : "https://user-images.githubusercontent.com/67012995/280177948-521143d7-5cd7-4c23-84d1-5d827872eb23.png"}}
            style={styles.rectangleFood}
          />
          <TextInput
            style={styles.input}
            placeholder="음식의 재료들을 맞게 적어주세요"
            value={foodlist}
            onChangeText={text => changefood(text)}
          />
          {/* <Image
            source={yolo ? {uri : yolo } : null}
            style={styles.rectangleFood}
          /> */}
          
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    // Define your icon styles here
  },
  input: {
    width: SCREEN_WIDTH * 0.79,
    height: SCREEN_HEIGHT * 0.1,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 20,
  },
  button: {
    marginTop: 10,
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.05,
    backgroundColor: '#50a5ff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  rectangleFood: {
    width: SCREEN_WIDTH * 0.7102564,
    height: SCREEN_HEIGHT * 0.4066,
    marginBottom: SCREEN_HEIGHT * 0.019,
    marginTop: SCREEN_HEIGHT * 0.1,
    borderRadius: 10,
  },
});

export default Photo_Edit;
