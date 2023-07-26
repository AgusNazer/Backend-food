const { Diet } = require('../db')
require('dotenv').config();
const {API_KEY} = process.env;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=90`;
const axios = require('axios');


const getAllDiets = async(req,res)=>{
  const dietsApi = await axios(URL);
  const dietsDB = dietsApi.data.results
      .map((t) => t.diets) // ,apeo para obtener las dietas de cada receta
      .toString() // las conviertyo a string
      .split(",") // divido la cadena para obtener de forma individual
      .map((t) => t.trim()) 
      .filter((t) => t.length > 1) // filtro las dietas vacias o nulas
  const filtro = dietsDB.filter((t) => t); 
  let dietsFilt = [...new Set(filtro)]; // las almaceno aca

  dietsFilt.forEach((t) => {
      Diet.findOrCreate({ 
          where: { name: t },
      });
  });

  const totaldiets = await Diet.findAll(); 
  res.status(200).json(totaldiets);
}







module.exports = {
    getAllDiets
};


