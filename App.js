import React, { useState } from 'react';
import { StatusBar, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from 'react-native-vector-icons';
import SignUp from './src/Auth/SignUp';
import Login from './src/Auth/Login';
import Home from './src/Home/Home';
import Photo from './src/Photo/Photo';
import Photo_Analysis from './src/Photo/Photo_Analysis';
import More from './src/More/More';

export default function App() {
  const getData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('accessToken:', accessToken);
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };
  //if accessToken 있으면 usestate home으로 없으면 usestate login으로

  const [activeTab, setActiveTab] = useState('login');
  const [showNavigationBar, setShowNavigationBar] = useState(false);

  const navigateToMore = () => {
    setActiveTab('more');
    setShowNavigationBar(true);
  };
  const navigateToPhotoAnalysis = () => {
    setActiveTab('photo_analysis');
    setShowNavigationBar(true);
  };
  const navigateToPhoto = () => {
    setActiveTab('photo');
    setShowNavigationBar(true);
  };
  const navigateToHome = () => {
    setActiveTab('home');
    setShowNavigationBar(true);
  };

  const navigateToSignUp = () => {
    setActiveTab('signUp');
    setShowNavigationBar(false);
  };

  const navigatetoPhotoEdit = () => {
    setActiveTab('photo_edit');
    setShowNavigationBar(false);
  };

  const navigateToLogin = () => {
    setActiveTab('login');
    setShowNavigationBar(false);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home onNavigateToMore={navigateToMore} navigateToPhotoAnalysis={navigateToPhotoAnalysis} />;
      case 'photo':
        return <Photo />;
      case 'signUp':
        return <SignUp onNavigateToLogin={navigateToLogin} />;
      case 'login':
        return <Login onLogin={navigateToHome} onNavigateToSignUp={navigateToSignUp} />;
      case 'more':
        return <More onNavigateToHome={navigateToHome} />;
      case 'photo_analysis':
        return <Photo_Analysis onNavigateToPhoto={navigateToPhoto} />;
      case 'photo_edit':
        return <Photo_Edit onNavigateToPhotoEdit={navigateToPhotoEdit} />;
      default:
        return <Home onNavigateToMore={navigateToMore} navigateToPhotoAnalysis={navigateToPhotoAnalysis} />;
    }
  };

  return (
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <View style={styles.content}>{renderPage()}</View>
    {showNavigationBar && (
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('home')}
        >
          <Ionicons name="home-outline" size={24} color={activeTab === 'home' ? '#000' : '#c0c0c0'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('photo')}
        >
          <FontAwesome5 name="camera" size={24} color={activeTab === 'photo' ? '#000' : '#c0c0c0'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('more')}
        >
          <FontAwesome5 name="scroll" size={24} color={activeTab === 'more' ? '#000' : '#c0c0c0'} />
        </TouchableOpacity>
      </View>
    )}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});