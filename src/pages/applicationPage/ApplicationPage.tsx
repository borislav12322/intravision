import React, { ReactElement } from 'react';
import s from './applicationPage.module.css';
import { ApplicationType } from '../../redux/applications-reducer';
import NewApplicationFormContainer from '../../components/newApplicationForm/NewApplicationFormContainer';

type PropsType = {
  applications: ApplicationType[];
  isAddFormVisible: boolean;
  openAddNewApplicationForm: () => void;
};

const ApplicationPage = ({
  applications,
  isAddFormVisible,
  openAddNewApplicationForm,
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
        applications.map(item => (
          <li className={s.tableListItem} key={item.id}>
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
        ))}
    </ul>
    {isAddFormVisible && <NewApplicationFormContainer />}
  </div>
);

export default ApplicationPage;
