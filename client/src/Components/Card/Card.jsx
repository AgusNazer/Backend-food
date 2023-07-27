import style from './Card.module.css'
import {NavLink} from 'react-router-dom'



function Card ({id, image, name, diets, healthScore, showButton, onClose }) {

    const handlerClick = () => {
        
          onClose(id);
       
      }

    //   console.log(handlerClick);
const dietsString = diets.join(", ");
    
    return (
        <div className={style.bigContainer}>
            <div className={style.body}></div>
            <div className={style.img}>
                
            <NavLink to = {`/detail/${id}`}>
                <img className={style.imagenes} src={image} alt={name} title="Go to details"/>
            </NavLink>
            </div>
            <div className={style.specs}>
                <h2 className={style.hdos}>{name}</h2>
                <h2 className={style.hdos}>Health Score: {healthScore}</h2>
                <h2 className={style.hdos}>Diets: {dietsString}</h2>
                {/* <button className={style.btnClose}
       
                    onClick={''} >X</button> */}
                    {showButton && (
  <button className={style.btnClose} onClick={handlerClick}>
    X
  </button>
)}
            </div>
        </div>
    )
};


export default Card

