import { StyleSheet, Text, View, Button } from "react-native";
import { useAuth } from "../context/AppContext";

export default function LoginScreen() {
  const { value: auth } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Button title="Login" onPress={auth.login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});
