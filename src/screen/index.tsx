import { Button, Center, FlatList, Heading, Input, Text, View } from "native-base";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { saveRecipe, useRecipes } from "../firebase/recipies";

export const Home = () => {
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

  return <SafeAreaView>
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
}