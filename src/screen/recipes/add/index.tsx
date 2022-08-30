import { Formik } from 'formik';
import { Button, Column, Input, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import { AddRecipeScreenProps } from '../../../components/navigation/types';
import {
  getRecipe,
  Recipe,
  RecipeDoc,
  saveRecipe,
} from '../../../firebase/recipies';

export const Add = ({ navigation, route }: AddRecipeScreenProps) => {
  const { recipeId } = route.params ?? {};
  const [recipe, setRecipe] = useState<RecipeDoc>();

  useEffect(() => {
    if (recipeId) {
      const fetchData = async () => {
        const r = await getRecipe(recipeId);
        if (r.exists()) {
          setRecipe(r.data());
        }
      };
      fetchData();
    }
  });

  const addRecipe = async (values: RecipeDoc) => {
    if (values.name) {
      const saved = await saveRecipe({ ...values, id: values.id ?? '' });
      if (saved) {
        navigation.replace('Details', { recipeId: saved.id });
      }
    }
  };

  const initialValues = {
    id: recipe?.id,
    name: recipe?.name,
  } as RecipeDoc;

  return (
    <ScrollView p={2}>
      <Formik initialValues={initialValues} onSubmit={addRecipe}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Column space={2}>
            <Input
              placeholder='Recipe goes here...'
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <Button onPress={() => handleSubmit()}>Add Recipe</Button>
          </Column>
        )}
      </Formik>
    </ScrollView>
  );
};
