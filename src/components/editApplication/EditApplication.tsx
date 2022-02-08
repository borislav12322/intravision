import React, { ReactElement } from 'react';
import s from './editApplication.module.css';
import CloseBtnIcon from '../../assets/images/closeBtn.png';

import CommentCircle from '../../assets/images/commenctCircle.png';
import {
  ApplicationInfoType,
  ExecutorsType,
  StatusesType,
} from '../../redux/applications-reducer';

type PropsType = {
  applicationInfo: ApplicationInfoType | null;
  statuses: StatusesType[];
  executors: ExecutorsType[];
  changeStatusListVisible: (isVisible: boolean) => void;
  changeExecutorListVisible: (isVisible: boolean) => void;
  isStatusListVisible: boolean;
  isExecutorListVisible: boolean;
  changeStatus: (
    newStatusID: number,
    statusColor: string,
    statusName: string,
    id: number | null,
    executorID: number | null,
  ) => void;
  changeExecutor: (
    id: number | null,
    statusId: number,
    executorId: number | null,
  ) => void;
};

const EditApplication = ({
  applicationInfo,
  statuses,
  changeStatusListVisible,
  isStatusListVisible,
  changeStatus,
  changeExecutor,
  isExecutorListVisible,
  changeExecutorListVisible,
  executors,
}: PropsType): ReactElement => (
  <div className="applicationFormContainer">
    <div className="header" style={{ marginBottom: '0px' }}>
      <div className={s.textContent}>
        <span className={s.id}>№ {applicationInfo && applicationInfo.id}</span>
        <h2 className={s.title}>{applicationInfo && applicationInfo.name}</h2>
      </div>
      <button type="button" className="btnClose">
        <img src={CloseBtnIcon} alt="close" />
      </button>
    </div>
    <div className={s.content}>
      <div className={s.info}>
        <h3 className={s.subTitle}>Описание</h3>
        <p className={s.description}>{applicationInfo && applicationInfo.description}</p>
        <h3 className={s.subTitle}>Добавление коментариев</h3>
        <textarea name="comments" id="comments" className={s.textarea} />
        <button type="button" className={`${s.sendBtn} btn`}>
          Сохранить
        </button>
        {applicationInfo &&
          applicationInfo.lifetimeItems.map(item => (
            <div className={s.commentsContent} key={item.id}>
              <img src={CommentCircle} className={s.commentCircle} alt="circle" />
              <div className={s.commentMainContent}>
                <h4 className={s.nameTitle}>{item.userName}</h4>
                <span className={s.dateInfo}>{item.createdAt}</span>
                <p className={s.commentDescription}>{item.comment}</p>
              </div>
            </div>
          ))}
      </div>
      <div className={s.executorInfo}>
        <div className={`${s.status} ${s.editableElement}`}>
          {isStatusListVisible ? (
            <ul
              className={s.changeStatusList}
              onMouseLeave={() => {
                changeStatusListVisible(false);
              }}
            >
              <li className={s.statusChange}>Выбор статуса</li>
              {statuses.map(item => {
                const onClickHandle = (): void => {
                  changeStatusListVisible(false);
                  changeStatus(
                    item.id,
                    item.rgb,
                    item.name,
                    applicationInfo && applicationInfo.id,
                    applicationInfo && applicationInfo.executorId,
                  );
                };
                return (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                  <li
                    className={s.changeStatusText}
                    key={item.id}
                    onClick={onClickHandle}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={s.statusBox}>
              <span
                className={s.jobStatus}
                style={{
                  backgroundColor: `${applicationInfo && applicationInfo.statusRgb}`,
                }}
              />
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <span
                className={s.statusText}
                onClick={() => {
                  changeStatusListVisible(true);
                }}
              >
                {applicationInfo && applicationInfo.statusName}
              </span>
            </div>
          )}
        </div>
        <div className={s.executorInfoContent} style={{ marginBottom: '56px' }}>
          <h5 className={s.executorInfoTitle}>Заявитель</h5>
          <span className={s.executorText}>
            {applicationInfo && applicationInfo.initiatorName}
          </span>
        </div>
        <div className={`${s.executorInfoContent} ${s.executorInfoStyle}`}>
          <h5 className={s.executorInfoTitle}>Создана</h5>
          <span className={s.executorText}>
            {applicationInfo && applicationInfo.createdAt}
          </span>
        </div>
        <div
          className={`${s.executorInfoContent} ${s.executorInfoStyle} ${s.editableElement}`}
          onMouseLeave={() => {
            changeExecutorListVisible(false);
          }}
        >
          <h5 className={s.executorInfoTitle}>Исполнитель</h5>

          {isExecutorListVisible && (
            <ul className={s.executorsList}>
              {executors.map(item => {
                const onClickHandle = (): void => {
                  console.log(item.name);
                };
                return (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                  <li key={item.id} onClick={onClickHandle} className={s.executorItem}>
                    {item.name}
                  </li>
                );
              })}
            </ul>
          )}
          <button
            type="button"
            className={`${s.executorText} ${s.btnChange}`}
            onClick={() => {
              changeExecutorListVisible(true);
            }}
          >
            {applicationInfo && applicationInfo.executorName}
          </button>
        </div>
        <div className={`${s.executorInfoContent} ${s.executorInfoStyle}`}>
          <h5 className={s.executorInfoTitle}>Приоритет</h5>
          <span className={s.executorText}>
            {applicationInfo && applicationInfo.priorityName}
          </span>
        </div>
        <div className={`${s.executorInfoContent} ${s.executorInfoStyle}`}>
          <h5 className={s.executorInfoTitle}>Срок</h5>
          <span className={s.executorText}>
            {applicationInfo && applicationInfo.resolutionDatePlan}
          </span>
        </div>
        <div className={`${s.executorInfoContent} ${s.executorInfoStyle}`}>
          <h5 className={s.executorInfoTitle}>Теги</h5>
          <div className={s.tagsBox}>
            {applicationInfo &&
              applicationInfo.tags.map(item => (
                <span className={s.tag} key={item.id}>
                  {item.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EditApplication;
