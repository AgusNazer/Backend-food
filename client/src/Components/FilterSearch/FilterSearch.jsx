import style from './FilterSearch.module.css';
import * as actions from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const FilterSearch = () => {
  const dispatch = useDispatch();
  const [dietOptions, setDietOptions] = useState([]);
//   const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(actions.getDiets());
  }, [dispatch]);

  const handleOrderByName = (e) => {
    dispatch(actions.orderByName(e.target.value));
  };

  const handleOrderByHealthScore = (e) => {
    dispatch(actions.orderByHealthScore(e.target.value));
  };

  const filterByDiets = (e) => {
    dispatch(actions.filterByDiet(e.target.value));
  };

  const filterByOrigin = (e) => {
    const selectedOption = e.target.value;
    dispatch(actions.filterByOrigin(selectedOption));
  };

  const diets = useSelector((state) => state.diets);

  useEffect(() => {
    setDietOptions(diets.map((diet) => diet.name));
  }, [diets]);


  
  
  return (
    <div className={style.filterSearchContainer}>
      <div>
        <ul className={style.filterList}>
          <li className={style.filterItem}>
            <h2 className={style.filterTitle}>Filter by Origin</h2>
            <select className={style.filterSelect} name="Sort by Origin" id="FilterByOrigin" onChange={filterByOrigin}>
              <option value="">All recipes</option>
              <option value="DataBase">DataBase</option>
              <option value="Api">Api</option>
            </select>
          </li>
          <br />
          <li className={style.filterItem}>
            <h2 className={style.filterTitle}>Sort by Name</h2>
            <select className={style.filterSelect} name="Sort by Name" id="OrderByName" onChange={handleOrderByName}>
              {/* <option value="">Click here!</option> */}
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </li>
          <br />
          <li className={style.filterItem}>
            <h2 className={style.filterTitle}>Sort by Health Score</h2>
            <select className={style.filterSelect} name="Sort by Health Score" id="OrderByHealthScore" onChange={handleOrderByHealthScore}>
              {/* <option value="">Click here!</option> */}
              <option value="Ascending">Ascending</option>
              <option value="Descending">Descending</option>
            </select>
          </li>
          <br />
          <li className={style.filterItem}>
            <h2 className={style.filterTitle}>Filter by Diets</h2>
            <select className={style.filterSelect} name="Filter by Diets" id="FilterByDiets" onChange={filterByDiets}>
              <option className={style.diets} value="all">All Diets</option>
              {dietOptions.map((diet, index) => (
                <option value={diet} key={index}>
                  {diet}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilterSearch;


