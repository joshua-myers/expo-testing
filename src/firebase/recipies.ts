import { addDoc, collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { createCollection, db } from "./app";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";

export type Recipe = {
  id?: string;
  name: string;
}

const recipesCol = createCollection<Recipe>('recipes');

export const saveRecipe = async (recipe: Recipe) => {
  try {
    const ref = await addDoc(recipesCol, recipe);
    return { ...recipe, id: ref.id }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const useRecipes = () => {
  const [recipes, loading, error] = useCollectionData(recipesCol);

  return { recipes, loading, error };
}