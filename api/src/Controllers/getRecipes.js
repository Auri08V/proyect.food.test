require("dotenv").config();
const axios = require("axios");
const { Diets, Recipe } = require("../db");

const { API_KEY } = process.env;

const URL =`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`

const getRecipeInf = async () => {
  const apiUrl = await axios.get(URL);
  const infoRecipes = apiUrl.data.results.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      vegetarian: recipe.vegetarian,
      vegan: recipe.vegan,
      glutenfree: recipe.glutenFree,
      healthScore: recipe.healthScore,
      stepByStep: recipe.analyzedInstructions[0],
    };
  });
  return infoRecipes;
};

const getDbinfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const infoRecipes = await getRecipeInf();
  const dbRecipes = await getDbinfo();
  const infoTotal = [...infoRecipes, ...dbRecipes];
  return infoTotal;
};
module.exports = {
  getAllRecipes,
};
