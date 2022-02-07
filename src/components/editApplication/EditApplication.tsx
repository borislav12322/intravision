import React, { ReactElement } from 'react';
import s from './editApplication.module.css';
import CloseBtnIcon from '../../assets/images/closeBtn.png';

import CommentCircle from '../../assets/images/commenctCircle.png';

const EditApplication = (): ReactElement => (
  <div className="applicationFormContainer" style={{ display: 'none' }}>
    <div className="header" style={{ marginBottom: '0px' }}>
      <div className={s.textContent}>
        <span className={s.id}>123123</span>
        <h2 className={s.title}>header</h2>
      </div>
      <button type="button" className="btnClose">
        <img src={CloseBtnIcon} alt="close" />
      </button>
    </div>
    <div className={s.content}>
      <div className={s.info}>
        <h3 className={s.subTitle}>Описание</h3>
        <p className={s.description}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci alias amet
          cum dicta dignissimos et harum nemo nihil sapiente sed sequi sit, tempore totam
          veritatis vero voluptates. Atque, error.
        </p>
        <h3 className={s.subTitle}>Добавление коментариев</h3>
        <button type="button" className={`${s.sendBtn} btn`}>
          Сохранить
        </button>
        <div className={s.commentsContent}>
          <img src={CommentCircle} className={s.commentCircle} alt="circle" />
          <div className={s.commentMainContent}>
            <h4 className={s.nameTitle}>name</h4>
            <span className={s.dateInfo}>12312</span>
            <p className={s.commentDescription}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At consectetur
              culpa doloremque doloribus eius minima porro, quia similique unde! Labore
              molestias nihil nostrum omnis pariatur placeat quasi reprehenderit suscipit
              tenetur?
            </p>
          </div>
        </div>
      </div>
      <div className={s.executorInfo}>
        <div className={s.status}>
          <span className={s.jobStatus} />
          <span className={s.statusText}>В работе</span>
        </div>
        <div className={s.executorInfoContent} style={{ marginBottom: '56px' }}>
          <h5 className={s.executorInfoTitle}>Заявитель</h5>
          <span className={s.executorText}>name</span>
        </div>
        <div className={`${s.executorInfoContent} ${s.executorInfoStyle}`}>
          <h5 className={s.executorInfoTitle}>Создана</h5>
          <span className={s.executorText}>name</span>
        </div>
        <div className={`${s.executorInfoContent} ${s.executorInfoStyle}`}>
          <h5 className={s.executorInfoTitle}>Исполнитель</h5>
          <span className={s.executorText}>name</span>
        </div>
        <div className={`${s.executorInfoContent} ${s.executorInfoStyle}`}>
          <h5 className={s.executorInfoTitle}>Приоритет</h5>
          <span className={s.executorText}>name</span>
        </div>
        <div className={`${s.executorInfoContent} ${s.executorInfoStyle}`}>
          <h5 className={s.executorInfoTitle}>Срок</h5>
          <span className={s.executorText}>name</span>
        </div>
        <div className={`${s.executorInfoContent} ${s.executorInfoStyle}`}>
          <h5 className={s.executorInfoTitle}>Теги</h5>
          <span className={s.executorText}>name</span>
        </div>
      </div>
    </div>
  </div>
);

export default EditApplication;
