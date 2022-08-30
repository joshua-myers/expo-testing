import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Recipe, RecipeDoc } from '../../firebase/recipies';

export type RootTabParamsList = {
  Home: undefined;
  Recipes: undefined;
};

export type RecipesStackParamsList = {
  Recipes: undefined;
  AddRecipe?: { recipe?: RecipeDoc };
  Details: { recipeId: RecipeDoc['id'] };
};

export type RecipesTabScreenProps = NativeStackScreenProps<
  RecipesStackParamsList,
  'Recipes'
>;

export type AddRecipeScreenProps = NativeStackScreenProps<
  RecipesStackParamsList,
  'AddRecipe'
>;

export type RecipeDetailsScreenProps = NativeStackScreenProps<
  RecipesStackParamsList,
  'Details'
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamsList, RecipesStackParamsList {}
  }
}
