import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { createExpense } from "../services/api";
import { Expense, expenseCategoryEnum } from "../types";

const categories = expenseCategoryEnum.options;

export default function AddExpenseScreen({ route, navigation }: any) {
  const { monthId } = route.params;
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    category: categories[0],
  });

  const handleSave = async () => {
    const newExpense: Expense = {
      description: expense.description,
      amount: parseFloat(expense.amount),
      date: new Date().toISOString(),
      category: expense.category,
      monthlyExpenseId: monthId,
    };
    await createExpense(newExpense);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={expense.description}
        onChangeText={(text) => setExpense({ ...expense, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={expense.amount}
        onChangeText={(text) => setExpense({ ...expense, amount: text })}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={expense.category}
        onValueChange={(itemValue) =>
          setExpense({
            ...expense,
            category: itemValue,
          })
        }
        style={styles.picker}
      >
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 },
  picker: { height: 50, marginBottom: 8 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
});
