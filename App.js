import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AppState,
} from 'react-native';

export default function App() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [appState, setAppState] = useState(AppState.currentState);

  // ===============================
  // FORMAT SỐ ĐIỆN THOẠI
  // ===============================
  const formatPhone = (text) => {
    // chỉ giữ số
    const cleaned = text.replace(/\D/g, '');

    // format: 093 454 34 44
    const match = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

    if (match) {
      return [match[1], match[2], match[3], match[4]]
        .filter(Boolean)
        .join(' ');
    }

    return text;
  };

  // ===============================
  // VALIDATE SỐ ĐIỆN THOẠI
  // ===============================
  const validatePhone = (text) => {
    const cleaned = text.replace(/\s/g, '');

    const phoneRegex = /^0\d{9}$/;

    return phoneRegex.test(cleaned);
  };

  // ===============================
  // VALIDATION KHI NHẬP
  // ===============================
  const handleChangeText = (text) => {
    const formatted = formatPhone(text);
    setPhone(formatted);

    if (formatted.length > 0 && !validatePhone(formatted)) {
      setError('Số điện thoại không đúng định dạng. Vui lòng nhập lại');
    } else {
      setError('');
    }
  };

  // ===============================
  // VALIDATION KHI CLICK
  // ===============================
  const handleContinue = () => {
    if (!validatePhone(phone)) {
      Alert.alert(
        'Lỗi',
        'Số điện thoại không đúng định dạng. Vui lòng nhập lại'
      );
      return;
    }

    Alert.alert('Thành công', 'Số điện thoại hợp lệ!');
  };

  // ===============================
  // useEffect – chạy 1 lần khi mở app
  // ===============================
  useEffect(() => {
    Alert.alert('Thông báo', 'Ứng dụng đã khởi động');
  }, []);

  // ===============================
  // useEffect – lắng nghe AppState
  // ===============================
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState) => {
        setAppState(nextAppState);
        console.log('App state:', nextAppState);
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.subtitle}>Nhập số điện thoại</Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="Nhập số điện thoại"
        value={phone}
        onChangeText={handleChangeText}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#1E3A8A',
    padding: 15,
    marginTop: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});