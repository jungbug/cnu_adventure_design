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

  const getData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const food = AsyncStorage.getItem('foodName')
      console.log('accessToken:', accessToken);
      return [accessToken, food]
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  useEffect(() => {
    getData().then(([token, food]) => {
      setAccessToken(token);
      setfoodname(food)
    });
  }, []);
  useEffect(() => {
    const fetchlogData = async () => {
      try {
        // const url = api_url + "/team3/getlog";
        const url = "https://b9ea-2406-da12-16a-fe00-a13c-a008-b335-7158.ngrok-free.app/team3/getlog"
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

  let food_name = "김치볶음밥"


  let ingredient = 
  `
  밥: 1인분 기준으로 1컵
  김치: 1컵 정도 (적당히 다진 김치)
  돼지고기: 100g (다진 돼지고기, 선택사항)
  양파: 1개 (작게 다진 양파)
  달걀: 2개
  식용유: 2~3 큰 숟가락
  간장: 2~3 큰 숟가락
  참기름: 1 큰 숟가락 (선택사항)
  소금: 맛에 따라
  후추: 맛에 따라`

  let recipe = `
  먼저 밥을 미리 짓고 식혀둡니다. 한두 시간 정도 식히면 좋습니다.

  돼지고기가 있다면 먼저 잘게 다져서 기름이 녹을 때까지 볶아줍니다.
  
  기름이 나오면 다진 양파를 넣고 양파가 투명해질 때까지 볶아줍니다.
  
  김치를 넣고 함께 볶아줍니다. 김치가 볶음밥의 맛을 살려줍니다.
  
  밥을 넣고 김치와 밥이 잘 섞일 때까지 볶아줍니다.
  
  간장을 더해 볶음밥에 감칠맛을 더합니다.
  
  후추와 소금을 맛에 따라 조절합니다.
  
  볶음밥을 중약불에서 조금 더 볶아줍니다.
  
  계란을 풀어 볶음밥에 넣고 잘 섞어줍니다.
  
  볶음밥이 고루 섞이고 계란이 익으면 불을 끕니다.
  
  볶음밥을 그릇에 담고 참기름을 뿌린 뒤 바로 먹습니다.`
  

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
    color: "#d61e11"
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
    color: '#e8594e',
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
    color: '#e8594e',
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