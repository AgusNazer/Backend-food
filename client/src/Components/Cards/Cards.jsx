
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from '../Card/Card';
import style from './Cards.module.css'
import * as actions from '../../Redux/actions';
import Loading from '../Loading/Loading';

function Cards( {onClose} ) {
  // console.log(onClose);
  const dispatch = useDispatch();
  
  const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    dispatch(actions.getRecipes());
  }, [dispatch]);

  const filteredRecipes = useSelector(state => state.filteredRecipes);

  const origin = useSelector((state) => state.origin);



  const cardsPerPage = 9;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = filteredRecipes.slice(startIndex, endIndex);

  //Delete cards
  const handleClose = (id) => {
    onClose(id);
  };
// console.log(handleClose);
  return (
    <div className={style.cards}>
        {currentCards && currentCards.length > 0 ? (
          currentCards.map((recip) => (
        <Card
          key={recip.id}
          id={recip.id}
          name={recip.name}
          healthScore={recip.healthScore}
          image={recip.image}
          diets={recip.diets}
          showButton={origin === 'database'} // Pasar la prop showButton basada en la fuente de las recetas
          onClose={onClose}
        />
      ))
      ) : (
        <Loading/>
      )}
    </div>
  );
}

export default Cards;





