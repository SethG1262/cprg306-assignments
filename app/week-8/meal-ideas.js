"use client";

import React, { useState, useEffect, useCallback } from 'react';

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [mealDetails, setMealDetails] = useState({});
  const [error, setError] = useState('');

  const cleanIngredient = (name) => {
    let cleanedName = name.split(',')[0];
    cleanedName = cleanedName.replace(/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/gu, '');
    return cleanedName.trim().toLowerCase();
  };

  // Use `useCallback` to memoize the fetch function
  const fetchMealIdeas = useCallback(async (ingredient) => {
    const cleanedIngredient = cleanIngredient(ingredient);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${cleanedIngredient}`);
      const data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
        setError('');
      } else {
        setMeals([]);
        setError(`No meal ideas found for "${cleanedIngredient}".`);
      }
    } catch (error) {
      console.error("Error fetching meal ideas:", error);
      setError("An error occurred while fetching meal ideas.");
    }
  }, []);

  const fetchMealDetails = async (idMeal) => {
    if (mealDetails[idMeal]) {
      setSelectedMealId(selectedMealId === idMeal ? null : idMeal);
      return;
    }

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const data = await response.json();
      if (data.meals) {
        setMealDetails((prevDetails) => ({ ...prevDetails, [idMeal]: data.meals[0] }));
        setSelectedMealId(idMeal);
      }
    } catch (error) {
      console.error("Error fetching meal details:", error);
      setError("An error occurred while fetching meal details.");
    }
  };


  useEffect(() => {
    if (ingredient) {
        fetchMealIdeas(ingredient);
    }
  }, [ingredient, fetchMealIdeas]);

  return (
    <div className="p-5 bg-gray-800 rounded-lg text-white">
      <h2 className="mb-2 text-lg font-semibold">Meal ideas using {ingredient}:</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="list-none p-0">
          {meals.map((meal) => (
            <li key={meal.idMeal} className="mb-3">
              <p
                className={`cursor-pointer font-bold transition-colors ${
                  selectedMealId === meal.idMeal ? 'text-orange-500' : 'hover:text-orange-500'
                }`}
                onClick={() => fetchMealDetails(meal.idMeal)}
              >
                {meal.strMeal}
              </p>
              {selectedMealId === meal.idMeal && mealDetails[meal.idMeal] && (
                <div className="mt-2 p-3 bg-gray-700 rounded-lg">
                  <h4 className="text-sm font-semibold mb-1">Ingredients needed:</h4>
                  <ul className="list-none p-0 text-gray-300">
                    {[...Array(20)].map((_, i) => {
                      const ingredient = mealDetails[meal.idMeal][`strIngredient${i + 1}`];
                      const measure = mealDetails[meal.idMeal][`strMeasure${i + 1}`];
                      return ingredient ? (
                        <li key={i} className="text-sm">
                          {ingredient} {measure && `(${measure})`}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MealIdeas;
