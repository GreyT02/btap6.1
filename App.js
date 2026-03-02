import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

export default function App() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // Format số điện thoại: 093 454 43 44
  const formatPhone = (text) => {
    // Xóa ký tự không phải số
    const cleaned = text.replace(/\D/g, '');

    // Chia nhóm số
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

    if (match) {
      return [match[1], match[2], match[3], match[4]]
        .filter(x => x)
        .join(' ');
    }

    return cleaned;
  };

  const handleChange = (text) => {
    const formatted = formatPhone(text);
    setPhone(formatted);
    setError('');
  };

  const validatePhone = () => {
    const cleaned = phone.replace(/\s/g, '');

    // Kiểm tra 10 số và bắt đầu bằng 0
    const regex = /^0\d{9}$/;

    if (!regex.test(cleaned)) {
      setError('Số điện thoại không đúng định dạng. Vui lòng nhập lại');
      Alert.alert(
        'Lỗi',
        'Số điện thoại không đúng định dạng. Vui lòng nhập lại'
      );
    } else {
      setError('');
      Alert.alert('Thành công', 'Số điện thoại hợp lệ');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Nhập số điện thoại</Text>
      <Text style={styles.subText}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
      </Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="numeric"
        value={phone}
        onChangeText={handleChange}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={validatePhone}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  subText: {
    color: 'gray',
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  inputError: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});