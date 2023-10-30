import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts';
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Home = ({ onNavigateToMore, navigateToPhotoAnalysis, navigateToVideoAnalysis }) => {

  return (
    <View Style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/default_profile.png')}
            style={styles.image}
          />
      </View>

      {/* <View style={styles.secondContainer}>
        <TouchableOpacity onPress={navigateToPhotoAnalysis}>
          <Image
            source={require('../../assets/123.jpg')}
            style={styles.rectangleFood}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToVideoAnalysis}>
          <Image
            source={require('../../assets/321.jpg')}
            style={styles.rectangleVideo}
          />
        </TouchableOpacity>

      </View> */}
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

});

export default Home;