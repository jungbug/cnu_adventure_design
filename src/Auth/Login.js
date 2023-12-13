import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { api_uri } from '@env';

import iconImage from '../../assets/icon.png';

const Login = ({ onLogin, onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nameResult, setNameResult] = useState('테스트');


  const saveData = async (data, id) => {
    try {
      await AsyncStorage.setItem('accessToken', data);
      await AsyncStorage.setItem('userId', id);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const getData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const popName = await AsyncStorage.getItem('userId')
      return [accessToken, popName];
    } catch (error) {
      console.error('Error getting data:', error);
      return 0;
    }
  };

  const handleLogin = async () => {
    const id = email;
    const pw = password;

    setIsLoading(true);

    const url = api_uri + "/team3/login";
    
    try {
      const response = await fetch(url, {
        method: 'GET'
      });

      setIsLoading(false);


      const responseJson = await response.json();

      if (response.status === 200) {
        const responseurl2 = await fetch(url, {
          method: 'GET'
        });
        
        const responseJsonurl2 = await responseurl2.json();
        for (let i in responseJsonurl2) {
          if (responseJsonurl2[i].user_id === id && responseJsonurl2[i].user_pw === pw) {
            onLogin(tokenResult);
            saveData(responseJsonurl2[i].user_id, responseJsonurl2[i].user_name);
          }else{
            setLoginFailed(true);
          }
        }
        const tokenResult = await getData();
        if (tokenResult[0] !== undefined || tokenResult[0] !== null) {
          // onLogin(tokenResult);
          setLoginFailed(false);
        } else {
          setLoginFailed(true);
        }
        return response;
      } else {
        setLoginFailed(true);
        return 0;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setIsLoading(false);
      setLoginFailed(true);
      return 0;
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#50a5ff" />
      ) : (
        <>
          <Image source={iconImage} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력해주세요."
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요."
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />

          {loginFailed && (
            <Text style={styles.warning}>로그인에 실패했습니다. 다시 시도하세요.</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpButton} onPress={onNavigateToSignUp}>
            <Text style={[styles.buttonText, styles.signUpButtonText]}>회원가입</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 280,
    height: 50,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#AEC670',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  signUpButton: {
    backgroundColor: 'white',
    borderColor: '#AEC670',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 72,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 5,
    color: 'white',
  },
  signUpButtonText: {
    color: '#AEC670',
  },
  icon: {
    width: 300,
    height: 250,
    marginBottom: 16,
  },
  warning: {
    color: 'red',
    marginTop: 10,
  },
});

export default Login;