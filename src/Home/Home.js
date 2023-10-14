import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_uri } from '@env';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const labels = ['1일차', '2일차', '3일차', '4일차', '5일차', '6일차', '7일차'];

const Home = ({ onNavigateToMore, navigateToPhotoAnalysis, navigateToVideoAnalysis }) => {
  const [nameResult, setNameResult] = useState('');
  const [weekproteinData, setWeekProteinData] = useState([1, 1, 1, 1]);
  const [accessToken, setAccessToken] = useState('');
  const [data, setData] = useState([]);

  let protein = { "닭가슴살": "닭가슴살은 칼로리가 낮지만 고단백질입니다." };
  let vitamin = { "치즈": "치즈에 들어있는 비타민A와 펩타이드는 항산화 작용으로 암세포 증식을 억제합니다." };
  let carbon = { "감자": "감자는 탄수화물이 많고 칼로리가 적으며 저렴하게 구할 수 있습니다.", "콩": "콩의 주요 건강 효과에는 체중 감량, 골밀도 증강, 유방암 발병률 감소 등이 있습니다." };
  let province = { "아몬드": "아몬드는 지방함량이 높지만 적당히 섭취하면 몸에 흡수되지 않으며 포만감을 줍니다." };
  let minerals = { "양파": "양파에는 많은 무기질이 있어 혈당 조절, 인슐린 생성 촉진, 당뇨 예방에 좋습니다." };

  const NUTRIENTS = [10, 60, 10, 40, 15];

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
      setNameResult(name);
    });
  }, []);

  useEffect(() => {
    // Fetch and set your chart data here, using your `api_uri` and `accessToken`
    const fetchChartData = async () => {
      try {
        const url = api_uri + '/api/v1/user/nutrient/all';
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        });

        if (response.status === 200) {
          const responseJson = await response.json();
          console.log('주간 데이터 가져오기 성공', responseJson);

          if (responseJson.length > 0) {
            const kcalData = responseJson.map(item => item.kcal);
            const chartData = kcalData.slice(0, 7);
            setData(chartData);
          }
        } else {
          console.error('주간 데이터 가져오기 실패:', response.status);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchChartData();
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

  if (NUTRIENTS[0] < 50) {
    let proteinR = Math.floor(Math.random() * Object.keys(protein).length);
    titleP = Object.keys(protein)[proteinR];
    subP = Object.values(protein)[proteinR];
  } else {
    titleP = "단백질은 충분합니다!";
  }
  if (NUTRIENTS[1] < 50) {
    let vitaminR = Math.floor(Math.random() * Object.keys(vitamin).length);
    titleV = Object.keys(vitamin)[vitaminR];
    subV = Object.values(vitamin)[vitaminR];
  } else {
    titleV = "비타민은 충분합니다!";
  }
  if (NUTRIENTS[2] < 50) {
    let carbonR = Math.floor(Math.random() * Object.keys(carbon).length);
    titleC = Object.keys(carbon)[carbonR];
    subC = Object.values(carbon)[carbonR];
  } else {
    titleC = "탄수화물은 충분합니다";
  }
  if (NUTRIENTS[3] < 50) {
    let provinceR = Math.floor(Math.random() * Object.keys(province).length);
    titlePV = Object.keys(province)[provinceR];
    subPV = Object.values(province)[provinceR];
  } else {
    titlePV = "지방은 충분합니다.";
  }
  if (NUTRIENTS[4] < 50) {
    let mineralsR = Math.floor(Math.random() * Object.keys(minerals).length);
    titleM = Object.keys(minerals)[mineralsR];
    subM = Object.values(minerals)[mineralsR];
  } else {
    titleM = "무기질은 충분합니다.";
  }

  const USERNAME = nameResult;

  return (
    <View Style={styles.container}>
      <View style={[styles.firstContainer]}>
        <View style={styles.contentContainer}>
          <Text style={[styles.greeting, styles.text]}>안녕하세요</Text>
          <Text style={[styles.username, styles.text, { color: '#5f4ffe' }]}>
            {USERNAME}
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
            source={require('../../assets/Home_F.jpg')}
            style={styles.rectangleFood}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToVideoAnalysis}>
          <Image
            source={require('../../assets/Home_E1.jpg')}
            style={styles.rectangleVideo}
          />
        </TouchableOpacity>

      </View>

      <View style={[styles.thirdContainer]}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <Text style={[styles.third_username, { color: '#5f4ffe' }]}>
              {USERNAME}
            </Text>
            <Text style={[styles.third_greeting,]}>님의 주간분석</Text>
            <View style={{ marginTop: -SCREEN_HEIGHT * 0.272512, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={onNavigateToMore}>
                <Text style={styles.buttonText}>추천식단</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.nut, { color: '#5f4ffe' }]}>   칼로리 주간그래프</Text>
          <BarChart
        style={styles.chart}
        data={data}
        svg={{ fill: '#5f4ffe' }}
        spacingInner={0.6}
        spacingOuter={0.1}
        gridMin={Math.min(...data)} // Set the gridMin to the minimum value in the data array
        animate
      >
  <XAxis
    style={{ marginHorizontal: -5, height: SCREEN_HEIGHT * 0.237, marginTop: SCREEN_HEIGHT * 0.18957346 }}
    data={data}
    formatLabel={(value, index) => labels[index]}
    contentInset={{ left: 20, right: 20 }}
    svg={{ fontSize: 12, fill: 'black' }}
  />
</BarChart>
          {/* 밑줄 추가 */}
          <View style={styles.chartFooterLine} />
          <Text style={{ marginTop: SCREEN_HEIGHT * 0.07109, marginLeft: SCREEN_WIDTH * 0.05, fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.000091, fontWeight: "bold", color: '#5f4ffe' }}>추천식단</Text>
          <ScrollView pagingEnabled horizontal style={styles.recFood} showsHorizontalScrollIndicator={false}>
            <View style={styles.recBlock}>
              <Text style={styles.foodName}>{titleP}</Text>
              <Text style={styles.foodDetail}>{subP}</Text>
              <Text style={styles.foodName}>{titleV}</Text>
              <Text style={styles.foodDetail}>{subV}</Text>
            </View>
            <View style={styles.recBlockNext}>
              <Text style={styles.foodName}>{titleC}</Text>
              <Text style={styles.foodDetail}>{subC}</Text>
              <Text style={styles.foodName}>{titlePV}</Text>
              <Text style={styles.foodDetail}>{subPV}</Text>
            </View>
            <View style={styles.recBlockNext}>
              <Text style={styles.foodName}>{titleM}</Text>
              <Text style={styles.foodDetail}>{subM}</Text>
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
});

export default Home;