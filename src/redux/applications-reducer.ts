import { Dispatch } from 'redux';
import { applicationsAPI, NewApplicationDataType } from '../DAL/applicationsAPI';
import { ThunkDispatch } from 'redux-thunk';

export type ActionsTypes =
  | GetApplicationsACType
  | SetAddNewApplicationVisibleACType
  | SetNewApplicationNameACType
  | SetNewApplicationDescriptionACType
  | GetApplicationInfoACType
  | UpdateApplicationStatusACType
  | GetStatusACType
  | SetStatusACType
  | UpdateApplicationColorStatusACType
  | GetExecutorsACType
  | ChangeExecutorACType
  | ChangeExecutorEditPageACType
  | SetEditApplicationVisibleACType
  | ChangeActiveItemACType;

export type ApplicationType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  taskTypeId: number;
  taskTypeName: string;
  statusId: number;
  statusName: string | null;
  statusRgb: string | undefined;
  priorityId: number;
  priorityName: string;
  serviceId: number;
  serviceName: string;
  resolutionDatePlan: string;
  initiatorId: number;
  initiatorName: string;
  executorId: number;
  executorName: string | null;
  executorGroupId: number;
  executorGroupName: string;
  tags: [
    {
      id: number;
      name: string;
    },
  ];
  itemClassname: string | null;
};

export type ApplicationInfoType = {
  id: number | null;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  taskTypeId: number;
  taskTypeName: string;
  statusId: number;
  statusName: string | null;
  statusRgb: string | undefined;
  priorityId: number;
  priorityName: string;
  serviceId: number;
  serviceName: string;
  resolutionDatePlan: string;
  tags: [
    {
      id: number;
      name: string;
    },
  ];
  initiatorId: number;
  initiatorName: string;
  executorId: number | null;
  executorName: string | null;
  executorGroupId: number;
  executorGroupName: string;
  lifetimeItems: [
    {
      id: number;
      userName: string;
      lifetimeType: number;
      createdAt: string;
      comment: string;
      fieldName: null | string;
      oldFieldValue: null | string;
      newFieldValue: null | string;
    },
  ];
};

export type StatusesType = {
  rgb: string;
  id: number;
  name: string;
};
export type ExecutorsType = {
  id: number;
  name: string;
};

export type InitialStateType = {
  applications: ApplicationType[];
  isAddNewApplicationFormVisible: boolean;
  isEditApplicationFormVisible: boolean;
  newApplicationName: string;
  newApplicationDescription: string;
  applicationInfo: ApplicationInfoType;
  statuses: StatusesType[];
  executors: ExecutorsType[];
};

const initialState: InitialStateType = {
  applications: [],
  isAddNewApplicationFormVisible: false,
  isEditApplicationFormVisible: false,
  newApplicationName: '',
  newApplicationDescription: '',
  applicationInfo: {
    id: 0,
    name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    price: 0,
    taskTypeId: 0,
    taskTypeName: '',
    statusId: 0,
    statusName: '',
    statusRgb: '',
    priorityId: 0,
    priorityName: '',
    serviceId: 0,
    serviceName: '',
    resolutionDatePlan: '',
    tags: [
      {
        id: 0,
        name: '',
      },
    ],
    initiatorId: 0,
    initiatorName: '',
    executorId: 0,
    executorName: '',
    executorGroupId: 0,
    executorGroupName: '',
    lifetimeItems: [
      {
        id: 0,
        userName: '',
        lifetimeType: 0,
        createdAt: '',
        comment: '',
        fieldName: null,
        oldFieldValue: null,
        newFieldValue: null,
      },
    ],
  },
  statuses: [],
  executors: [],
};

export const applicationsReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case 'GET-APPLICATION':
      return {
        ...state,
        applications: [...action.applications].reverse(),
      };
    case 'SET-APPLICATION-VISIBLE':
      return {
        ...state,
        isAddNewApplicationFormVisible: action.isVisible,
      };
    case 'SET-EDIT-APPLICATION-VISIBLE':
      return {
        ...state,
        isEditApplicationFormVisible: action.isVisible,
      };
    case 'SET-NEW-APPLICATION-NAME':
      return {
        ...state,
        newApplicationName: action.name,
      };
    case 'SET-NEW-APPLICATION-DESCRIPTION':
      return {
        ...state,
        newApplicationDescription: action.description,
      };
    case 'GET-STATUS':
      return {
        ...state,
        statuses: [...action.status],
      };
    case 'SET-STATUS':
      return {
        ...state,
        applicationInfo: {
          ...state.applicationInfo,
          id: action.id,
          statusId: action.newStatusID,
          executorId: action.executorID,
          statusName: action.statusName,
          statusRgb: action.statusColor,
        },
      };
    case 'GET-NEW-APPLICATION-INFO':
      return {
        ...state,
        applicationInfo: action.info,
      };
    case 'UPDATE-APPLICATION-COLOR-STATUS':
      return {
        ...state,
        applications: [
          ...state.applications.map(item =>
            item.id === action.id
              ? { ...item, statusRgb: action.color, statusName: action.name }
              : item,
          ),
        ],
      };
    case 'GET-EXECUTORS':
      return {
        ...state,
        executors: [...action.executors],
      };
    case 'CHANGE-EXECUTOR':
      return {
        ...state,
        applications: [
          ...state.applications.map(item =>
            item.id === action.id ? { ...item, executorName: action.executor } : item,
          ),
        ],
      };
    case 'CHANGE-EXECUTOR-EDIT':
      return {
        ...state,
        applicationInfo: {
          ...state.applicationInfo,
          executorName: action.executor,
          executorId: action.id,
        },
      };
    case 'CHANGE-ACTIVE-ITEM':
      return {
        ...state,
        applications: [
          ...state.applications.map(item =>
            item.id.toString() === action.id
              ? { ...item, itemClassname: 'activeAppItem' }
              : { ...item, itemClassname: '' },
          ),
        ],
      };

    default:
      return state;
  }
};

export type GetApplicationsACType = ReturnType<typeof getApplicationsAC>;

export const getApplicationsAC = (applications: ApplicationType[]) =>
  ({
    type: 'GET-APPLICATION',
    applications,
  } as const);

export type ChangeActiveItemACType = ReturnType<typeof changeActiveItemAC>;

export const changeActiveItemAC = (id: string | null) =>
  ({
    type: 'CHANGE-ACTIVE-ITEM',
    id,
  } as const);

export type SetAddNewApplicationVisibleACType = ReturnType<
  typeof setAddNewApplicationVisibleAC
>;

export const setAddNewApplicationVisibleAC = (isVisible: boolean) =>
  ({
    type: 'SET-APPLICATION-VISIBLE',
    isVisible,
  } as const);

export type SetEditApplicationVisibleACType = ReturnType<
  typeof setEditApplicationVisibleAC
>;

export const setEditApplicationVisibleAC = (isVisible: boolean) =>
  ({
    type: 'SET-EDIT-APPLICATION-VISIBLE',
    isVisible,
  } as const);

export type SetNewApplicationNameACType = ReturnType<typeof setNewApplicationNameAC>;

export const setNewApplicationNameAC = (name: string) =>
  ({
    type: 'SET-NEW-APPLICATION-NAME',
    name,
  } as const);

export type SetNewApplicationDescriptionACType = ReturnType<
  typeof setNewApplicationDescriptionAC
>;

export const setNewApplicationDescriptionAC = (description: string) =>
  ({
    type: 'SET-NEW-APPLICATION-DESCRIPTION',
    description,
  } as const);

export type GetApplicationInfoACType = ReturnType<typeof getApplicationInfoAC>;

export const getApplicationInfoAC = (info: ApplicationInfoType) =>
  ({
    type: 'GET-NEW-APPLICATION-INFO',
    info,
  } as const);

export type GetStatusACType = ReturnType<typeof getStatusAC>;

export const getStatusAC = (status: StatusesType[]) =>
  ({
    type: 'GET-STATUS',
    status,
  } as const);

export type SetStatusACType = ReturnType<typeof setStatusAC>;

export const setStatusAC = (
  newStatusID: number,
  statusColor: string,
  statusName: string,
  id: number | null,
  executorID: number | null,
) =>
  ({
    type: 'SET-STATUS',
    newStatusID,
    statusColor,
    statusName,
    id,
    executorID,
  } as const);

export type UpdateApplicationStatusACType = ReturnType<typeof updateApplicationStatusAC>;

export const updateApplicationStatusAC = (statusID: number, id: number) =>
  ({
    type: 'UPDATE-APPLICATION-STATUS',
    statusID,
    id,
  } as const);

export type UpdateApplicationColorStatusACType = ReturnType<
  typeof updateApplicationColorStatusAC
>;

export const updateApplicationColorStatusAC = (
  color: string | undefined,
  id: number | null,
  name: string | null,
) =>
  ({
    type: 'UPDATE-APPLICATION-COLOR-STATUS',
    color,
    id,
    name,
  } as const);

export type GetExecutorsACType = ReturnType<typeof getExecutorsAC>;

export const getExecutorsAC = (executors: ExecutorsType[]) =>
  ({
    type: 'GET-EXECUTORS',
    executors,
  } as const);

export type ChangeExecutorACType = ReturnType<typeof changeExecutorAC>;

export const changeExecutorAC = (executor: string | null, id: number | null) =>
  ({
    type: 'CHANGE-EXECUTOR',
    executor,
    id,
  } as const);

export type ChangeExecutorEditPageACType = ReturnType<typeof changeExecutorEditPageAC>;

export const changeExecutorEditPageAC = (executor: string | null, id: number | null) =>
  ({
    type: 'CHANGE-EXECUTOR-EDIT',
    executor,
    id,
  } as const);

export const getApplicationsTC = () => (dispatch: Dispatch) => {
  applicationsAPI
    .getApplications()
    .then(res => {
      console.log(res.data);
      console.log(res);
      dispatch(getApplicationsAC(res.data.value));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getApplicationInfoTC = (id: string) => (dispatch: Dispatch) => {
  applicationsAPI
    .getApplicationInfo(id)
    .then(res => {
      console.log(res.data);
      dispatch(getApplicationInfoAC(res.data));
    })
    .catch(err => {
      console.log(err);
    });
};

export const addNewApplicationTC =
  (newApplicationData: NewApplicationDataType) =>
  (dispatch: ThunkDispatch<ActionsTypes, any, ActionsTypes>) => {
    applicationsAPI
      .createNewApplication(newApplicationData)
      .then(res => {
        console.log(res);
        dispatch(getApplicationInfoTC(res.data.toString()));
        dispatch(setAddNewApplicationVisibleAC(false));
        dispatch(setEditApplicationVisibleAC(true));
        dispatch(getApplicationsTC());
      })
      .catch(err => {
        console.log(err);
      });
  };

export const getStatusesTC = () => (dispatch: Dispatch) => {
  applicationsAPI.getStatuses().then(res => {
    dispatch(getStatusAC(res.data));
    console.log(res.data);
  });
};

export const changeApplicationStatusTC =
  (
    id: number | null,
    statusId: number,
    executorId: number | null,
    statusColor: string,
    statusName: string,
  ) =>
  (dispatch: Dispatch) => {
    applicationsAPI
      .updateApplicationInfo(id, statusId, executorId)
      .then(res => {
        console.log(res);
        dispatch(setStatusAC(statusId, statusColor, statusName, id, executorId));
        dispatch(updateApplicationColorStatusAC(statusColor, id, statusName));
      })
      .catch(err => {
        console.log(err);
      });
  };

export const getExecutorsTC = () => (dispatch: Dispatch) => {
  applicationsAPI
    .getExecutors()
    .then(res => {
      console.log(res.data);
      dispatch(getExecutorsAC(res.data));
    })
    .catch(err => {
      console.log(err);
    });
};

export const changeExecutorTC =
  (
    id: number | null,
    statusId: number | null,
    executorId: number | null,
    executorName: string | null,
  ) =>
  (dispatch: Dispatch) => {
    applicationsAPI.updateApplicationInfo(id, statusId, executorId).then(res => {
      dispatch(changeExecutorAC(executorName, id));
      dispatch(changeExecutorEditPageAC(executorName, id));
      console.log(res);
    });
  };

export const addCommentTC =
  (
    id: number | null,
    statusId: number | null,
    executorId: number | null,
    comment: string | null,
  ) =>
  (dispatch: ThunkDispatch<ActionsTypes, any, ActionsTypes>) => {
    applicationsAPI
      .addComment(id, statusId, executorId, comment)
      .then(res => {
        if (id) {
          dispatch(getApplicationInfoTC(id.toString()));
        }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
