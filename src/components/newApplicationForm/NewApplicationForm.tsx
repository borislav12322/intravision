import React, { ChangeEvent, FormEvent, ReactElement } from 'react';
import s from './newApplicationForm.module.css';
import CloseIcon from '../../assets/images/closeBtn.png';

type PropsType = {
  closeAddNewApplicationForm: () => void;
  newApplicationName: string;
  newApplicationDescription: string;
  setNewApplicationName: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  setNewApplicationDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmitHandle: (e: FormEvent<HTMLFormElement>) => void;
};

const NewApplicationForm = React.memo(
  ({
    closeAddNewApplicationForm,
    setNewApplicationName,
    setNewApplicationDescription,
    onSubmitHandle,
    newApplicationName,
    newApplicationDescription,
  }: PropsType): ReactElement => (
    <div className="applicationFormContainer">
      <div className="header">
        <h2 className={s.title}>Новая заявка</h2>
        <button className="btnClose" type="button" onClick={closeAddNewApplicationForm}>
          <img className={s.icon} src={CloseIcon} alt="close" />
        </button>
      </div>
      <div className={s.content}>
        <form className={s.form} onSubmit={onSubmitHandle}>
          <div className={s.textAreaBox}>
            <h3 className={s.subtitle}>Название</h3>
            <textarea
              value={newApplicationName}
              className={`${s.textareaName} ${s.textarea}`}
              name="name"
              id="name"
              onChange={setNewApplicationName}
            />
          </div>
          <div className={s.textAreaBox}>
            <h3 className={s.subtitle}>Описание</h3>
            <textarea
              value={newApplicationDescription}
              className={`${s.textareaDescription} ${s.textarea}`}
              name="description"
              id="description"
              onChange={setNewApplicationDescription}
            />
          </div>
          <button type="submit" className={`${s.btnSubmit} btn`}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  ),
);

export default NewApplicationForm;
