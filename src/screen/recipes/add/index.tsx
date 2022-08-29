import { Input } from 'native-base';
import React, { useState } from 'react';
import { saveRecipe } from '../../../firebase/recipies';

export const Add = () => {
  const [recipe, setRecipe] = useState('');

  const addRecipe = async () => {
    if (recipe) {
      await saveRecipe({ name: recipe });
      setRecipe('');
    }
  };

  return <Input placeholder='Recipe goes here...' onChangeText={setRecipe} />;
};
