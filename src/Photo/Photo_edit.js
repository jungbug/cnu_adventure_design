import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { photo_url, API_KEY, api_uri, OPENAI_API_KEY, GPT_API } from '@env';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { Constants } from 'expo-camera';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const Photo_Edit = ({ onNavigateToHomePage }) => {
  const [food, setFood] = useState(""); // State to store the edited food name
  const [isLoading, setIsLoading] = useState(false); // State to control loading indicator
  const [accessToken, setAccessToken] = useState('');
  const [foodlist, setFoodlist] = useState("");
  const [yolo, setYolo] = useState("");
  const [answer, setAnswer] = useState("입력 값 없음");
  const [foodName, setFoodName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [recipe, setRecipe] = useState("");


  const getData = async () => {
    try {
      const accessTokenValue = await AsyncStorage.getItem('accessToken');
      const foodlist = await AsyncStorage.getItem('foodlist');
      const YoloImage = await AsyncStorage.getItem("YoloImage")
      console.log(foodlist)

      return [accessTokenValue, foodlist, YoloImage];
    } catch (error) {
      console.error('Error getting data:', error);
      return [null, [], ""];
    }
  };

  const sendData = async (foodName, ingredient, recipe) => {
    console.log(foodName, ingredient, recipe)
    try {
      const url = api_uri + '/team3/log'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: accessToken,
          log: [foodName, ingredient, recipe]
        }),
      });

    } catch (error) {
      console.log("error: ", error)
    }
  }

  useEffect(() => {
    getData().then(([token, foodlist, YoloImage]) => {
      setAccessToken(token);
      setFoodlist(foodlist);
      setYolo(YoloImage)
    });
  }, []);

  console.log("foodlist:", foodlist)

  console.log("food:", food)

  const prompt_text = ` 로 만들수 있는 음식 한개와 재료와 레시피 알려줘 예시를 알려줄게 앞에 ";를 붙여야 내가 파싱하기 쉬우니까 앞에 붙여줘 다른 말들은 전부다 빼고 그냥 내가 적어준 형식대로만 적어줘" 
  ;(음식 이름)

  ;(음식 재료)

  ;(음식 레시피)
  
  앞에 ; 붙여서 적어야 내가 파싱하기 쉬워서 그리고 한국어로 해줘
  `

  const changefood = (text) => {
    setFood(text)
    setFoodlist(text)
  }
  const testTurbo = async (question) => {
    const data = JSON.stringify({
        "model" : "gpt-3.5-turbo",
        "temperature": 0.5,
        "messages": [
            {"role": "system", "content": "You are a cook"},
            {"role": "user", "content": question + prompt_text}
        ],
    });

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              Authorization : 'Bearer '+GPT_API,
                'content-type': 'application/json',
            },
            body: data,
        });

        if (!response.ok) {
          console.log(response)
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

const getAnswer = () => {
    setAnswer("입력 값 없음");

    testTurbo(foodlist)
        .then(result => {
            setAnswer(result.choices[0].message.content);
            console.log("answer", result)
            console.log("0 :", result.choices[0].message.content);
            const answer = result.choices[0].message.content
            console.log("1:", answer.split(";")[1])
            console.log("2:", answer.split(";")[2])
            console.log("3:", answer.split(";")[3])
            setFoodName(answer.split(";")[1])
            setIngredient(answer.split(";")[2])
            setRecipe(answer.split(";")[3])
            console.log(foodName, ingredient, recipe)
            AsyncStorage.setItem('gpt_answer', answer)
            AsyncStorage.setItem('foodName', answer.split(";")[1])
            AsyncStorage.setItem('ingredient', answer.split(";")[2])
            AsyncStorage.setItem('recipe', answer.split(";")[3])

            alert("분석이 완료되었습니다.")
            sendData(answer.split(";")[1], answer.split(";")[2], answer.split(";")[3])
            onNavigateToHomePage()
        })
        .catch(error => console.error('Error:', error));
};

  // // Function to handle the submission of edited food name
  const handleSubmit = () => {
    // console.log(food)
    //   // Set isLoading to true to show the loading indicator
    getAnswer()
    //   // Perform your server request to update the food name
    //   // For example, you can use fetch or any other method to update the food name on the server.
    //   // Once the update is successful, you can update the "result" array with the new food name.

    //   // After updating the server, set isLoading back to false to hide the loading indicator
    setIsLoading(false);

  };



  return (
    <View style={styles.container}>
      <Image
        style={styles.rectangleFood}
        source={{ uri: yolo }}
        // source={{ uri: "https://user-images.githubusercontent.com/67012995/280949906-4e8ecd64-81df-466c-a433-3fc59f611c10.png" }}
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
    backgroundColor: '#AEC670',
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
