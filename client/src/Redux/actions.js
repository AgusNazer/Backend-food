import axios from "axios"
import {GET_RECIPES,
    SET_RECIPES, 
    SET_ERROR, 
    GET_DIETS, 
    GET_DETAIL_RECIPES, 
    GET_RECIPES_BY_NAME, 
    GET_RECIPES_BY_ID, 
    FILTER_BY_ORIGIN, 
    FILTER_BY_DIET, 
    ORDER_BY_HEALTH_SCORE, 
    ORDER_BY_NAME, 
    POST_RECIPES, 
    FILTER_BY_NAME, 
    SET_CURRENT_PAGE, 
    DELETE_RECIPE} from './actionType'
// require('dotenv').config();
// const {API_KEY} = process.env;


export const getRecipes = () => {
    return async (dispatch, getState) => {
      const { recipes } = getState();
  
      if (recipes.length > 0) {
        dispatch({
          type: GET_RECIPES,
          payload: recipes
        });
      }
  
      try {
          dispatch({
            type: GET_RECIPES,
            payload: []
          });
        const response = await axios.get("http://localhost:3001/recipes");
        const recipes = response.data;
        dispatch({
            type: GET_RECIPES,
            payload: recipes
          });
      } catch (error) {
        // dispatch(setError('No se encontraron recetas con ese nombre'));
        console.error("No se encontraron recetas con ese nombre:", error);
      }
    }
  };

// tratando de mosdstra5 error en la buscqueda
  export const setRecipes = (recipes) => ({
    type: SET_RECIPES,
    payload: recipes
  });
  


export function getDiets(){
    return async function (dispatch) {
        try {
            const { data } = await axios.get("http://localhost:3001/diets");
            if(!data.length) throw new Error("No hay dietas");

            return dispatch({
                type: GET_DIETS,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        };
    };
};


export function getRecipesDetails(id){
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/${id}`);
            const details = response.data

            return dispatch({
                type: GET_DETAIL_RECIPES,
                payload: details,
            });
        } catch (error) {
            console.log('No se encontraron los detalles', error);
        };
    };
};


export function getRecipesByName(payload){
    console.log('Dispatching getRecipesByName action');
    return async function(dispatch){
        try {
            const { data } = await axios.get(`http://localhost:3001/recipes?name=${payload}`);
            
            // Si la búsqueda fue exitosa, establece el error en null
            dispatch({ type: SET_ERROR, payload: '' });

            return dispatch({
                type: GET_RECIPES_BY_NAME,
                payload: data,
            });
        } catch (error) {
         
        // Si ocurre un error en la búsqueda, establece el estado de error con el mensaje de error recibido
    //   dispatch(setError(error.message));
    dispatch({ type: SET_ERROR, payload: error.message });
      console.log('Dispatching getRecipesByName action');
        };
    };
};

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error
  });




// Id para la receta creada en la base de datos 
export function getRecipeById(id){
return async function(dispatch){
    try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`);
        const recipe = response.data;
  
        return dispatch({
          type: GET_RECIPES_BY_ID,
          payload: recipe
        });
      } catch (error) {
        // dispatch(setError('No se encontraron los detalles'));
        console.log('No se encontraron los detalles', error);
        alert(' upps! Receta no encontrada')
      }
}
}

// by id
// ARREGLAR 

// export const deleteRecipe = (id) => {
//   return async (dispatch) => {
//     try {
//       await axios.delete(`http://localhost:3001/recipes/${id}`);
//       return dispatch({
//         type: DELETE_RECIPE,
//         payload: id,
//       });
//     } catch (error) {
//       console.log('No se pudo eliminar la receta:', error);
//     }
//   };
// };



export function deleteRecipe(id) {
    return async function (dispatch) {
      try {
      const borrar =  await axios.delete(`http://localhost:3001/recipes/${id}`);
        dispatch(getRecipes()); 
        console.log(borrar);// Actualizar la lista de recetas después de eliminar una receta
      } catch (error) {
        // dispatch(setError('No se pudo eliminar la receta'));
        console.log('No se pudo eliminar la receta:', error);
      }
    }
  }

// ! CORREGIR BUG:: CUANDO ELIMINO UNA CARD, DESAPARECE EL BOTON DE ELIMINAR EN LAS DEMAS CARDS.

// export function deleteRecipe(id) {
//     return function (dispatch, getState) {
//       try {
//         // Eliminar la receta del estado local sin hacer una llamada a la API
//         dispatch({
//           type: DELETE_RECIPE,
//           payload: id,
//         });
  
//         // Actualizar la lista de recetas en el estado
//         const { filteredRecipes } = getState();
//         const updatedRecipes = filteredRecipes.filter((recipe) => recipe.id !== id);
//         dispatch({
//           type: GET_RECIPES,
//           payload: updatedRecipes,
//         });
//       } catch (error) {
//         console.log('No se pudo eliminar la receta:', error);
//       }
//     }
//   }


export function postRecipe(recipe){
    return async function(dispatch){
        try {
            const { data } = await axios.post('http://localhost:3001/recipes', recipe);
            if(!data.length) throw new Error("Hubo un problema en tu posteo");

            return dispatch({
                type: POST_RECIPES,
                payload: data,
            });
        } catch (error) {
            // dispatch(setError('Hubo un problema en tu posteo'));
            console.log(error.message);
        };
    };
};



export function filterByOrigin(origin){
    return ({
        type: FILTER_BY_ORIGIN,
        payload: origin,
    });
};


export function filterByDiet(diet){
    return ({
        type: FILTER_BY_DIET,
        payload: diet,
    });
};


export function orderByHealthScore(score){
    return ({
        type: ORDER_BY_HEALTH_SCORE,
        payload: score,
    });
};


export function orderByName(name){
    return ({
        type: ORDER_BY_NAME,
        payload: name,
    });
};

export const filterByName = (name) => {
    return {
      type: FILTER_BY_NAME,
      payload: name,
    };
  };


export const setCurrentPage = (page) => {
    return {
      type: SET_CURRENT_PAGE,
      payload: page,
    };
  };

