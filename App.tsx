import { Button, Center, FlatList, Heading, Input, NativeBaseProvider, Text, View } from "native-base";
import React, { useState } from "react";
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
              <Input placeholder="Recipe goes here..." onChangeText={setRecipe} />

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
