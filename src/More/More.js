import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_url } from '@env';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const More = ({ route , navigation}) => {

  const [foodname, setfoodname] = useState([]);
  const [nameResult, setNameResult] = useState('');
  const [foodingredient, setFoodIngredient] = useState("")
  const [foodrecipe, setFoodRecipe] = useState("")
  const [accessToken, setAccessToken] = useState('');
  const [YoloImage, setYoloImage] = useState('');

  const getData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const food = await AsyncStorage.getItem('foodName')
      const recipe = await AsyncStorage.getItem('recipe')
      const ingredient = await AsyncStorage.getItem('ingredient')
      const YoloImage = await AsyncStorage.getItem('YoloImage')
      console.log('accessToken:', accessToken);
      return [accessToken, food, recipe, ingredient]
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  useEffect(() => {
    getData().then(([token, food, recipe, ingredient]) => {
      setAccessToken(token);
      setfoodname(food)
      setFoodIngredient(ingredient)
      setFoodRecipe(recipe)
    });
  }, []);
  useEffect(() => {
    const fetchlogData = async () => {
      try {
        // const url = api_url + "/team3/getlog";
        const url = "https://8ec7-2406-da12-16a-fe00-a13c-a008-b335-7158.ngrok-free.app/team3/getlog"
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: accessToken,
          }),
        });

        console.log(response.status)

        if (response.status === 200) {
          const responseJson = await response.json();
          console.log('주간 데이터 가져오기 성공', responseJson);
          // setfoodname(responseJson[0]);
        } else {
          console.error('주간 데이터 가져오기 실패:', response.status);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchlogData();
  }, [accessToken]);

  let food_name = foodname

  let ingredient = foodingredient

  let recipe = foodrecipe

  let img = YoloImage
  

  return (
    <View>
      <Text style={styles.imageE}>음식 이름 : {food_name}</Text>
      <View style={styles.correction}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.correctionTitle}>
            음식 재료
          </Text>
          <Text style={styles.correctionSub}>
            {ingredient}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.manual}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.manualTitle}>
            레시피
          </Text>
          <Text style={styles.manualSub}>
            {recipe}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageE: {
    // flex: 1,
    width: SCREEN_HEIGHT / 2.4,
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000076,
    marginTop: SCREEN_HEIGHT * 0.112,
    justifyContent: "flex-start",
    fontWeight: 'bold',
    color: "#778D45"
  },
  correction: {
    flex: 1,
    width: SCREEN_HEIGHT / 2.4,
    backgroundColor: '#E2E2E2',
    borderRadius: 20,
    marginTop: SCREEN_HEIGHT * 0.012,
    marginBottom: SCREEN_HEIGHT * 0.012,
  },
  correctionTitle: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000076,
    color: '#AEC670',
    marginTop: SCREEN_HEIGHT * 0.012,
    marginLeft: SCREEN_WIDTH * 0.05,
    marginRight: SCREEN_WIDTH * 0.05,
    justifyContent: "flex-start",
    fontWeight: 'bold'
  },
  correctionSub: {
    marginTop: SCREEN_HEIGHT * 0.012,
    marginLeft: SCREEN_WIDTH * 0.05,
    marginRight: SCREEN_WIDTH * 0.05,
    marginBottom: SCREEN_HEIGHT * 0.012,
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000036,
  },
  manual: {
    flex: 2,
    width: SCREEN_HEIGHT / 2.4,
    backgroundColor: '#E2E2E2',
    borderRadius: 20,
    marginTop: SCREEN_HEIGHT * 0.012,
    marginBottom: SCREEN_HEIGHT * 0.012,
  },
  manualTitle: {
    color: '#AEC670',
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000076,
    marginTop: 15,
    marginLeft: SCREEN_WIDTH * 0.05,
    marginRight: SCREEN_WIDTH * 0.05,
    justifyContent: "flex-start",
    fontWeight: 'bold'
  },
  manualSub: {
    // fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000036,
    marginTop: SCREEN_HEIGHT * 0.012,
    marginLeft: SCREEN_WIDTH * 0.05,
    marginRight: SCREEN_WIDTH * 0.05,
    marginBottom: SCREEN_HEIGHT * 0.012,
  },
});

export default More;