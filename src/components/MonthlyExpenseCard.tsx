import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MonthlyExpense } from "../types";

export default function MonthlyExpenseCard({
  item,
  onPress,
}: {
  item: MonthlyExpense;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.month}>{item.month}</Text>
      <Text>Budget: ${item.budgetGoal}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  month: { fontSize: 18, fontWeight: "bold" },
});
