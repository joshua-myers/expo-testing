import { Formik } from 'formik';
import {
  Button,
  Column,
  FormControl,
  Input,
  ScrollView,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import React, { useEffect, useState } from 'react';
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
  } as RecipeDoc;

  if (loading) {
    return <Spinner size='lg' />;
  }

  return (
    <ScrollView p={2}>
      <Formik initialValues={initialValues} onSubmit={addRecipe}>
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <Column space={2}>
            <FormControl isRequired isInvalid={!!errors?.name}>
              <Stack mx={4}>
                <FormControl.Label>Name</FormControl.Label>
                <Input
                  p={2}
                  value={values.name}
                  placeholder='Recipe Name'
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              </Stack>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors?.name}>
              <Stack mx={4}>
                <FormControl.Label>Author</FormControl.Label>
                <Input
                  p={2}
                  value={values.author}
                  placeholder='Author Name'
                  onChangeText={handleChange('author')}
                  onBlur={handleBlur('authorMy')}
                />
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              </Stack>
            </FormControl>
            <Button onPress={() => handleSubmit()}>
              {`${recipeId ? 'Update' : 'Add'} Recipe`}
            </Button>
          </Column>
        )}
      </Formik>
    </ScrollView>
  );
};
