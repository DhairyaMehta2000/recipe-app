import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIngridients, addRecipes } from "../utils/ingridientSlice";
import { useNavigate } from "react-router-dom";
import Shimmer from "./Shimmer";

const IngridientSearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingridientsData = useSelector(
    (store) => store.ingridient.ingridients[0]
  );
  const ingridients = ingridientsData?.meals || [];
  const itemsPerPage = 100;

  const [ingredient, setIngredient] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRecipe = async () => {
    try {
      const data = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient
      );
      const jsonData = await data.json();
      dispatch(addRecipes(jsonData));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
      );
      const jsonData = await data.json();
      dispatch(addIngridients(jsonData));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchByName = () => {
    let updated_ingredient = ingredient.replace(/ /g, "_");
    setIngredient(updated_ingredient);
    fetchRecipe();
    navigate("recipe-list");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIngridients = ingridients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(ingridients.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchByName();
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          onKeyPress={handleKeyPress}
          className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
          placeholder="Enter Ingridient name..."
        />
        <button
          onClick={searchByName}
          
          className="px-4 rounded-r-lg bg-black text-white font-semibold p-2 uppercase border indigo"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentIngridients.length !== 0 ? (
          currentIngridients.map((item) => (
            <div
              key={item.idIngredient}
              className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition"
            >
              <p className="text-lg font-semibold text-center">
                {item.strIngredient}
              </p>
            </div>
          ))
        ) : (
          <Shimmer />
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-black"
          } text-white font-semibold`}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black"
          } text-white font-semibold`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IngridientSearchForm;
