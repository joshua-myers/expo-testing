import { Formik } from 'formik';
import { Button, Column, ScrollView, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FormField } from '../../../components/form/FormField';
import { AddRecipeScreenProps } from '../../../components/navigation/types';
import { getRecipe, RecipeDoc, saveRecipe } from '../../../firebase/recipies';

export const Add = ({ navigation, route }: AddRecipeScreenProps) => {
  const { recipeId } = route.params ?? {};
  const [loading, setLoading] = useState(!!recipeId);
  const [recipe, setRecipe] = useState<RecipeDoc>();

  useEffect(() => {
    if (recipeId) {
      const fetchData = async () => {
        const r = await getRecipe(recipeId);
        if (r.exists()) {
          setRecipe(r.data());
        }
      };
      fetchData().finally(() => setLoading(false));
    }
  });

  const addRecipe = async (values: RecipeDoc) => {
    if (values.name) {
      const saved = await saveRecipe({ ...values, id: values.id ?? '' });
      if (saved) {
        if (values.id) {
          navigation.pop();
        }
        navigation.replace('Details', { recipeId: saved.id });
      }
    }
  };

  const initialValues = {
    id: recipe?.id,
    name: recipe?.name,
    author: recipe?.author,
  } as RecipeDoc;

  if (loading) {
    return <Spinner size='lg' />;
  }

  return (
    <ScrollView p={2}>
      <Formik initialValues={initialValues} onSubmit={addRecipe}>
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <Column space={2}>
            <FormField isRequired name='name' label='Recipe Name' />
            <FormField isRequired name='author' label='Author Name' />
            <Button onPress={() => handleSubmit()}>
              {`${recipeId ? 'Update' : 'Add'} Recipe`}
            </Button>
          </Column>
        )}
      </Formik>
    </ScrollView>
  );
};
