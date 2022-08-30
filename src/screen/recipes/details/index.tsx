import { Ionicons } from '@expo/vector-icons';
import { Fab, Icon, Text, View } from 'native-base';
import React, { useEffect } from 'react';
import { RecipeDetailsScreenProps } from '../../../components/navigation/types';
import { useRecipe } from '../../../firebase/recipies';

export const Details = ({ navigation, route }: RecipeDetailsScreenProps) => {
  const { recipeId } = route.params;
  const { recipe } = useRecipe(recipeId);

  useEffect(() => {
    recipe && navigation.setOptions({ title: recipe.name });
  }, [recipe]);

  return (
    <>
      <Fab
        right={5}
        bottom={5}
        icon={<Icon name='pencil' color='white' as={Ionicons} />}
        renderInPortal={false}
      />
      <View>
        <Text>{recipe?.name}</Text>
      </View>
    </>
  );
};
