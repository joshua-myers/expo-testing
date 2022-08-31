import { Ionicons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Card,
  Center,
  Column,
  Fab,
  FlatList,
  Flex,
  Icon,
  Row,
  ScrollView,
  Spacer,
  Text,
  View,
} from 'native-base';
import React from 'react';
import {
  RecipesStackParamsList,
  RecipesTabScreenProps,
} from '../../components/navigation/types';
import { RecipeCard } from '../../components/recipe/card';
import { useRecipes } from '../../firebase/recipies';

import { Add } from './add';
import { Details } from './details';

const RecipesStack = createNativeStackNavigator<RecipesStackParamsList>();

export const RecipesStackScreen = () => (
  <RecipesStack.Navigator>
    <RecipesStack.Screen name='Recipes' component={Recipes} />
    <RecipesStack.Screen name='AddRecipe' component={Add} />
    <RecipesStack.Screen name='Details' component={Details} />
  </RecipesStack.Navigator>
);

export const Recipes = ({ navigation }: RecipesTabScreenProps) => {
  const { recipes, loading, error } = useRecipes();

  return (
    <>
      <Fab
        right={5}
        bottom={5}
        icon={<Icon name='add' color='white' as={Ionicons} />}
        onPress={() => navigation.navigate('AddRecipe')}
        renderInPortal={false}
      />
      <ScrollView p={2} h='full'>
        <Column space={2}>
          {recipes?.map(r => (
            <RecipeCard
              key={r.id}
              recipe={r}
              onPress={() => navigation.navigate('Details', { recipeId: r.id })}
            />
          ))}
        </Column>
      </ScrollView>
    </>
  );
};
