import {
  addDoc,
  DocumentData,
  FirestoreDataConverter,
  WithFieldValue,
  doc,
} from 'firebase/firestore';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { createCollection, FirestoreDocument } from './app';

export type Recipe = {
  name: string;
};

export type RecipeDoc = FirestoreDocument & Recipe;

const recipeConverter: FirestoreDataConverter<RecipeDoc> = {
  toFirestore: recipe => recipe,
  fromFirestore: (snapshot, options?) => {
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

export const saveRecipe = async (recipe: Recipe | RecipeDoc) => {
  try {
    const ref = await addDoc(recipesCol, recipe);
    return { ...recipe, id: ref.id, ref };
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const useRecipes = () => {
  const [recipes, loading, error, snapshots] = useCollectionData(recipesCol);

  return { recipes, loading, error, snapshots };
};

export const useRecipe = (id: RecipeDoc['id']) => {
  const [recipe, loading, error] = useDocumentData(doc(recipesCol, id));

  return { recipe, loading, error };
};
