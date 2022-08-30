import {
  Button,
  Center,
  Column,
  Divider,
  Flex,
  Input,
  ScrollView,
  Spacer,
} from 'native-base';
import React, { useState } from 'react';
import { AddRecipeScreenProps } from '../../../components/navigation/types';
import { saveRecipe } from '../../../firebase/recipies';

export const Add = ({ navigation }: AddRecipeScreenProps) => {
  const [recipe, setRecipe] = useState('');

  const addRecipe = async () => {
    if (recipe) {
      const saved = await saveRecipe({ name: recipe });
      if (saved) {
        setRecipe('');
        navigation.replace('Details', { recipeId: saved.id });
      }
    }
  };

  return (
    <Column space={2} m={2}>
      <Center>
        <ScrollView width='full'>
          <Input placeholder='Recipe goes here...' onChangeText={setRecipe} />
        </ScrollView>
      </Center>
      <Spacer />
      <Center>
        <Button width='full' onPress={addRecipe}>
          Add
        </Button>
      </Center>
    </Column>
  );
};
