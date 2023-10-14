import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const More = ({ onNavigateToHome }) => {
  const getData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('accessToken:', accessToken);
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };
  const protein = { "닭가슴살": "닭가슴살은 칼로리가 낮지만 고단백질입니다." };
  const vitamin = { "치즈": "치즈에 들어있는 비타민A와 펩타이드는 항산화 작용으로 암세포 증식을 억제합니다." };
  const carbon = { "감자": "감자는 탄수화물이 많고 칼로리가 적으며 저렴하게 구할 수 있습니다.", "콩": "콩의 주요 건강 효과에는 체중 감량, 골밀도 증강, 유방암 발병률 감소 등이 있습니다." };
  const province = { "아몬드": "아몬드는 지방함량이 높지만 적당히 섭취하면 몸에 흡수되지 않으며 포만감을 줍니다." };
  const minerals = { "양파": "양파에는 많은 무기질이 있어 혈당 조절, 인슐린 생성 촉진, 당뇨 예방에 좋습니다." };

  const NUTRIENTS = [10, 60, 10, 40, 15];

  if (NUTRIENTS[0] < 50) {
    proteinR = Math.floor(Math.random() * Object.keys(protein).length)
    titleP = Object.keys(protein)[proteinR];
    subP = Object.values(protein)[proteinR];
  } else {
    titleP = "단백질은 충분합니다!"
    subP = ""
  }
  if (NUTRIENTS[1] < 50) {
    vitaminR = Math.floor(Math.random() * Object.keys(vitamin).length)
    titleV = Object.keys(vitamin)[vitaminR];
    subV = Object.values(vitamin)[vitaminR];
  } else {
    titleV = "비타민은 충분합니다!"
    subV = ""
  }
  if (NUTRIENTS[2] < 50) {
    carbonR = Math.floor(Math.random() * Object.keys(carbon).length)
    titleC = Object.keys(carbon)[carbonR];
    subC = Object.values(carbon)[carbonR];
  } else {
    titleC = "탄수화물은 충분합니다"
    subC = ""
  }
  if (NUTRIENTS[3] < 50) {
    provinceR = Math.floor(Math.random() * Object.keys(province).length)
    titlePV = Object.keys(province)[provinceR];
    subPV = Object.values(province)[provinceR];
  } else {
    titlePV = "지방은 충분합니다."
    subPV = ""
  }
  if (NUTRIENTS[4] < 50) {
    mineralsR = Math.floor(Math.random() * Object.keys(minerals).length)
    titleM = Object.keys(minerals)[mineralsR];
    subM = Object.values(minerals)[mineralsR];
  } else {
    titleM = "무기질은 충분합니다."
    subM = ""
  }

  //추천 식단 랜덤 추천 개발 방향 정해지면 수정 예정

  //const proteinEx{}

  //const recEx = [recEc1, recEx2, recEx3, recEx4, recEx5];

  /* const recExList = ["닭가슴살은 칼로리가 낮지만 고단백질입니다.", "샐러드는 비타민 및 무기질, 섬유질이 많고 포만감이 높습니다",
     "백미밥의 환경과는 달리, 쌀겨와 쌀눈에 있는 영양소를 섭취할 수 있게 됩니다 ...(설명)", "추천운동과 진행하며 지방을 에너지로...(설명)",
     "삶은 계란은 단백질 함량이 많기 때문에...(설명)"] // 식단 설명*/

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateToHome}>
          <Text style={styles.headerText}>홈</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}></Text>
        <Text style={styles.headerText}>추천식단</Text>
        <Text style={styles.headerText}></Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.middleText}>추천식단</Text>
      </View>

      {/* 마지막 부분 */}
      <View style={styles.last}>
        <ScrollView contentContainerStyle={styles.container}>
          <ScrollView contentContainerStyle={styles.recommendFood}>
            <Text style={styles.foodName}>{titleP}</Text>
            <Text style={styles.foodDetail}>{subP}</Text>
          </ScrollView>
          <ScrollView contentContainerStyle={styles.recommendFood}>
            <Text style={styles.foodName}>{titleV}</Text>
            <Text style={styles.foodDetail}>{subV}</Text>
          </ScrollView>
          <ScrollView contentContainerStyle={styles.recommendFood}>
            <Text style={styles.foodName}>{titleC}</Text>
            <Text style={styles.foodDetail}>{subC}</Text>
          </ScrollView>
          <ScrollView contentContainerStyle={styles.recommendFood}>
            <Text style={styles.foodName}>{titlePV}</Text>
            <Text style={styles.foodDetail}>{subPV}</Text>
          </ScrollView>
          <ScrollView contentContainerStyle={styles.recommendFood}>
            <Text style={styles.foodName}>{titleM}</Text>
            <Text style={styles.foodDetail}>{subM}</Text>
          </ScrollView>
        </ScrollView>
        {/* 마지막 부분 내용을 채워주세요 */}
      </View>
    </View>
  );
}
console.log(SCREEN_HEIGHT)
console.log(SCREEN_WIDTH)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.001,
    marginLeft: SCREEN_WIDTH * 0.05,
    marginRight: SCREEN_WIDTH * 0.25,
  },
  iconHome: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendation: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.00005,
    fontWeight: 'bold',
  },
  middleText: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.0001,
    fontWeight: 'bold',
    color: '#5f4ffe',
    marginTop: -SCREEN_HEIGHT * 0.06,
    marginLeft: -SCREEN_WIDTH * 0.564,
  },
  middle: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  last: {
    flex: 3,
    justifyContent: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 20,
    padding: 20,
    marginLeft: SCREEN_WIDTH * 0.025,
    marginRight: SCREEN_WIDTH * 0.025,
    marginBottom: SCREEN_HEIGHT * 0.012,
  },
  recommendFood: {
    flex: 1,
    justifyContent: "center",
  },
  foodName: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.0001,
    color: '#50a5ff',
    marginLeft: SCREEN_WIDTH * 0.05,
    marginRight: SCREEN_WIDTH * 0.05,
    justifyContent: "flex-start",
  },
  foodDetail: {
    fontSize: SCREEN_HEIGHT * SCREEN_WIDTH * 0.00005,
    color: 'black',
    marginLeft: SCREEN_WIDTH * 0.05,
    marginRight: SCREEN_WIDTH * 0.05,
    justifyContent: "flex-start",
  },
});

export default More;