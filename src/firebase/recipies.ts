import {
  addDoc,
  deleteDoc,
  doc,
  FirestoreDataConverter,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { createCollection, FirestoreDocument } from './app';

export type Recipe = {
  name: string;
  author: string;
  ingredients: Ingredient[];
  createdOn: Date;
  updatedOn: Date;
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
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
  recipe.createdOn = recipe.createdOn ?? new Date();
  recipe.updatedOn = new Date();
  try {
    const ref =
      'id' in recipe && recipe.id
        ? await setDoc(doc(recipesCol, recipe.id), recipe).then(() => recipe)
        : await addDoc(recipesCol, recipe);
    return { ...recipe, id: ref.id, ref };
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteRecipe = async (id: RecipeDoc['id']) => {
  try {
    await deleteDoc(doc(recipesCol, id));
  } catch (e) {
    console.error('Error deleting document: ', e);
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

export const getRecipe = async (id: RecipeDoc['id']) => {
  return await getDoc(doc(recipesCol, id));
};
