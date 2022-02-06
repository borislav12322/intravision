import React, { ReactElement, useEffect } from 'react';
import ApplicationPage from './ApplicationPage';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApplicationType,
  getApplicationsTC,
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

  useEffect(() => {
    dispatch(getApplicationsTC());
  }, [dispatch]);
  return (
    <ApplicationPage
      applications={applications}
      isAddFormVisible={isAddFormVisible}
      openAddNewApplicationForm={openAddNewApplicationForm}
    />
  );
};

export default ApplicationPageContainer;
