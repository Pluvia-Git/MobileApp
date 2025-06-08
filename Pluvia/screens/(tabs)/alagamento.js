import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const dadosAlagamento = [
  { cidade: "São Paulo", nivel: "Alto", ocorrencias: 52 },
  { cidade: "Guarulhos", nivel: "Médio", ocorrencias: 30 },
  { cidade: "Santo André", nivel: "Baixo", ocorrencias: 14 },
  { cidade: "São Bernardo do Campo", nivel: "Alto", ocorrencias: 39 },
  { cidade: "Osasco", nivel: "Médio", ocorrencias: 22 },
  { cidade: "Diadema", nivel: "Baixo", ocorrencias: 9 },
  { cidade: "Mogi das Cruzes", nivel: "Médio", ocorrencias: 17 },
  { cidade: "Carapicuíba", nivel: "Alto", ocorrencias: 26 },
];

const getNivelColor = (nivel) => {
  switch (nivel) {
    case "Alto":
      return "#FF6B6B";
    case "Médio":
      return "#FFD93D";
    case "Baixo":
      return "#6BCB77";
    default:
      return "#ccc";
  }
};

export default function Alagamento() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Recentes Dados de Alagamentos</Text>
      <FlatList
        data={dadosAlagamento}
        keyExtractor={(item) => item.cidade}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderLeftColor: getNivelColor(item.nivel) }]}>
            <MaterialCommunityIcons name="weather-pouring" size={32} color="#87CEEB" />
            <View style={styles.textos}>
              <Text style={styles.cidade}>{item.cidade}</Text>
              <Text style={styles.detalhe}>
                Ocorrências: <Text style={styles.valor}>{item.ocorrencias}</Text>
              </Text>
              <Text style={styles.detalhe}>
                Nível: <Text style={[styles.valor, { color: getNivelColor(item.nivel) }]}>{item.nivel}</Text>
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#87ceeb",
    marginBottom: 20,
    alignSelf: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textos: {
    marginLeft: 12,
  },
  cidade: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  detalhe: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  valor: {
    fontWeight: "bold",
  },
});
