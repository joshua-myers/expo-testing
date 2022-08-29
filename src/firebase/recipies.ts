import {
  addDoc,
  DocumentData,
  FirestoreDataConverter,
  WithFieldValue,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { createCollection, FirestoreDocument } from './app';

export type Recipe = FirestoreDocument & {
  name: string;
};

const recipeConverter: FirestoreDataConverter<Recipe> = {
  toFirestore(recipe): DocumentData {
    return recipe;
  },
  fromFirestore(snapshot, options?) {
    const data = snapshot.data(options) as Recipe;

    return {
      ...data,
      id: snapshot.id,
      ref: snapshot.ref,
    };
  },
};

const recipesCol =
  createCollection<Recipe>('recipes').withConverter(recipeConverter);

export const saveRecipe = async (recipe: Recipe) => {
  try {
    const ref = await addDoc(recipesCol, recipe);
    return { ...recipe, id: ref.id };
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const useRecipes = () => {
  const [recipes, loading, error, snapshots] = useCollectionData(recipesCol);

  return { recipes, loading, error, snapshots };
};
