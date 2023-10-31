import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const More = ({ route , navigation}) => {
  // const { itemName = "김치볶음밥" } = route.params;

  const [foodname, setfoodname] = useState('');
  const [nameResult, setNameResult] = useState('');
  const [accessToken, setAccessToken] = useState('');

  let ingredient = null
  let recipe = null

  const getData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('accessToken:', accessToken);
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  useEffect(() => {
    getData().then(([token, name]) => {
      setAccessToken(token);
      setNameResult(name);
    });
  }, []);

  const fetchlogData = async () => {
    try {
      const url = "https://63e6-45-64-145-154.ngrok-free.app" + "/team3/getlog";
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
        setfoodname(responseJson[0]);
        console.log(foodname)
        ingredient = foodname[1];
        recipe = foodname[2];
      } else {
        console.error('주간 데이터 가져오기 실패:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  fetchlogData();

  

  return (
    <View>
      <Text style={styles.imageE}>음식 이름 : {foodname[0]}</Text>
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