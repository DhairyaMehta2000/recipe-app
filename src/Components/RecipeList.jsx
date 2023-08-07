  import React, { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { Link } from "react-router-dom";
  import { addFilteredRecipes } from "../utils/ingridientSlice";

  const RecipeList = () => {
    const [recipe, setRecipe] = useState("");
    const recipeData = useSelector((store) => store.ingridient.recipes[0]);
    const recipes = recipeData?.meals || [];
    const disptach = useDispatch();

    const filteredRecipeData = useSelector(
      (store) => store.ingridient.filteredRecipes[0]
    );
    const filteredRecipes = filteredRecipeData || [];

    const searchRecipe = () => {
      if (recipes.length !== 0) {
        try {
          let filteredRecipes = recipes.filter((item) =>
            item.strMeal.toLowerCase().includes(recipe.toLowerCase())
          );
          disptach(addFilteredRecipes(filteredRecipes));
        } catch (err) {
          console.error(err);
        }
      }
    };

    const handleKeyPress = (event)=>{
      if (event.key === "Enter") {
        searchRecipe();
      }
    }
    if (filteredRecipes.length !== 0) {
      return (
        <>
          <div className="flex justify-center mt-4 mb-4">
            <input
              type="text"
              value={recipe}
              onChange={(e) => setRecipe(e.target.value)}
              onKeyPress={handleKeyPress}
              className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
              placeholder="Enter Recipe name..."
            />
            <button
              onClick={searchRecipe}
              
              className="px-4 rounded-r-lg bg-black text-white font-semibold p-2 uppercase border indigo"
            >
              Search
            </button>
          </div>
          <div className="grid lg:grid-cols-3 gap-4 p-4 md:grid-cols-2 gap-4 p-4 sm:grid-cols-1 gap-4 p-4">
            {filteredRecipes.length !== 0 ? (
              filteredRecipes.map((recipe) => (
                <Link key={recipe.idMeal} to={`/recipe-details/${recipe.idMeal}`}>
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <img
                      src={recipe.strMealThumb}
                      alt="Meal"
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <p className="text-lg font-bold mb-2">{recipe.strMeal}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h1>Search Results Not Found, please try again</h1>
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex justify-center mt-4 mb-4">
            <input
              type="text"
              value={recipe}
              onChange={(e) => setRecipe(e.target.value)}
              onKeyPress={searchRecipe}
              className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
              placeholder="Enter Recipe name..."
            />
            <button
              onClick={searchRecipe}
              
              className="px-4 rounded-r-lg bg-black text-white font-semibold p-2 uppercase border indigo"
            >
              Search
            </button>
          </div>
          <div className="grid lg:grid-cols-3 gap-4 p-4 md:grid-cols-2 gap-4 p-4 sm:grid-cols-1 gap-4 p-4">
            {recipes.length !== 0 ? (
              recipes.map((recipe) => (
                <Link key={recipe.idMeal} to={`/recipe-details/${recipe.idMeal}`}>
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <img
                      src={recipe.strMealThumb}
                      alt="Meal"
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <p className="text-lg font-bold mb-2">{recipe.strMeal}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="place-items-center">
                <h1>
                  No Recipes found for this ingridient, please search for a
                  different ingridient.
                </h1>
              </div>
            )}
          </div>
        </>
      );
    }
  };

  export default RecipeList;
