import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { photo_url,API_KEY,api_uri , OPENAI_API_KEY } from '@env';
import { OpenAI} from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const Photo_Edit = ({onNavigateToHomePage}) => {
  const [food, setFood] = useState(""); // State to store the edited food name
  const [isLoading, setIsLoading] = useState(false); // State to control loading indicator
  const [accessToken, setAccessToken] = useState('');
  const [foodlist, setFoodlist] = useState("");
  const [yolo, setYolo] = useState("");

  const llm = new OpenAI({
    openaiApiKey: OPENAI_API_KEY,
    temperature: 0.7,
  });

  const chatModel = new ChatOpenAI();

  const text = ""

  // const llmResult = await llm.predict(text);

  // const chatModelResult = await chatModel.predict(text);

  const getData = async () => {
    try {
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

  const sendData = async (foodName, ingredient, recipe) => {
    try{
      // const uri = api_uri
      const uri = "https://7fa5-2406-da12-16a-fe00-a13c-a008-b335-7158.ngrok-free.app"
      const response = await fetch(uri+'/team3/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: accessToken,
          log: [foodName,ingredient,recipe]
        }),
      });

    } catch(error){
      console.log("error: ",error)
    }
  }

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

  const langchain = () => {

  }

  // // Function to handle the submission of edited food name
  const handleSubmit = () => {
    // console.log(food)
  //   // Set isLoading to true to show the loading indicator

    let foodName = "버섯 치즈 오믈렛"

    let ingredient = `계란 (2개)
    우유 (2큰술)
    버섯 (다진 상태로)
    치즈 (다진 상태로)
    양파 (다진 상태로)
    소금 (맛에 맞게 조절)
    식용유 (오믈렛 조리에 사용)`

    let recipe = `먼저 계란 2개를 그릇에 넣고 우유 2큰술을 추가합니다. 소금을 약간 넣고 계란과 우유를 풀어주세요.

    팬을 중불로 예열하고 식용유를 조금 두르세요.
    
    다진 양파와 다진 버섯을 팬에 넣고 볶아주세요. 양파와 버섯이 부드러워질 때까지 조리합니다.
    
    볶은 양파와 버섯 위에 계란과 우유 혼합물을 부은 후, 치즈를 골고루 뿌려주세요.
    
    오믈렛이 팬에 굳어질 때까지 중불에서 조리합니다.
    
    접시로 옮기고 더 치즈를 뿌려서 마무리합니다.
    
    따뜻하게 즐기세요.
    `

    AsyncStorage.setItem('foodName',foodName)
    AsyncStorage.setItem('ingredient', ingredient)
    AsyncStorage.setItem('recipe', recipe)

    sendData(foodName, ingredient, recipe)

    alert("분석이 완료되었습니다.")

    onNavigateToHomePage()
    
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
            source={{uri : "https://user-images.githubusercontent.com/67012995/280949906-4e8ecd64-81df-466c-a433-3fc59f611c10.png"}}
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
