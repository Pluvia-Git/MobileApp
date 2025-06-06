import { StyleSheet, Text, View } from "react-native";


export default function Alagamento() {
  return (
    <View style={styles.container}>
      <Text>Dados sobre alagamentos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});