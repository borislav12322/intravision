import React, { ReactElement } from 'react';
import s from './newApplicationForm.module.css';
import CloseIcon from '../../assets/images/closeBtn.png';

const NewApplicationForm = (): ReactElement => (
  <div className={s.newApplicationContainer}>
    <div className={s.header}>
      <h2 className={s.title}>Новая заявка</h2>
      <button className={s.btnClose} type="button">
        <img className={s.icon} src={CloseIcon} alt="close" />
      </button>
    </div>
    <div className={s.content}>
      <form className={s.form}>
        <div className={s.textAreaBox}>
          <h3 className={s.subtitle}>Название</h3>
          <textarea className={`${s.textareaName} ${s.textarea}`} name="name" id="name" />
        </div>
        <div className={s.textAreaBox}>
          <h3 className={s.subtitle}>Описание</h3>
          <textarea
            className={`${s.textareaDescription} ${s.textarea}`}
            name="description"
            id="description"
          />
        </div>
        <button type="submit" className={`${s.btnSubmit} btn`}>
          Сохранить
        </button>
      </form>
    </div>
  </div>
);

export default NewApplicationForm;
