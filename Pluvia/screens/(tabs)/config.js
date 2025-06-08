import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Config() {
  const [emailSalvo, setEmailSalvo] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const carregarEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("emailUsuario");
        if (email) setEmailSalvo(email);
      } catch (error) {
        console.error("Erro ao carregar email do AsyncStorage", error);
      }
    };

    carregarEmail();
  }, []);

  const sairDaConta = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Ajustes e Configurações</Text>

      <View style={styles.card}>
        <Ionicons name="person-circle-outline" size={30} color="#87CEEB" />
        <Text style={styles.label}>Conta: {emailSalvo || "Carregando..."}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.option}>Notificações</Text>
        <Switch value={true} thumbColor="#87CEEB" trackColor={{ true: "#CBE9F7", false: "#ccc" }} />
      </View>

      <View style={styles.item}>
        <Text style={styles.option}>Modo escuro</Text>
        <Switch value={false} thumbColor="#87CEEB" trackColor={{ true: "#CBE9F7", false: "#ccc" }} />
      </View>

      <View style={styles.card}>
        <MaterialIcons name="language" size={30} color="#87CEEB" />
        <Text style={styles.label}>Idioma</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FF6B6B" }]}
        onPress={sairDaConta}
      >
        <Text style={[styles.buttonText, { color: "#fff" }]}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    height: '100%'
    
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#87ceeb",
    marginBottom: 30,
    alignSelf: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F8FC",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
  },
  option: {
    fontSize: 16,
    color: "#444",
  },
  button: {
    backgroundColor: "#87CEEB",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
