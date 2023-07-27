import { createStore, applyMiddleware, compose } from 'redux';
import  ThunkMiddleware  from 'redux-thunk';
import reducer from './reducer'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 


const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(ThunkMiddleware))
);

export default store; 


//Redux es una biblioteca de gestión del estado 
//aplicación y proporciona una forma de acceder, actualizar y suscribirse a los cambios en ese estado.