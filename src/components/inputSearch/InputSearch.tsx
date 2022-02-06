import React, { ReactElement } from 'react';
import s from './inputSearch.module.css';

import SearchIcon from '../../assets/images/searchIcon.png';

const InputSearch = (): ReactElement => (
  <div className={s.inputSearchContainer}>
    <div className={s.inputSearchWrapper}>
      <img className={s.icon} src={SearchIcon} alt="icon" />
      <input className={s.input} type="text" />
    </div>
  </div>
);

export default InputSearch;
