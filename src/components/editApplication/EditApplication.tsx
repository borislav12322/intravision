import React, { ChangeEvent, ReactElement } from 'react';
import s from './editApplication.module.css';
import CloseBtnIcon from '../../assets/images/closeBtn.png';

import CommentCircle from '../../assets/images/commenctCircle.png';
import {
  ApplicationInfoType,
  ExecutorsType,
  LifeTimeItemType,
  StatusesType,
} from '../../redux/applications-reducer';
import LoadingComponent from '../loadingComponent/LoadingComponent';

type PropsType = {
  applicationInfo: ApplicationInfoType | null;
  statuses: StatusesType[];
  executors: ExecutorsType[];
  changeStatusListVisible: (isVisible: boolean) => void;
  changeExecutorListVisible: (isVisible: boolean) => void;
  commentAreaHandle: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  closeEditForm: () => void;
  isStatusListVisible: boolean;
  isLoading: boolean;
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
    statusId: number | null,
    executorId: number | null,
    name: string | null,
  ) => void;
  addComment: (
    id: number | null,
    statusId: number | null,
    executorId: number | null,
  ) => void;
  commentText: string;
  createdAt: string;
  resolutionDatePlanValue: string;
  filteredComments: LifeTimeItemType[];
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  idNumberDivided: string | null | 0;
};

const EditApplication = React.memo(
  ({
    applicationInfo,
    statuses,
    changeStatusListVisible,
    isStatusListVisible,
    changeStatus,
    changeExecutor,
    isExecutorListVisible,
    changeExecutorListVisible,
    executors,
    closeEditForm,
    commentAreaHandle,
    addComment,
    commentText,
    isLoading,
    createdAt,
    resolutionDatePlanValue,
    filteredComments,
    idNumberDivided,
  }: PropsType): ReactElement => (
    <div className="applicationFormContainer">
      {isLoading && <LoadingComponent />}
      <div className="header" style={{ marginBottom: '0px' }}>
        <div className={s.textContent}>
          <span className={s.id}>??? {idNumberDivided}</span>
          <h2 className={s.title}>{applicationInfo && applicationInfo.name}</h2>
        </div>
        <button
          type="button"
          className="btnClose"
          onClick={() => {
            closeEditForm();
          }}
        >
          <img src={CloseBtnIcon} alt="close" />
        </button>
      </div>
      <div className={s.content}>
        <div className={s.info}>
          <h3 className={s.subTitle}>????????????????</h3>
          <p className={s.description}>
            {applicationInfo && applicationInfo.description}
          </p>
          <h3 className={s.subTitle}>???????????????????? ??????????????????????</h3>
          <textarea
            name="comments"
            id="comments"
            className={s.textarea}
            onChange={commentAreaHandle}
            value={commentText}
          />
          <button
            type="button"
            className={`${s.sendBtn} btn`}
            onClick={() => {
              addComment(
                applicationInfo && applicationInfo.id,
                applicationInfo && applicationInfo.statusId,
                applicationInfo && applicationInfo.executorId,
              );
            }}
          >
            ??????????????????
          </button>
          {filteredComments.map(item => (
            <div className={s.commentsContent} key={item.id}>
              <img src={CommentCircle} className={s.commentCircle} alt="circle" />
              <div className={s.commentMainContent}>
                <h4 className={s.nameTitle}>{item.userName}</h4>
                <div className={s.commentDateBox}>
                  <span className={s.dateInfo} style={{ marginRight: '5px' }}>
                    {new Date(item.createdAt).toLocaleDateString('ru', {
                      month: 'long',
                      day: 'numeric',
                    })}
                    ,
                  </span>
                  <span className={s.dateInfo} style={{ marginRight: '5px' }}>
                    {new Date(item.createdAt).toLocaleTimeString('ru', {
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </span>
                  <span className={s.dateInfo}>????????????????????????????????</span>
                </div>
                <p className={s.commentDescription}>{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={s.executorInfo}>
          <div className={`${s.status} ${s.editableElement}`}>
            {isStatusListVisible && (
              <ul
                className={s.changeStatusList}
                onMouseLeave={() => {
                  changeStatusListVisible(false);
                }}
              >
                <li className={s.statusChangeTitle}>?????????? ??????????????</li>
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
            )}
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
          </div>
          <div className={s.executorInfoContent} style={{ marginBottom: '56px' }}>
            <h5 className={s.executorInfoTitle}>??????????????????</h5>
            <span className={s.executorText}>
              {applicationInfo && applicationInfo.initiatorName}
            </span>
          </div>
          <div className={`${s.executorInfoContent} ${s.executorInfoStyle}`}>
            <h5 className={s.executorInfoTitle}>??????????????</h5>
            <span className={s.executorText}>{createdAt}</span>
          </div>
          <div
            className={`${s.executorInfoContent} ${s.executorInfoStyle} ${s.editableElement}`}
            onMouseLeave={() => {
              changeExecutorListVisible(false);
            }}
          >
            <h5 className={s.executorInfoTitle}>??????????????????????</h5>

            {isExecutorListVisible && (
              <ul className={s.executorsList}>
                {executors.map(item => {
                  const onClickHandle = (): void => {
                    changeExecutorListVisible(false);
                    changeExecutor(
                      applicationInfo && applicationInfo.id,
                      applicationInfo && applicationInfo.statusId,
                      item.id,
                      item.name,
                    );
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
            <h5 className={s.executorInfoTitle}>??????????????????</h5>
            <span className={s.executorText}>
              {applicationInfo && applicationInfo.priorityName}
            </span>
          </div>
          <div className={`${s.executorInfoContent} ${s.executorInfoStyle} ${s.dateBox}`}>
            <h5 className={s.executorInfoTitle}>????????</h5>
            <span className={`${s.executorText} ${s.dateText}`}>
              {resolutionDatePlanValue}
            </span>
          </div>
          <div className={`${s.executorInfoContent} ${s.executorInfoStyle}`}>
            <h5 className={s.executorInfoTitle}>????????</h5>
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
  ),
);

export default EditApplication;
