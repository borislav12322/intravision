import React, { ReactElement, useEffect } from 'react';
import ApplicationPage from './ApplicationPage';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApplicationType,
  getApplicationInfoTC,
  getApplicationsTC,
  getExecutorsTC,
  getStatusesTC,
  setAddNewApplicationVisibleAC,
} from '../../redux/applications-reducer';
import { AppRootStateType } from '../../redux/store';

const ApplicationPageContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const applications = useSelector<AppRootStateType, ApplicationType[]>(
    state => state.applicationsReducer.applications,
  );
  const isAddFormVisible = useSelector<AppRootStateType, boolean>(
    state => state.applicationsReducer.isAddNewApplicationFormVisible,
  );
  const openAddNewApplicationForm = (): void => {
    dispatch(setAddNewApplicationVisibleAC(true));
  };
  const openApplicationEditInfo = (id: string): void => {
    dispatch(getApplicationInfoTC(id));
  };

  useEffect(() => {
    dispatch(getApplicationsTC());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getStatusesTC());
    dispatch(getExecutorsTC());
  }, [dispatch]);
  return (
    <ApplicationPage
      applications={applications}
      isAddFormVisible={isAddFormVisible}
      openAddNewApplicationForm={openAddNewApplicationForm}
      openApplicationEditInfo={openApplicationEditInfo}
    />
  );
};

export default ApplicationPageContainer;
