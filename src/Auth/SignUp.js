import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { api_uri } from '@env';

const SignUp = ({ onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');

  const handleSignUp = async () => {
    if (name.length === 0 || email.length < 8 || password.length < 8) {
      setWarning('아이디, 비밀번호는 8글자 이상이어야 합니다.');
      return;
    }

    console.log(email, password, name)

    const url = "https://b9ea-2406-da12-16a-fe00-a13c-a008-b335-7158.ngrok-free.app/team3/register"
    
    const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: email,
          user_pw: password,
          user_name: name,
          log: []
        }),
      }, 
    );

    const responsetext = await response.text();

    if (response.status === 200 && responsetext === '확인이요') {
      console.log('성공');
      onNavigateToLogin();
      return response;
    } else {
      Alert.alert('회원가입 실패', '이미 존재하는 아이디입니다.');
      console.log('실패');
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="이름을 입력하세요"
        onChangeText={text => setName(text)}
      />

      <Text style={styles.label}>아이디 (8글자 이상)</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력하세요"
        onChangeText={text => setEmail(text)}
      />

      <Text style={styles.label}>비밀번호 (8글자 이상)</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />

      {warning ? <Text style={styles.warning}>{warning}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>확인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={onNavigateToLogin}
      >
        <Text style={styles.loginButtonText}>이미 계정이 있으신가요?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
    alignSelf: 'flex-start',
    marginLeft: 20,
    color: '#50a5ff',

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
    backgroundColor: '#50a5ff',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  warning: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 20,
  },
  loginButtonText: {
    color: '#50a5ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUp;