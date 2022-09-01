import { FieldArray, Formik } from 'formik';
import { Button, Flex, Heading, ScrollView, Spinner, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FormField } from '../../../components/form/FormField';
import { AddRecipeScreenProps } from '../../../components/navigation/types';
import {
  getRecipe,
  Ingredient,
  RecipeDoc,
  saveRecipe,
} from '../../../firebase/recipies';

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
    ingredients: recipe?.ingredients || [],
    instructions: recipe?.instructions || [],
  } as RecipeDoc;

  if (loading) {
    return <Spinner size='lg' />;
  }

  return (
    <View p={2}>
      <Formik initialValues={initialValues} onSubmit={addRecipe}>
        {({ handleSubmit, values }) => (
          <Flex justifyContent='space-between' h='full'>
            <ScrollView>
              <FormField
                isRequired
                name='name'
                label='Recipe Name'
                placeholder='name of your recipe'
              />
              <FormField
                isRequired
                name='author'
                label='Author Name'
                placeholder='your name'
              />
              <Heading>Ingredients</Heading>
              <FieldArray
                name='ingredients'
                render={({ push }) => {
                  return (
                    <View>
                      {values.ingredients?.map((_, index) => {
                        return (
                          <View key={index}>
                            <FormField
                              isRequired
                              name={`ingredients.${index}.name`}
                              label='Name'
                              placeholder='Ingredient name'
                            />
                          </View>
                        );
                      })}

                      <Button
                        onPress={() =>
                          push({
                            index: values.ingredients?.length || 0,
                          } as Ingredient)
                        }>
                        Add Ingredient
                      </Button>
                    </View>
                  );
                }}
              />
              <Heading>Steps</Heading>
            </ScrollView>
            <Button onPress={() => handleSubmit()} bgColor='green.500'>
              {`${recipeId ? 'Update' : 'Add'} Recipe`}
            </Button>
          </Flex>
        )}
      </Formik>
    </View>
  );
};
