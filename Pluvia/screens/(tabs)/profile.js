import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const emailSalvo = await AsyncStorage.getItem('emailUsuario');

        if (!emailSalvo) {
          Alert.alert('Erro', 'Email não encontrado. Faça login novamente.');
          navigation.navigate('Loginpage');
          return;
        }

        const response = await fetch(`http://4.246.219.48:8080/usuarios/${encodeURIComponent(emailSalvo)}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário');
          
        }

        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar o perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  const handleDeletarConta = async () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const email = await AsyncStorage.getItem('emailUsuario');

              const response = await fetch(`http://4.246.219.48:8080/usuarios/${encodeURIComponent(email)}`, {
                method: 'DELETE',
              });

              if (!response.ok) {
                throw new Error('Dê-nos mais uma chance', "Erro ao deletar o perfil.");
              }

              await AsyncStorage.removeItem('emailUsuario');
              Alert.alert('Até logo...', 'Conta excluída com sucesso');
              navigation.navigate('Home');
            } catch (error) {
              console.error(error);
              Alert.alert('Erro', 'Falha ao excluir conta.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Erro ao carregar perfil.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle" size={120} color="#007AFF" style={styles.icon} />
      <Text style={styles.name}>{usuario.nome}</Text>
      <Text style={styles.email}>{usuario.email}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#FF3B30', marginTop: 12 }]} onPress={handleDeletarConta}>
        <Text style={styles.buttonText}>Excluir Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  icon: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
