import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootTabParamsList = {
  Home: undefined;
  Recipes: undefined;
};

export type RecipesStackParamsList = {
  Recipes: undefined;
  AddRecipe: undefined;
};

export type RecipesTabScreenProps = NativeStackScreenProps<
  RecipesStackParamsList,
  'Recipes'
>;
