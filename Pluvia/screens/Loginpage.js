import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { API_URL_LOGIN } from '@env';

const { width, height } = Dimensions.get('window');

export default function Loginpage() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (email === '' || senha === '') {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    fetch(API_URL_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Login inválido');
        }
      })
      .then(data => {
        console.log('Login realizado:', data);
        navigation.navigate('Mainpage');
      })
      .catch(error => {
        Alert.alert('Erro', 'Email ou senha inválidos');
      });
  };

  return (
    <Animatable.View 
      animation="fadeInUp"
      duration={1000}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require('../assets/pluvia.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput 
          placeholder="Digite seu email"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput 
          placeholder="Digite sua senha"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupContainer}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signupText}>
            Não tem uma conta? <Text style={styles.signupLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: width * 0.55,
    height: height * 0.15,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: '#004080',
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#0059b3',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  label: {
    color: '#004080',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f0f8ff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
    borderWidth: 1,
    borderColor: '#cce6ff',
  },
  button: {
    backgroundColor: '#007ACC',
    paddingVertical: 16,
    borderRadius: 35,
    elevation: 6,
    shadowColor: '#007ACC',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 7,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  signupContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  signupText: {
    color: '#004080',
    fontSize: 15,
  },
  signupLink: {
    color: '#007ACC',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
