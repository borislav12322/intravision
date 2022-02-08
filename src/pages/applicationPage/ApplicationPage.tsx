import React, { ReactElement } from 'react';
import s from './applicationPage.module.css';
import { ApplicationType } from '../../redux/applications-reducer';
import NewApplicationFormContainer from '../../components/newApplicationForm/NewApplicationFormContainer';
import EditApplicationContainer from '../../components/editApplication/EditApplicationContainer';

type PropsType = {
  applications: ApplicationType[];
  isAddFormVisible: boolean;
  isEditFormVisible: boolean;
  openAddNewApplicationForm: () => void;
  openApplicationEditInfo: (id: string) => void;
};

const ApplicationPage = ({
  applications,
  isAddFormVisible,
  openAddNewApplicationForm,
  openApplicationEditInfo,
  isEditFormVisible,
}: PropsType): ReactElement => (
  <div className={s.applicationsContainer}>
    <button
      className={`${s.createButton} btn`}
      type="button"
      onClick={openAddNewApplicationForm}
    >
      Создать заявку
    </button>
    <ul className={s.tableList}>
      <li className={s.tableListItem}>
        <div className={`${s.itemID} ${s.listHeader}`}>ID</div>
        <div className={`${s.itemName} ${s.listHeader}`}>Название</div>
        <div className={`${s.itemStatus} ${s.listHeader}`}>Статус</div>
        <div className={`${s.itemExecutor} ${s.listHeader}`}>Исполнитель</div>
      </li>
      {applications &&
        applications.map(item => {
          const onClickHandle = (): void => {
            openApplicationEditInfo(item.id.toString());
          };
          return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <li className={s.tableListItem} key={item.id} onClick={onClickHandle}>
              <div className={`${s.itemID} ${s.listItem}`}>
                {item.id}
                <span
                  className={s.colorStatus}
                  style={{ backgroundColor: item.statusRgb }}
                />
              </div>
              <div className={`${s.itemName} ${s.listItem}`}>
                <p className={s.applicationText}>{item.name}</p>
              </div>
              <div className={`${s.itemStatus} ${s.listItem}`}>
                <span
                  className={s.statusText}
                  style={{
                    backgroundColor: item.statusRgb,
                  }}
                >
                  {item.statusName}
                </span>
              </div>
              <div className={`${s.itemExecutor} ${s.listItem}`}>{item.executorName}</div>
            </li>
          );
        })}
    </ul>
    {isAddFormVisible && <NewApplicationFormContainer />}
    {isEditFormVisible && <EditApplicationContainer />}
  </div>
);

export default ApplicationPage;
