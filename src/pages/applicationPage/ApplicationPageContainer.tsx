import React, { ReactElement, useCallback, useEffect } from 'react';
import ApplicationPage from './ApplicationPage';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApplicationType,
  changeActiveItemAC,
  getApplicationInfoTC,
  getApplicationsTC,
  getExecutorsTC,
  getStatusesTC,
  InitialStateType,
  setAddNewApplicationVisibleAC,
  setEditApplicationVisibleAC,
} from '../../redux/applications-reducer';
import { AppRootStateType } from '../../redux/store';

const ApplicationPageContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const applications = useSelector<AppRootStateType, ApplicationType[]>(
    state => state.applicationsReducer.applications,
  );

  const { isAddNewApplicationFormVisible, isEditApplicationFormVisible } = useSelector<
    AppRootStateType,
    InitialStateType
  >(state => state.applicationsReducer);

  const openAddNewApplicationForm = useCallback((): void => {
    dispatch(setAddNewApplicationVisibleAC(true));
    dispatch(setEditApplicationVisibleAC(false));
  }, [dispatch]);
  const openApplicationEditInfo = useCallback(
    (id: string): void => {
      dispatch(getApplicationInfoTC(id));
      dispatch(setEditApplicationVisibleAC(true));
      dispatch(setAddNewApplicationVisibleAC(false));
      dispatch(changeActiveItemAC(id));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getApplicationsTC());
    dispatch(getStatusesTC());
    dispatch(getExecutorsTC());
  }, [dispatch]);
  return (
    <ApplicationPage
      applications={applications}
      isAddFormVisible={isAddNewApplicationFormVisible}
      openAddNewApplicationForm={openAddNewApplicationForm}
      openApplicationEditInfo={openApplicationEditInfo}
      isEditFormVisible={isEditApplicationFormVisible}
    />
  );
};

export default ApplicationPageContainer;
