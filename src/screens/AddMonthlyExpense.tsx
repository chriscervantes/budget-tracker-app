import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { createMonthlyExpense } from "../services/api";
import { MonthlyExpense } from "../types";

const generateMonthOptions = () => {
  const options = [];
  const today = new Date();
  for (let i = -12; i <= 0; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const monthStr = date.toISOString().slice(0, 7); // "YYYY-MM"
    options.push(monthStr);
  }
  return options;
};

const monthOptions = generateMonthOptions();

export default function AddMonthlyExpenseScreen({ navigation }: any) {
  console.log("rendering add monthly expense");
  const [monthlyExpense, setMonthlyExpense] = useState({
    month: monthOptions[monthOptions.length - 1], // Default to current month
    budgetGoal: "",
  });

  const handleSave = async () => {
    console.log("trigger save api");
    const newMonthlyExpense: MonthlyExpense = {
      month: monthlyExpense.month,
      budgetGoal: parseFloat(monthlyExpense.budgetGoal),
      userId: "",
    };
    fetch("http://localhost:3000/api/monthly-expense", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMonthlyExpense),
    })
      .then((res) => {
        res.json();
      })
      .then((json) => {
        //@ts-ignore
        console.log(json.data);
      });
    // await createMonthlyExpense(newMonthlyExpense);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Monthly Expense</Text>
      <Picker
        selectedValue={monthlyExpense.month}
        onValueChange={(itemValue: string) =>
          setMonthlyExpense((prev) => ({ ...prev, month: itemValue }))
        }
        style={styles.picker}
      >
        {monthOptions.map((month) => (
          <Picker.Item key={month} label={month} value={month} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Budget Goal"
        value={monthlyExpense.budgetGoal}
        onChangeText={(text) =>
          setMonthlyExpense((prev) => ({ ...prev, budgetGoal: text }))
        }
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 },
  picker: { height: 200, width: "100%", marginBottom: 8 }, // Increased height for visibility
  buttonContainer: { marginTop: 16 },
});
