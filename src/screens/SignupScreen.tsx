import { StyleSheet, Text, View, Button } from "react-native";
import { useAuth } from "../context/AppContext";

export default function SignUpScreen() {
  const { value: auth } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Button title="Sign Up" onPress={auth.login} />{" "}
      {/* Auth0 handles sign-up */}
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
