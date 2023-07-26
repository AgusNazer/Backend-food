const recipesRouter = require('express').Router();
const {getRecipeById, getRecipesByName, postRecipes, deleteRecipe} = require('../controllers/controllersRecipes')



recipesRouter.get('/', getRecipesByName)
recipesRouter.get('/:id', getRecipeById)
recipesRouter.post('/', postRecipes)
recipesRouter.delete('/:id', deleteRecipe)










  



module.exports = recipesRouter;

