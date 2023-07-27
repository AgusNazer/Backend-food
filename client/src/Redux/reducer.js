import {
    GET_RECIPES,
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
    DELETE_RECIPE,
    SET_ERROR // corregir esto
  } from './actionType';
  
  const initialState = {
    filteredRecipes: [],
    recipes: [],
    diets: [],
    details: [],
    currentPage: 1,
    recipeById: [],// Agrega esta línea para definir la propiedad recipeById en el estado inicial
    origin: null, // con esto luego seteo para saber de donde viene la data 
    // deletedRecipeIds: []
    error: ''
  };
  
  const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_RECIPES:
        return {
          ...state,
          recipes: payload,
          filteredRecipes: payload,
          origin
        };

        
  
      case GET_DIETS:
        return {
          ...state,
          diets: payload
        };
  
      case GET_DETAIL_RECIPES:
        return {
          ...state,
          details: payload
        };
  

 
      case FILTER_BY_NAME:
        const filteredRecipes = state.recipes.filter((recip) =>
          recip.name.toLowerCase().includes(payload.toLowerCase())
        );
        return {
          ...state,
          filteredRecipes,
          currentPage: 1
        };
        //         copia del estado actual (...state) con dos cambios:

// Se actualizo la propiedad filteredRecipes con el nuevo array filtrado.
// Se establece currentPage en 1, lo que parece indicar que se debe volver a la primera

    /// !probando
    // case FILTER_BY_NAME:
    //   const filteredByName = state.recipes.filter((recip) =>
    //     recip.name.toLowerCase().includes(payload.toLowerCase())
    //   );
    //   return {
    //     ...state,
    //     filteredRecipes: filteredByName,
    //     currentPage: 1,
    //   };
  
      case GET_RECIPES_BY_NAME:
        return {
          ...state,
          filteredRecipes: payload,
          origin,
          error: ''
        };
        // capturo el mensaje de error y actualizo el estado error en Redux con el mensaje de error proporcionado por el servidor.
        case SET_ERROR:
            console.log('Reducer:72 Receta no encontrada', payload);
          return {
            ...state,
            // error: payload
            error: 'Receta no encontrada'
          };

        case GET_RECIPES_BY_ID:
        return {
          ...state,
          
          details: payload
        };
  
      case FILTER_BY_ORIGIN:
        const originValue = payload.toLowerCase();
        let filterRecipes = [];
  
        if (originValue === "database") {
          filterRecipes = state.recipes.filter(recipe => {
            return typeof recipe.id === "string" && recipe.id.includes("-");
          });
        } else if (originValue === "api") {
          filterRecipes = state.recipes.filter(recipe => {
            return typeof recipe.id === "number" || (typeof recipe.id === "string" && !recipe.id.includes("-"));
          });
        } else {
          filterRecipes = state.recipes;
        }
  
        return {
          ...state,
          filteredRecipes: filterRecipes,
          origin: originValue // para sabe de donde viene la data, y en card renderizo o no segun esto el boton de cerrar
        };
  
      case FILTER_BY_DIET:
        const filterValue = payload === "all" ? undefined : payload;
        const recipFilter = state.recipes.filter(recipe => {
          return !filterValue || (recipe.diets && recipe.diets.includes(filterValue));
        });
  
        return {
          ...state,
          filteredRecipes: recipFilter
        };
  
      case ORDER_BY_HEALTH_SCORE:
        const sorted = [...state.filteredRecipes].sort((a, b) => {
          return a.healthScore - b.healthScore;
        });
  
        if (payload === "Descending") {
          sorted.reverse();
        }
  
        return {
          ...state,
          filteredRecipes: sorted
        };
  
      case ORDER_BY_NAME:
        const sortedRecipes = [...state.filteredRecipes].sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        if (payload === "Z-A") {
          sortedRecipes.reverse();
        }
        return {
          ...state,
          filteredRecipes: sortedRecipes
        };
  
      case POST_RECIPES:
        return {
          ...state
        };
  
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: payload
        };
        
        case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(r => r.id !== payload)
      }
     

      // ! NUEVO CODIGOP PARA QUE AL ELIMINAR UNA CARD NO DESAPAREZCA EL BOTON DE CERRAR
  //     case DELETE_RECIPE:
  // return {
  //   ...state,
  //   recipes: state.recipes.filter((r) => r.id !== payload),
  //   filteredRecipes: state.filteredRecipes.filter((r) => r.id !== payload),
  //   deletedRecipeIds: [...state.deletedRecipeIds, payload], // Agrega el ID de la receta eliminada al arreglo
  // };

  
      default:
        return state;
    }
  };
  
  export default reducer;
  