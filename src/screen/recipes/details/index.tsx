import { Ionicons } from '@expo/vector-icons';
import { Fab, Icon, Text, View } from 'native-base';
import React, { useEffect } from 'react';
import { RecipeDetailsScreenProps } from '../../../components/navigation/types';
import { deleteRecipe, useRecipe } from '../../../firebase/recipies';

export const Details = ({ navigation, route }: RecipeDetailsScreenProps) => {
  const { recipeId } = route.params;
  const { recipe } = useRecipe(recipeId);

  useEffect(() => {
    recipe && navigation.setOptions({ title: recipe.name });
  }, [recipe]);

  const trash = async () => {
    await deleteRecipe(recipeId);
    navigation.goBack();
  };

  return (
    <>
      <Fab
        right={5}
        bottom={5}
        icon={<Icon name='pencil' color='white' as={Ionicons} />}
        renderInPortal={false}
        onPress={() => navigation.navigate('AddRecipe', { recipeId })}
      />
      <Fab
        right={75}
        bottom={5}
        bg='red.500'
        icon={<Icon name='trash' color='white' as={Ionicons} />}
        renderInPortal={false}
        onPress={trash}
      />
      <View>
        <Text>{recipe?.name}</Text>
      </View>
    </>
  );
};
