import React from 'react';
import style from './Loading.module.css';
import loadingGif from '../../assets/loader.gif';

const Loading = () => {
  return (
    <div className={style.loadContainer}>
      <div className={style.loadingBackground} />
      <img className={style.load} src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default Loading;
