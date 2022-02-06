import React, { ReactElement, useEffect } from 'react';
import ApplicationPage from './ApplicationPage';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationType, getApplicationsTC } from '../../redux/applications-reducer';
import { AppRootStateType } from '../../redux/store';

const ApplicationPageContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const applications = useSelector<AppRootStateType, ApplicationType[]>(
    state => state.applicationsReducer.applications,
  );

  useEffect(() => {
    dispatch(getApplicationsTC());
  }, [dispatch]);
  console.log(applications);
  return <ApplicationPage applications={applications} />;
};

export default ApplicationPageContainer;
