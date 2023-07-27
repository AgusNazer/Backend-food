
import style from './HomePage.module.css';
import Cards from '../Cards/Cards';
import SearchBar from '../SearchBar/SearchBar';
import Pagination from '../Pagination/Pagination';
import FilterSearch from '../FilterSearch/FilterSearch';
import { useDispatch } from 'react-redux';
import { deleteRecipe } from '../../Redux/actions';
import Footer from '../Footer/Footer';

const HomePage = () => {

    const dispatch = useDispatch();


    
    const handleClose = (id) => {
      dispatch(deleteRecipe(id));
    };
  console.log(handleClose);
   
  return (
    <div>
    <div className={style.fondo}>
      <header className={style.head}>
        <SearchBar />
      </header>
      <div className={style.body}>
        <Pagination />
        <Cards  onClose={handleClose} />
      </div>
      <aside className={style.filterSearch}>
      <FilterSearch />
      </aside>
    </div>
      <Footer/>
      </div>
  );
};

export default HomePage;
