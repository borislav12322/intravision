import React, { ReactElement, useState } from 'react';
import EditApplication from './EditApplication';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../redux/store';
import {
  ApplicationInfoType,
  changeApplicationStatusTC,
  ExecutorsType,
  setStatusAC,
  StatusesType,
  updateApplicationColorStatusAC,
} from '../../redux/applications-reducer';

const EditApplicationContainer = (): ReactElement => {
  const [isStatusListVisible, setStatusListVisible] = useState<boolean>(false);
  const [isExecutorListVisible, setExecutorListVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  const applicationInfo = useSelector<AppRootStateType, ApplicationInfoType | null>(
    state => state.applicationsReducer.applicationInfo,
  );
  const statuses = useSelector<AppRootStateType, StatusesType[]>(
    state => state.applicationsReducer.statuses,
  );
  const executors = useSelector<AppRootStateType, ExecutorsType[]>(
    state => state.applicationsReducer.executors,
  );
  const changeStatusListVisible = (isVisible: boolean): void => {
    setStatusListVisible(isVisible);
  };
  const changeExecutorListVisible = (isVisible: boolean): void => {
    setExecutorListVisible(isVisible);
  };
  const changeStatus = (
    newStatusID: number,
    statusColor: string,
    statusName: string,
    id: number | null,
    executorID: number | null,
  ): void => {
    dispatch(setStatusAC(newStatusID, statusColor, statusName, id, executorID));
    dispatch(changeApplicationStatusTC(id, newStatusID, executorID));
    dispatch(updateApplicationColorStatusAC(statusColor, id));
  };

  const changeExecutor = (
    id: number | null,
    statusId: number,
    executorId: number | null,
  ): void => {};

  return (
    <EditApplication
      applicationInfo={applicationInfo}
      statuses={statuses}
      changeStatusListVisible={changeStatusListVisible}
      isStatusListVisible={isStatusListVisible}
      changeStatus={changeStatus}
      changeExecutor={changeExecutor}
      isExecutorListVisible={isExecutorListVisible}
      changeExecutorListVisible={changeExecutorListVisible}
      executors={executors}
    />
  );
};

export default EditApplicationContainer;
