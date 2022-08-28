import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, FlatList, Input, Text } from 'native-base';
import React, { useState } from 'react';

import { saveRecipe, useRecipes } from '../../firebase/recipies';

const RecipesStack = createNativeStackNavigator();

export const RecipesStackScreen = () => (
  <RecipesStack.Navigator>
    <RecipesStack.Screen name="Recipes" component={Recipes} />
  </RecipesStack.Navigator>
);

export const Recipes = () => {
  const [adding, setadding] = useState(false);
  const [recipe, setRecipe] = useState('');
  const { recipes, loading, error } = useRecipes();

  const addRecipe = async () => {
    if (recipe) {
      await saveRecipe({ name: recipe });
      setRecipe('');
    }
    setadding(a => !a);
  };

  return (
    <>
      {adding && (
        <Input placeholder="Recipe goes here..." onChangeText={setRecipe} />
      )}
      <Button colorScheme="primary" onPress={addRecipe}>
        {adding ? 'Done' : 'Add Recipe'}
      </Button>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </>
  );
};
