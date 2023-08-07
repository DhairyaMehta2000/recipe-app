import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addRecipeDetail } from "../utils/ingridientSlice";
import Shimmer from './Shimmer'

const RecipeDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchRecipeDetail = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const jsonData = await response.json();
      dispatch(addRecipeDetail(jsonData));
    } catch (error) {
      console.error("Error fetching recipe detail:", error);
    }
  };
  useEffect(() => {
    fetchRecipeDetail();
  }, []);


  const recipeData = useSelector((store) => store.ingridient.recipe[0]);
  const recipe = recipeData?.meals || [];
  
  

  return (
    <div className="p-4">
      {recipe.length !== 0 ? (
        <div className="grid gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold ">{recipe[0].strMeal}</h1>
              <button className="bg-red-600 text-white rounded-lg py-2 px-3">
                <a href={recipe[0].strYoutube}>Watch on Youtube</a>
              </button>
            </div>
            <img
              src={recipe[0].strMealThumb}
              alt="Meal"
              className="w-50 h-48 object-cover rounded-lg mb-4"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-bold mb-2">Category</h3>
                <p>{recipe[0].strCategory}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-bold mb-2">Area</h3>
                <p>{recipe[0].strArea}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
            <ul className="list-disc pl-6">
              {(() => {
                const ingredients = [];
                for (let index = 1; index <= 20; index++) {
                  const ingredientKey = `strIngredient${index}`;
                  const measureKey = `strMeasure${index}`;
                  const ingredient = recipe[0][ingredientKey];
                  const measure = recipe[0][measureKey];
                  if (ingredient && ingredient.trim() !== "") {
                    ingredients.push(
                      <li key={ingredientKey}>
                        {measure ? `${measure} - ` : null}
                        {ingredient}
                      </li>
                    );
                  }
                }
                return ingredients;
              })()}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">Instructions:</h2>
            <p>{recipe[0].strInstructions}</p>
          </div>
        </div>
      ) : (
        <h1> No Recipe Found</h1>
      )}
    </div>
  );
};

export default RecipeDetails;
