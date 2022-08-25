import { Box, NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [adding, setadding] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [recipies, setRecipies] = useState([]);

  const addRecipe = () => {
    if (recipe) {
      setRecipies((r) => [...r, recipe]);
      setRecipe("");
    }
    setadding((a) => !a);
  };

  return (
    <NativeBaseProvider>
      <Box bg="primary.400" p="12" rounded="lg">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>Digital Diner</Text>
            {adding && (
              <TextInput
                style={styles.input}
                placeholder="Recipe goes here..."
                value={recipe}
                multiline
                numberOfLines={5}
                onChangeText={setRecipe}
              ></TextInput>
            )}
            <Button title={adding ? "Done" : "Add Recipe"} onPress={addRecipe} />
          </View>
          <View style={styles.list}>
            <FlatList
              data={recipies}
              renderItem={({ item }) => <Text>{item}</Text>}
            />
          </View>
        </View>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  list: {
    flex: 2,
  },
  input: {
    borderWidth: 1,
    borderStyle: "solid",
    width: "100%",
  },
});
