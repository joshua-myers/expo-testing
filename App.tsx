import 'expo-dev-client';
import { Button, Center, FlatList, Heading, Input, NativeBaseProvider, Text, View } from "native-base";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import './src/firebase/app';
import { saveRecipe, useRecipes } from './src/firebase/recipies';

export default function App() {
  const [adding, setadding] = useState(false);
  const [recipe, setRecipe] = useState("");
  const { recipes, loading, error } = useRecipes();

  const addRecipe = async () => {
    if (recipe) {
      await saveRecipe({ name: recipe });
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
              data={recipes}
              renderItem={({ item }) => <Text>{item.name}</Text>}
            />
          </Center>
        </SafeAreaView>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
