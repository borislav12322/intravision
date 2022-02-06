import React, { ReactElement } from 'react';
import s from './applicationPage.module.css';
import { ApplicationType } from '../../redux/applications-reducer';

type PropsType = {
  applications: ApplicationType[];
};

const ApplicationPage = ({ applications }: PropsType): ReactElement => (
  <div className={s.applicationsContainer}>
    <div>Applications</div>
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
            <div className={`${s.itemID} ${s.listItem}`}>{item.id}</div>
            <div className={`${s.itemName} ${s.listItem}`}>{item.name}</div>
            <div className={`${s.itemStatus} ${s.listItem}`}>{item.statusName}</div>
            <div className={`${s.itemExecutor} ${s.listItem}`}>{item.executorName}</div>
          </li>
        ))}
    </ul>
  </div>
);

export default ApplicationPage;
