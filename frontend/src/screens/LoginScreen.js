// LoginScreen.js: Màn hình login với form validation.

import React from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import api from '../api/axiosInstance';
import { useAuth } from '../auth/AuthContext';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigation = useNavigation();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      await login(res.data.token, res.data.user);
      Toast.show({ type: 'success', text1: 'Login thành công' });
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Lỗi login: ' + (err.response?.data?.message || err.message) });
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput label="Email" value={value} onChangeText={onChange} mode="outlined" />
        )}
      />
      {errors.email && <Text>Email required</Text>}
      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput label="Password" value={value} onChangeText={onChange} secureTextEntry mode="outlined" style={{ marginTop: 10 }} />
        )}
      />
      {errors.password && <Text>Password required</Text>}
      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>Login</Button>
      <Button onPress={() => navigation.navigate('Register')}>Register</Button>
    </View>
  );
};

export default LoginScreen;