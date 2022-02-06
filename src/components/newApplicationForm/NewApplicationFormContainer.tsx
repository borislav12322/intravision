import React, { ChangeEvent, FormEvent, ReactElement } from 'react';
import NewApplicationForm from './NewApplicationForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewApplicationTC,
  setAddNewApplicationVisibleAC,
  setNewApplicationDescriptionAC,
  setNewApplicationNameAC,
} from '../../redux/applications-reducer';
import { AppRootStateType } from '../../redux/store';

const NewApplicationFormContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const newApplicationName = useSelector<AppRootStateType, string>(
    state => state.applicationsReducer.newApplicationName,
  );
  const newApplicationDescription = useSelector<AppRootStateType, string>(
    state => state.applicationsReducer.newApplicationDescription,
  );
  const closeAddNewApplicationForm = (): void => {
    dispatch(setAddNewApplicationVisibleAC(false));
  };
  const setNewApplicationName = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setNewApplicationNameAC(e.currentTarget.value));
  };
  const setNewApplicationDescription = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setNewApplicationDescriptionAC(e.currentTarget.value));
  };
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
    tags: [+'103877'],
    initiatorId: 70327,
    executorId: 70327,
    executorGroupId: 70328,
  };
  const onSubmitHandle = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addNewApplicationTC(newApplicationBody));
    console.log(newApplicationName);
    console.log(newApplicationDescription);
    dispatch(setNewApplicationNameAC(''));
    dispatch(setNewApplicationDescriptionAC(''));
    e.currentTarget.reset();
  };

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
