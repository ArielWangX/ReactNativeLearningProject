import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {flex: 2}]}>Step 1</Text>
      <Text style={[styles.text, {flex: 1}]}>Step 2</Text>
      <Text style={[styles.text, {flex: 1}]}>Step 3</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "orange",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  text: {
    margin: 40,
    backgroundColor: "red",
  },
});
