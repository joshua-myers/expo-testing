import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, FlatList, Text } from 'native-base';
import React from 'react';
import {
  RecipesStackParamsList,
  RecipesTabScreenProps,
} from '../../components/navigation/types';
import { useRecipes } from '../../firebase/recipies';

import { Add } from './add';

const RecipesStack = createNativeStackNavigator<RecipesStackParamsList>();

export const RecipesStackScreen = () => (
  <RecipesStack.Navigator>
    <RecipesStack.Screen name='Recipes' component={Recipes} />
    <RecipesStack.Screen name='AddRecipe' component={Add} />
  </RecipesStack.Navigator>
);

export const Recipes = ({ navigation }: RecipesTabScreenProps) => {
  const { recipes, loading, error } = useRecipes();

  return (
    <>
      <Button
        colorScheme='primary'
        onPress={() => navigation.navigate('AddRecipe')}>
        Add Recipe
      </Button>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </>
  );
};
