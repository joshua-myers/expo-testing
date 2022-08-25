import { Button, Center, Heading, NativeBaseProvider, Text } from "native-base";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaProvider>
        <SafeAreaView>
          <Center bg="coolGray.200" p="20" h="full">
            <View >
              <Heading>Digital Diner</Heading>
            </View>
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
            <Button
              colorScheme="primary"
              onPress={addRecipe}
            >
              {adding ? "Done" : "Add Recipe"}
            </Button>

            <FlatList
              data={recipies}
              renderItem={({ item }) => <Text>{item}</Text>}
            />
          </Center>

        </SafeAreaView>
      </SafeAreaProvider>
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
