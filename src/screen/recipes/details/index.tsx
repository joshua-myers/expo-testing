import { Ionicons } from '@expo/vector-icons';
import {
  AlertDialog,
  Button,
  Column,
  Fab,
  Icon,
  Text,
  View,
} from 'native-base';
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

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef();

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
        onPress={() => setIsOpen(true)}
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.Header fontSize='lg' fontWeight='bold'>
            Delete Recipe
          </AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure? You can't undo this action afterwards.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button ref={cancelRef} onPress={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onPress={trash} ml={3}>
              Delete
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <View p={2}>
        <Text fontSize='lg'>Ingredients</Text>
        <Column space={1}>
          {recipe?.ingredients?.map(({ name, quantity, unit, index }) => {
            return (
              <Text key={index}>{`- ${quantity} ${unit || ''} ${name}`}</Text>
            );
          })}
          <Text fontSize='lg'>Instructions</Text>
        </Column>
        <Column space={1}>
          {recipe?.instructions?.map(({ instruction, index }) => {
            return <Text key={index}>{`${index + 1}: ${instruction}`}</Text>;
          })}
        </Column>
      </View>
    </>
  );
};
