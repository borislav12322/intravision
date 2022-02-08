import React, { ReactElement, useEffect } from 'react';
import ApplicationPage from './ApplicationPage';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApplicationType,
  changeActiveItemAC,
  getApplicationInfoTC,
  getApplicationsTC,
  getExecutorsTC,
  getStatusesTC,
  setAddNewApplicationVisibleAC,
  setEditApplicationVisibleAC,
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
  const isEditFormVisible = useSelector<AppRootStateType, boolean>(
    state => state.applicationsReducer.isEditApplicationFormVisible,
  );
  const openAddNewApplicationForm = (): void => {
    dispatch(setAddNewApplicationVisibleAC(true));
    dispatch(setEditApplicationVisibleAC(false));
  };
  const openApplicationEditInfo = (id: string): void => {
    dispatch(getApplicationInfoTC(id));
    dispatch(setEditApplicationVisibleAC(true));
    dispatch(setAddNewApplicationVisibleAC(false));
    dispatch(changeActiveItemAC(id));
  };

  useEffect(() => {
    dispatch(getApplicationsTC());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getStatusesTC());
    dispatch(getExecutorsTC());
    console.log(applications);
  }, [dispatch, applications]);
  return (
    <ApplicationPage
      applications={applications}
      isAddFormVisible={isAddFormVisible}
      openAddNewApplicationForm={openAddNewApplicationForm}
      openApplicationEditInfo={openApplicationEditInfo}
      isEditFormVisible={isEditFormVisible}
    />
  );
};

export default ApplicationPageContainer;
