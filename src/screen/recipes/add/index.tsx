import { Ionicons } from '@expo/vector-icons';
import { FieldArray, Formik } from 'formik';
import {
  Button,
  Column,
  Flex,
  Heading,
  IconButton,
  KeyboardAvoidingView,
  Row,
  ScrollView,
  Spinner,
  View,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { FormField } from '../../../components/form/FormField';
import { AddRecipeScreenProps } from '../../../components/navigation/types';
import {
  getRecipe,
  Ingredient,
  Instruction,
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
    name: recipe?.name || '',
    author: recipe?.author || '',
    ingredients: recipe?.ingredients || [],
    instructions: recipe?.instructions || [],
  } as RecipeDoc;

  if (loading) {
    return <Spinner size='lg' />;
  }

  return (
    <KeyboardAvoidingView behavior='padding' enabled flex={2}>
      <Formik
        initialValues={initialValues}
        onSubmit={addRecipe}
        style={{ flex: 1 }}>
        {({ handleSubmit, values }) => (
          <Flex p={2} justifyContent='space-between' h='full'>
            <ScrollView>
              <Column space={2}>
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
                  render={({ push, remove }) => {
                    return (
                      <View>
                        <Column space={2}>
                          {values.ingredients?.map((_, index) => {
                            return (
                              <View key={index}>
                                <Row
                                  space={2}
                                  justifyContent='space-between'
                                  borderWidth={1}
                                  borderColor='gray.400'
                                  rounded='md'
                                  p='1'>
                                  <FormField
                                    isRequired
                                    name={`ingredients.${index}.name`}
                                    label='Name'
                                    placeholder='Ingredient name'
                                    flex={1}
                                  />
                                  <FormField
                                    isRequired
                                    name={`ingredients.${index}.quantity`}
                                    label='Quantity'
                                    placeholder='Ingredient quantity'
                                    flex={1}
                                  />
                                  <FormField
                                    isRequired
                                    name={`ingredients.${index}.unit`}
                                    label='Units'
                                    placeholder='Ingredient units'
                                    flex={1}
                                  />
                                  <IconButton
                                    size='md'
                                    _icon={{
                                      as: Ionicons,
                                      name: 'trash',
                                      color: 'red.500',
                                    }}
                                    onPress={() => remove(index)}
                                  />
                                </Row>
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
                        </Column>
                      </View>
                    );
                  }}
                />
                <Heading>Instructions</Heading>
                <FieldArray
                  name='instructions'
                  render={({ push, remove }) => {
                    return (
                      <View>
                        <Column space={2}>
                          {values.instructions?.map((_, index) => {
                            return (
                              <View key={index}>
                                <Row
                                  space={2}
                                  justifyContent='space-between'
                                  borderWidth={1}
                                  borderColor='gray.400'
                                  rounded='md'
                                  p='1'>
                                  <FormField
                                    isRequired
                                    name={`instructions.${index}.instruction`}
                                    label='Instruction'
                                    placeholder='Instructions'
                                    flex={1}
                                    multiline
                                  />
                                  <IconButton
                                    size='md'
                                    _icon={{
                                      as: Ionicons,
                                      name: 'trash',
                                      color: 'red.500',
                                    }}
                                    onPress={() => remove(index)}
                                  />
                                </Row>
                              </View>
                            );
                          })}
                          <Button
                            onPress={() =>
                              push({
                                index: values.instructions?.length || 0,
                              } as Instruction)
                            }>
                            Add Instruction
                          </Button>
                        </Column>
                      </View>
                    );
                  }}
                />
              </Column>
            </ScrollView>
            <Button onPress={() => handleSubmit()} bgColor='green.500' mt={2}>
              {`${recipeId ? 'Update' : 'Add'} Recipe`}
            </Button>
          </Flex>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};
