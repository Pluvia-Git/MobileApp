import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ActivityIndicator, ScrollView } from 'react-native';

export default function Mainpage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.1.5:5000')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#87ceeb" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Clima</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#87ceeb" />
        ) : data ? (
          <>
            <Text style={styles.label}>Usuário:</Text>
            <Text style={styles.text}>{data.usuario}</Text>

            <Text style={styles.label}>Clima Atual:</Text>
            <Text style={styles.text}>{data.clima}</Text>

            <Text style={styles.label}>Risco de Alagamento:</Text>
            <Text style={styles.text}>{data.risco}</Text>
          </>
        ) : (
          <Text style={styles.error}>Erro ao carregar dados.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#87ceeb',
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  label: {
    color: '#87ceeb',
    fontWeight: 'bold',
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});
