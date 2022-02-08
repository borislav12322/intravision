import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react';
import EditApplication from './EditApplication';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../redux/store';
import {
  addCommentTC,
  changeApplicationStatusTC,
  changeExecutorTC,
  getApplicationsTC,
  InitialStateType,
  setEditApplicationVisibleAC,
} from '../../redux/applications-reducer';

const EditApplicationContainer = (): ReactElement => {
  const [isStatusListVisible, setStatusListVisible] = useState<boolean>(false);
  const [isExecutorListVisible, setExecutorListVisible] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const dispatch = useDispatch();

  const { applicationInfo, statuses, executors, isLoading } = useSelector<
    AppRootStateType,
    InitialStateType
  >(state => state.applicationsReducer);

  const changeStatusListVisible = useCallback(
    (isVisible: boolean): void => {
      setStatusListVisible(isVisible);
    },
    [dispatch],
  );
  const changeExecutorListVisible = useCallback(
    (isVisible: boolean): void => {
      setExecutorListVisible(isVisible);
    },
    [dispatch],
  );
  const closeEditForm = useCallback((): void => {
    dispatch(setEditApplicationVisibleAC(false));
    dispatch(getApplicationsTC());
  }, [dispatch]);
  const commentAreaHandle = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>): void => {
      setCommentText(e.currentTarget.value);
    },
    [dispatch],
  );
  const addComment = useCallback(
    (id: number | null, statusId: number | null, executorId: number | null): void => {
      dispatch(addCommentTC(id, statusId, executorId, commentText));
      setCommentText('');
    },
    [dispatch, commentText],
  );
  const changeStatus = useCallback(
    (
      newStatusID: number,
      statusColor: string,
      statusName: string,
      id: number | null,
      executorID: number | null,
    ): void => {
      dispatch(
        changeApplicationStatusTC(id, newStatusID, executorID, statusColor, statusName),
      );
    },
    [dispatch],
  );

  const changeExecutor = useCallback(
    (
      id: number | null,
      statusId: number | null,
      executorId: number | null,
      name: string | null,
    ): void => {
      dispatch(changeExecutorTC(id, statusId, executorId, name));
    },
    [dispatch],
  );

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
      closeEditForm={closeEditForm}
      commentAreaHandle={commentAreaHandle}
      addComment={addComment}
      commentText={commentText}
      isLoading={isLoading}
    />
  );
};

export default EditApplicationContainer;
