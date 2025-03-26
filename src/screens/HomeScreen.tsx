import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { getMonthlyExpenses } from "../services/api";
import MonthlyExpenseCard from "../components/MonthlyExpenseCard";
import { MonthlyExpense } from "../types";

export default function HomeScreen({ navigation }: any) {
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpense[]>([]);

  console.log("rendering homescreen");
  useEffect(() => {
    (async () => {
      const data = await getMonthlyExpenses();
      setMonthlyExpenses(data);
      console.log("test", data);
      if (data.length === 0) {
        navigation.navigate("AddMonthlyExpense");
      }
    })();
  }, [navigation, monthlyExpenses]);

  const handleAddMonthlyExpense = () => {
    navigation.navigate("AddMonthlyExpense");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Expenses</Text>
      {monthlyExpenses.length > 0 ? (
        <FlatList
          data={monthlyExpenses}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <MonthlyExpenseCard
              item={item}
              onPress={() =>
                navigation.navigate("MonthDetails", { id: item.id })
              }
            />
          )}
        />
      ) : (
        <Text>
          No monthly expenses yet.
          <Button title="+" onPress={handleAddMonthlyExpense} />
          Add one to get started!{" "}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});
