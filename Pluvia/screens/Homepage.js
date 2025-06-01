import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function Homepage() {
  const navigation = useNavigation();

  return (
    <Animatable.View 
        animation="fadeIn"
        duration={1200}
        easing="ease-out"
        delay={200}
        style={styles.container}
        >
      <View style={styles.header}>
        <Image
          source={require('../assets/pluvia.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo a Pluvia</Text>

        <Text style={styles.subtitle}>
          Previsão do tempo precisa, simples e elegante. Além de alertas sobre alagamentos.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>INICIAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>
            Já possui uma conta? <Text style={styles.loginLink}>Entrar</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  header: {
    flex: 0.7,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginBottom: -120
  },
  image: {
    width: width * 0.85,
    height: height * 0.3,
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 17,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#87ceeb',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 5,
    width: 220,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  loginContainer: {
    marginTop: 25,
  },
  loginText: {
    color: '#666',
    fontSize: 16,
  },
  loginLink: {
    color: '#87ceeb',
    fontWeight: '600',
  },
});
