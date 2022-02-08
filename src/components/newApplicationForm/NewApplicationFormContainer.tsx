import React, { ChangeEvent, FormEvent, ReactElement, useCallback } from 'react';
import NewApplicationForm from './NewApplicationForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewApplicationTC,
  InitialStateType,
  setAddNewApplicationVisibleAC,
  setNewApplicationDescriptionAC,
  setNewApplicationNameAC,
} from '../../redux/applications-reducer';
import { AppRootStateType } from '../../redux/store';

const NewApplicationFormContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const defaultTag = 103877;

  const { newApplicationName, newApplicationDescription } = useSelector<
    AppRootStateType,
    InitialStateType
  >(state => state.applicationsReducer);

  const closeAddNewApplicationForm = useCallback((): void => {
    dispatch(setAddNewApplicationVisibleAC(false));
  }, [dispatch]);
  const setNewApplicationName = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>): void => {
      dispatch(setNewApplicationNameAC(e.currentTarget.value));
    },
    [dispatch],
  );
  const setNewApplicationDescription = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>): void => {
      dispatch(setNewApplicationDescriptionAC(e.currentTarget.value));
    },
    [dispatch],
  );
  const newApplicationBody = {
    name: newApplicationName,
    description: newApplicationDescription,
    comment: '',
    price: 100,
    taskTypeId: 70328,
    statusId: 120654,
    priorityId: 103877,
    serviceId: 70326,
    resolutionDatePlan: '2022-02-06T16:20:00.057Z',
    tags: [defaultTag],
    initiatorId: 70327,
    executorId: 70327,
    executorGroupId: 70328,
  };
  const onSubmitHandle = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      dispatch(addNewApplicationTC(newApplicationBody));
      dispatch(setNewApplicationNameAC(''));
      dispatch(setNewApplicationDescriptionAC(''));
      e.currentTarget.reset();
    },
    [newApplicationBody, dispatch],
  );

  return (
    <NewApplicationForm
      closeAddNewApplicationForm={closeAddNewApplicationForm}
      newApplicationName={newApplicationName}
      newApplicationDescription={newApplicationDescription}
      setNewApplicationName={setNewApplicationName}
      setNewApplicationDescription={setNewApplicationDescription}
      onSubmitHandle={onSubmitHandle}
    />
  );
};

export default NewApplicationFormContainer;
