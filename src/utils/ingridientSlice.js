// ingridientSlice.js
import { createSlice, current } from "@reduxjs/toolkit";

const ingridientSlice = createSlice({
  name: "ingridient",
  initialState: {
    ingridients: [],
    recipes: [],
    recipe: [],
    filteredRecipes: [],
  },
  reducers: {
    addIngridients: (state, action) => {
      state.ingridients.push(action.payload);
      //   console.log(current(state.ingridients))
    },
    addRecipes: (state, action) => {
      state.recipes.length = 0;
      state.recipes.push(action.payload);
    },
    addRecipeDetail: (state, action) => {
      state.recipe.length = 0;
      state.recipe.push(action.payload);
    },
    addFilteredRecipes: (state, action) => {
      state.filteredRecipes.length = 0;
      state.filteredRecipes.push(action.payload);
    },
  },
});

export const {
  addIngridients,
  addRecipes,
  addRecipeDetail,
  addFilteredRecipes,
} = ingridientSlice.actions;
export default ingridientSlice.reducer;
