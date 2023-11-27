import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_uri } from '@env';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Stack = createStackNavigator();

const Home = ({ onNavigateToMore, navigateToPhotoAnalysis, onNavigateToPhotoEdit }) => {
  const [nameResult, setNameResult] = useState('');
  const [weekproteinData, setWeekProteinData] = useState([1, 1, 1, 1]);
  const [accessToken, setAccessToken] = useState('');
  const [data, setData] = useState([]);

  // const handleNavigateToMore = (itemName) => {
  //   onNavigateToMore("more", { itemName });
  // }

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
      console.log(name)
      setNameResult(name);
      console.log(nameResult)
    });
  }, []);

  useEffect(() => {
    const fetchlogData = async () => {
      try {
        const url = "https://7fa5-2406-da12-16a-fe00-a13c-a008-b335-7158.ngrok-free.app/team3/getlog"
        // const url = api_uri + "/team3/getlog";
        // const url = "https://8ec7-2406-da12-16a-fe00-a13c-a008-b335-7158.ngrok-free.app/team3/getlog"
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
          console.log('주간 데이터 가져오기 성공');
          setData(responseJson);
        } else {
          console.error('주간 데이터 가져오기 실패:', response.status);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchlogData();
  }, [accessToken]);

  useEffect(() => {
    getData().then((result) => {
      accessToken = result[0];
      nameResult = result[1];
    });
  }, []);

  let titleP = "";
  let subP = "";
  let titleV = "";
  let subV = "";
  let titleC = "";
  let subC = "";
  let titlePV = "";
  let subPV = "";
  let titleM = "";
  let subM = "";



  return (
    <View Style={styles.container}>
      <View style={[styles.firstContainer]}>
        <View style={styles.contentContainer}>
          <Text style={[styles.greeting, styles.text]}>안녕하세요</Text>
          <Text style={[styles.username, styles.text, { color: '#AEC09A' }]}>
            {nameResult}
          </Text>
          <Text style={[styles.greeting, styles.text]}>님!</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.image}
          />
        </View>
      </View>

      <View style={styles.secondContainer}>
        <TouchableOpacity onPress={navigateToPhotoAnalysis}>
          <Image
            source={require('../../assets/nutrition.png')}
            style={styles.rectangleFood}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNavigateToPhotoEdit}>
          <Image
            source={require('../../assets/log.png')}
            style={styles.rectangleVideo}
          />
        </TouchableOpacity>

      </View>

      <View style={[styles.thirdContainer]}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <Text style={[styles.third_username, { color: '#AEC09A' }]}>
              {nameResult}
            </Text>
            <Text style={[styles.third_greeting,]}>님의 주간분석</Text>
            <View style={{ marginTop: -SCREEN_HEIGHT * 0.272512, flexDirection: 'row', alignItems: 'center' }}>
            </View>
          </View>
          <Text style={[styles.nut, { color: '#778D45' }]}>   전에 먹었던 요리들</Text>

          <ScrollView pagingEnabled horizontal style={styles.recFood} showsHorizontalScrollIndicator={false}>
            <View style={styles.recBlock} >
              {data.map((item, index) => (
                <TouchableOpacity key={index} onPress={onNavigateToMore}>
                  <Text style={styles.textItem}>{item[0]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  firstContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: SCREEN_HEIGHT * 0.024,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.0000607,
  },
  username: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.0000607,
    marginLeft: 4,
  },
  imageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: SCREEN_WIDTH * 0.041025641,
  },
  image: {
    width: SCREEN_WIDTH * 0.230769,
    height: SCREEN_HEIGHT * 0.1066,
    borderRadius: 50,
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  rectangleFood: {
    width: SCREEN_WIDTH * 0.4102564,
    height: SCREEN_HEIGHT * 0.1066,
    marginBottom: SCREEN_HEIGHT * 0.019,
    borderRadius: 10,
  },
  rectangleVideo: {
    width: SCREEN_WIDTH * 0.4102564,
    height: SCREEN_HEIGHT * 0.1066,
    marginBottom: SCREEN_HEIGHT * 0.019,
    borderRadius: 10,
  },
  thirdContainer: {
    backgroundColor: '#F0F0F0',
    flex: 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: SCREEN_WIDTH * 0.0410,
    marginRight: SCREEN_WIDTH * 0.0410,
    marginBottom: SCREEN_HEIGHT * 0.019,
  },
  text: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.0000607,
    fontWeight: 'bold',
  },
  chart: {
    width: SCREEN_WIDTH * 0.8718,
    height: SCREEN_HEIGHT * 0.1777,
  },
  third_greeting: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000091 * 0.5,
    fontWeight: 'bold',
    marginTop: SCREEN_HEIGHT * 0.024,
    marginBottom: SCREEN_HEIGHT * 0.024,
    justifyContent: "flex-start",
  },
  third_username: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000091 * 0.5,
    marginLeft: SCREEN_WIDTH * 0.05,
    fontWeight: 'bold',
    marginTop: SCREEN_HEIGHT * 0.024,
    marginBottom: SCREEN_HEIGHT * 0.024,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  labelText: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000091 * 0.5,
    color: 'gray',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#5f4ffe',
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.0000547,
    marginTop: SCREEN_HEIGHT * 0.296,
    marginBottom: SCREEN_HEIGHT * 0.024,
    justifyContent: "flex-end",
    marginLeft: SCREEN_WIDTH * 0.3,
  },
  chartFooterLine: {
    borderTopWidth: 2,
    borderColor: 'black',
    width: '100%',
  },
  recFood: {
    marginTop: SCREEN_HEIGHT * 0.024,
  },
  recBlock: {
    width: SCREEN_WIDTH,
    marginLeft: SCREEN_WIDTH * 0.05,
    marginRight: SCREEN_WIDTH * 0.05,
  },
  recBlockNext: {
    width: SCREEN_WIDTH,
    marginLeft: -SCREEN_WIDTH * 0.13,
    marginRight: SCREEN_WIDTH * 0.05,
  },
  foodName: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000091,
    color: '#50a5ff',
    marginBottom: SCREEN_HEIGHT * 0.012,
  },
  foodDetail: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000091 * 0.5,
    color: 'black',
    marginBottom: SCREEN_HEIGHT * 0.024,
    marginRight: SCREEN_WIDTH * 0.16,
  },
  nut: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000076,
    fontWeight: 'bold',
  },
  textItem: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000076,
    fontWeight: 'bold',
    color: '#AEC670',
    marginTop: SCREEN_HEIGHT * 0.012,
    marginLeft: SCREEN_WIDTH * 0.0410,
    marginRight: SCREEN_WIDTH * 0.0410,
    marginBottom: SCREEN_HEIGHT * 0.019,
    width: SCREEN_WIDTH * 0.7102564,
    height: SCREEN_HEIGHT * 0.0466,
    backgroundColor: '#E2E2E2',
    padding: 10,
  }
});

export default Home;