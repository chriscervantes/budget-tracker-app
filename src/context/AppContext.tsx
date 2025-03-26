import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { getMonthlyExpenses } from "../services/api";
import MonthlyExpenseCard from "../components/MonthlyExpenseCard";
import { MonthlyExpense } from "../types";

export default function HomeScreen({ navigation }: any) {
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpense[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getMonthlyExpenses();
      setMonthlyExpenses(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Expenses</Text>
      <FlatList
        data={monthlyExpenses}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <MonthlyExpenseCard
            item={item}
            onPress={() => navigation.navigate("MonthDetails", { id: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});

// import { createContext, useContext, ReactNode, useState, useMemo } from "react";

// // Generic context type
// type ContextType<T> = {
//   value: T;
//   setValue: (value: T) => void;
// };

// // Generic context creator
// function createGenericContext<T>() {
//   const GenericContext = createContext<ContextType<T> | undefined>(undefined);

//   // Provider component
//   const Provider = ({
//     initialValue,
//     children,
//   }: {
//     initialValue: T;
//     children: ReactNode;
//   }) => {
//     const [value, setValue] = useState<T>(initialValue);

//     const contextValue = useMemo(() => ({ value, setValue }), [value]);

//     return (
//       <GenericContext.Provider value={contextValue}>
//         {children}
//       </GenericContext.Provider>
//     );
//   };

//   // Hook to use the context
//   const useGenericContext = () => {
//     const context = useContext(GenericContext);
//     if (!context) {
//       throw new Error("useGenericContext must be used within its Provider");
//     }
//     return context;
//   };

//   return { Provider, useGenericContext };
// }

// // Auth-specific context
// type AuthContextValue = {
//   accessToken: string | null;
//   login: () => void;
//   logout: () => void;
// };

// export const { Provider: AuthProvider, useGenericContext: useAuth } =
//   createGenericContext<AuthContextValue>();
