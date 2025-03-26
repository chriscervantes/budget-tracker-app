import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MonthDetailsScreen from "../screens/MonthlyDetailsScreen";
import AddExpenseScreen from "../screens/AddExpense";
import AddMonthlyExpenseScreen from "../screens/AddMonthlyExpense";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MonthDetails" component={MonthDetailsScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen
        name="AddMonthlyExpense"
        component={AddMonthlyExpenseScreen}
      />
    </Stack.Navigator>
  );
}
