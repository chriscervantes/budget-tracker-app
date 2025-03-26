import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Expense, expenseCategoryEnum } from "../types";

const categories = expenseCategoryEnum.options;

export default function ExpenseItem({
  item,
  isEditable,
  onUpdate,
  onDelete,
}: {
  item: Expense;
  isEditable: boolean;
  onUpdate: (id: string, updates: Partial<Expense>) => void;
  onDelete: (id: string) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(item.description);
  const [amount, setAmount] = useState(item.amount.toString());
  const [category, setCategory] = useState(item.category);

  const handleSave = () => {
    onUpdate(item.id!, { description, amount: parseFloat(amount), category });
    setEditMode(false);
  };

  return (
    <View style={styles.item}>
      {editMode && isEditable ? (
        <>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) =>
              setCategory(itemValue as (typeof categories)[number])
            }
            style={styles.picker}
          >
            {categories.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={() => setEditMode(false)} />
        </>
      ) : (
        <>
          <Text>{item.description}</Text>
          <Text>${item.amount.toFixed(2)}</Text>
          <Text>Category: {item.category}</Text>
          {isEditable && (
            <>
              <Button title="Edit" onPress={() => setEditMode(true)} />
              <Button title="Delete" onPress={() => onDelete(item.id!)} />
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    marginBottom: 8,
    elevation: 1,
  },
  input: { borderWidth: 1, padding: 4, marginBottom: 4, borderRadius: 4 },
  picker: { height: 50, marginBottom: 4 },
});
