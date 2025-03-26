import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  getMonthDetails,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/api";
import ExpenseItem from "../components/ExpenseItem";
import {
  MonthlyExpenseWithCashOnHand,
  Expense,
  expenseCategoryEnum,
} from "../types";

const categories = expenseCategoryEnum.options; // ["TRANSPORTATION", "GROCERY", etc.]

export default function MonthDetailsScreen({ route }: any) {
  const { id } = route.params;
  const [monthData, setMonthData] =
    useState<MonthlyExpenseWithCashOnHand | null>(null);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: categories[0], // Default to first category
  });
  const isCurrentMonth =
    monthData?.month === new Date().toISOString().slice(0, 7);

  useEffect(() => {
    (async () => {
      const data = await getMonthDetails(id);
      setMonthData(data);
    })();
  }, [id]);

  const handleAddExpense = async () => {
    if (!isCurrentMonth) return;
    const expense: Expense = {
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      date: new Date().toISOString(),
      category: newExpense.category,
      monthlyExpenseId: id,
    };
    const created = await createExpense(expense);
    setMonthData({
      ...monthData!,
      expenses: [...(monthData?.expenses || []), created],
      cashOnHand: monthData!.cashOnHand - created.amount,
    });
    setNewExpense({ description: "", amount: "", category: categories[0] });
  };

  const handleUpdateExpense = async (
    expenseId: string,
    updates: Partial<Expense>
  ) => {
    if (!isCurrentMonth) return;
    const updated = await updateExpense(expenseId, updates);
    setMonthData({
      ...monthData!,
      expenses: monthData!.expenses!.map((e) =>
        e.id === expenseId ? updated : e
      ),
    });
  };

  const handleDeleteExpense = async (expenseId: string) => {
    if (!isCurrentMonth) return;
    await deleteExpense(expenseId);
    setMonthData({
      ...monthData!,
      expenses: monthData!.expenses!.filter((e) => e.id !== expenseId),
    });
  };

  return (
    <View style={styles.container}>
      {monthData && (
        <>
          <Text style={styles.title}>{monthData.month}</Text>
          <Text>Budget: ${monthData.budgetGoal}</Text>
          <Text>Cash on Hand: ${monthData.cashOnHand.toFixed(2)}</Text>
          <FlatList
            data={monthData.expenses}
            keyExtractor={(item) => item.id!}
            renderItem={({ item }) => (
              <ExpenseItem
                item={item}
                isEditable={isCurrentMonth}
                onUpdate={handleUpdateExpense}
                onDelete={handleDeleteExpense}
              />
            )}
          />
          {isCurrentMonth && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={newExpense.description}
                onChangeText={(text) =>
                  setNewExpense({ ...newExpense, description: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Amount"
                value={newExpense.amount}
                onChangeText={(text) =>
                  setNewExpense({ ...newExpense, amount: text })
                }
                keyboardType="numeric"
              />
              <Picker
                selectedValue={newExpense.category}
                onValueChange={(itemValue) =>
                  setNewExpense({
                    ...newExpense,
                    category: itemValue,
                  })
                }
                style={styles.picker}
              >
                {categories.map((cat) => (
                  <Picker.Item key={cat} label={cat} value={cat} />
                ))}
              </Picker>
              <Button title="Add Expense" onPress={handleAddExpense} />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  inputContainer: { marginTop: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 },
  picker: { height: 50, marginBottom: 8 },
});
