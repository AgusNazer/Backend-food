import style from './SearchBar.module.css'
import * as actions from '../../Redux/actions';
import { useDispatch, useSelector} from "react-redux";
import { useState } from 'react';
// import Pagination from '../Pagination/Pagination';
import { NavLink } from 'react-router-dom';
// import { setError } from '../../Redux/actions';
// import { getRecipesByName } from '../../Redux/actions';


const SearchBar = () => {
    const dispatch = useDispatch();
    //error de busqueda
    const error = useSelector((state) => state.error);
    console.log(error);

    const [name, setName] = useState("");




    const handlerChange = (e) => {
        setName(e.target.value);
    }
    // cuando se envía el formulario de búsqueda, la función
    //  handleSubmit se ejecuta. Verifica si se ha ingresado un 
    //  texto en el campo de búsqueda y, si es así, envía una acción
    //   a la tienda de Redux para filtrar las recetas según el nombre
    //    ingresado. Esto permite realizar búsquedas y obtener resultados 
    //    filtrados basados en el nombre de la receta.
    const handleSubmit = (e) => {
        // e.preventDefault();
        console.log('Submitting search form');
      const trimmedName = name.trim();
      if (trimmedName === "") {
        // return; 
        alert('Por favor ingrese una receta valida')
      }else{
        dispatch(actions.getRecipesByName(trimmedName));
      }
      
      
    }
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (!name) {
    //       alert('Please provide a recipe name.');
    //     } else {
    //       dispatch(getRecipesByName(name.trim()));
    //       setName('');
    //       event.target.reset();
    //     }
    //   };


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          handleSubmit();
        }  
    }    

    const handleHomeButtonClick = () => {
      dispatch(actions.getRecipes());
    };


  //!ARREGLAR LOS ERRORES DE RECETA NO ENCONTRADA  
 // Función para mostrar el error como una alerta en la pantalla
//  const showErrorAlert = () => {
//     // e.preventDefault();
//     if (error) {
//       alert('No se ha encontrado receta con ese nombre');
//     }
//   };



    return (
      <div className={style.generalContainer}>
        
        <div className={style.encabezado}>
            <div className={style.homeButton}>
                <button className={style.recipes} onClick={handleHomeButtonClick}>🥗 Foodstation</button>
            </div>
        <div className={style.searchContainer}>
          <nav>
            <div className='searchContainer'>
            <input
              type="text"
              placeholder="Search a recipe..."
              onChange={handlerChange}
              onKeyPress={handleKeyPress}
              className={style.InputSearch} 
            />
            <button className={`${style.boton} ${style.searchButton}`} onClick={handleSubmit}>
              Search 🔎
            </button>
            <hr className={style.lineaHr} />
            </div>
          </nav>
        </div>
        <div className={style.createButton}>
            <NavLink to="/CreateRecipe">
              <button className={`${style.createRecipe} ${style.createButton}`}>Create Recipe</button>
            </NavLink>
        </div>
        </div>   
        <div>
        {/* {error && <p className={style.error}>{error}</p>} */}
        </div>
          <div className={style.pag}>
    
            {/* <Pagination /> */}
            <div>
        {error && <span className={style.error}>{error}</span>}
        <div>
        {/* {error} */}
      </div>
      </div>
          </div>
      </div>   
      );
    };



export default SearchBar














// Para mostrar el error al presionar el botón de búsqueda (Search), ya estás en el camino correcto. El error se mostrará automáticamente en el componente SearchBar siempre que el estado error esté actualizado en el store de Redux.

// En tu código, la función handleSubmit se activa al hacer clic en el botón "Search". En esa función, ya estás llamando a la acción getRecipesByName que está definida en tu archivo actions.js. Esta acción es la encargada de realizar la búsqueda y actualizar el estado error en Redux en caso de que ocurra un error.

// Cuando ocurra un error durante la búsqueda, la acción getRecipesByName utilizará dispatch(setError(error.message)); para enviar el mensaje de error al estado de Redux. El useSelector en tu componente SearchBar ya está configurado correctamente para obtener el estado error desde Redux: