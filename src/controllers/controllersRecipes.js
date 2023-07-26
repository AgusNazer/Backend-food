require('dotenv').config();
const {API_KEY} = process.env;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
const axios = require('axios');
const {Recipe, Diet} = require('../db')

const getApiInfo = async () => {
      const apiUrl = await axios.get(URL);
      
      const info = apiUrl.data.results.map(e => {

        // con fetch
        // const response = await fetch(URL);
        // const data = await response.json();
        // const info = data.results.map(e => {
        return {
          id: e.id,
          name: e.title,
          image: e.image,
          summary: e.summary,
          healthScore: e.healthScore,
          diets: e.diets?.map((diet) => diet),
          analyzedInstructions: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps
            ? e.analyzedInstructions[0].steps.map(el => el.step).join(" ")
            : 'No steps at this recipe, sorry')
        }; 
      });
  
      return info;
    };

// Obtengo los datops de las recetas de la DB
const getData = async () => {
try {
  const getDB = await Recipe.findAll({ // uso findAll para obtener todas las recetes de la db
  include: {
    model: Diet,
    atributes: ['name'],
    through: {
        atributes: ['id', 'name'],
      },
    },
  });
// map para extraer los datos que necesito
  const allRecipes = await getDB?.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      image: recipe.image,
      analyzedInstructions: recipe.analyzedInstructions,
      diets: recipe.diets?.map((diet) => diet.name)
    };
  });

  return allRecipes;

}
catch (error) {
  const errorMessage = 'There was an error during de petition to the Data Base "Food": ' + error.message;
  console.log(errorMessage);
  return;
}
}

// traigo la info de la api y de la DB
const getAllRecipes = async () =>{
    let apiInfo = await getApiInfo();
    let dbInfo = await getData();
    allInfo = apiInfo.concat(dbInfo);
    return allInfo;
};


const getRecipesByName = async (req, res) => {
    try {
      const { name } = req.query;
      const allRecipes = await getAllRecipes();
      
      if (name) {
        const recipeByName = allRecipes.filter(reci =>
          reci.name.toLowerCase().includes(name.toLowerCase())
        );
    //   if(!recipeByName.length) throw new Error("Recipe Not available");
    if (!recipeByName.length) {
        //! este error esta mosdtrandose en consola
        throw new Error("No se ha encontrado ninguna receta");
        // return res.status(404).json({ error: "No se encontró ninguna receta" });
       
      }
        
      res.status(200).json(recipeByName);

      } else {
        res.status(200).json(allRecipes);
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
      console.log(error);
    }
  };
  
// data por id codigo fixed


const getRecipeById = async (req, res) => {
    try {
      const { id } = req.params;
      let recipeData;
  
      if (!isNaN(id)) {
        // buscxo ID numérico en la API
        const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
        const apiResponse = await axios.get(apiUrl);
        const recipeFromAPI = apiResponse.data;
  
        if (!recipeFromAPI) {
          return res.status(404).send('No se encontró receta con ese id');
        }
  
        recipeData = {
          id: recipeFromAPI.id,
          name: recipeFromAPI.title,
          summary: recipeFromAPI.summary,
          healthScore: recipeFromAPI.healthScore,
          image: recipeFromAPI.image,
          diets: recipeFromAPI.diets,
          analyzedInstructions: recipeFromAPI.analyzedInstructions?.[0]?.steps.map(step => step.step).join(" ") || 'No steps at this recipe, sorry'
        };
      } else {
        //busco  UUID en la base de datos
        const recipeFromDB = await Recipe.findOne({
          where: { id: id },
          include: [Diet]
        });
  
        if (recipeFromDB) {
          recipeData = {
            id: recipeFromDB.id,
            name: recipeFromDB.name,
            summary: recipeFromDB.summary,
            healthScore: recipeFromDB.healthScore,
            image: recipeFromDB.image,
            diets: recipeFromDB.diets?.map((diet) => diet.name),
            analyzedInstructions: recipeFromDB.analyzedInstructions
          };
        }
      }
  
      if (!recipeData) {
        return res.status(404).send('No se encontró receta con ese id');
      }
  
      res.status(200).json(recipeData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
  

  
  
  
  
  
  
  




const createRecipe = async(name, summary, healthScore, analyzedInstructions, diets, image) =>{
    
 
  
  const newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      analyzedInstructions,
      image
  })

  await newRecipe.setDiets(diets);

  const createdRecipe = await Recipe.findByPk(newRecipe.id, {
      include: {
          model: Diet,
          attributes: ['name'],
          through: {
              attributes: []
          }
      }
  });

  return createdRecipe;
}

// crear receta
const postRecipes = async (req, res) => {
  const {name, summary, healthScore, analyzedInstructions, diets, image} = req.body;
  if (!name || !summary  || !image || !diets){
      throw new Error('Por favor, ingrese todos los parametros!');
  }
  
  try {
      const newRecipe = await createRecipe(name, summary, healthScore, analyzedInstructions, diets, image)
      console.log('se posteo la receta');
      return res.status(200).json(newRecipe);
  }
  catch (error) {
      return res.status(400).send({error: error.message});
  }
};


//borrar receta
const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const deletedRecipe = await Recipe.destroy({
      // La función destroy acepta un objeto where con las condiciones de eliminación. En este caso, se elimina la receta con el identificador proporcionado en req.params.id.
      where: { id: recipeId }
    });
// Si destroy devuelve un valor de 0, significa que no se encontró ninguna receta con ese identificador y se devuelve una respuesta con el código de estado 404. Si la receta se elimina correctamente, se devuelve una respuesta con el código de estado 200 y un objeto JSON indicando el éxito de la operación.
    if (deletedRecipe === 0) {
      return res.status(404).send('No se encontró la receta con ese id');
    }

    console.log('Se eliminó la receta');
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};




module.exports = {
    getRecipeById,
    getRecipesByName,
    postRecipes,
    deleteRecipe
};


