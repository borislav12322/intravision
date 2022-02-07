import { Dispatch } from 'redux';
import { applicationsAPI, NewApplicationDataType } from '../DAL/applicationsAPI';

export type ActionsTypes =
  | GetApplicationsACType
  | SetAddNewApplicationVisibleACType
  | SetNewApplicationNameACType
  | SetNewApplicationDescriptionACType
  | GetApplicationInfoACType;

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
  statusName: string;
  statusRgb: string;
  priorityId: number;
  priorityName: string;
  serviceId: number;
  serviceName: string;
  resolutionDatePlan: string;
  initiatorId: number;
  initiatorName: string;
  executorId: number;
  executorName: string;
  executorGroupId: number;
  executorGroupName: string;
  tags: [
    {
      id: number;
      name: string;
    },
  ];
};

export type ApplicationInfoType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  taskTypeId: number;
  taskTypeName: string;
  statusId: number;
  statusName: string;
  statusRgb: string;
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
  executorId: number;
  executorName: string;
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

export type InitialStateType = {
  applications: ApplicationType[];
  isAddNewApplicationFormVisible: boolean;
  newApplicationName: string;
  newApplicationDescription: string;
  applicationInfo: ApplicationInfoType | null;
};

const initialState: InitialStateType = {
  applications: [],
  isAddNewApplicationFormVisible: false,
  newApplicationName: '',
  newApplicationDescription: '',
  applicationInfo: null,
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
    case 'GET-NEW-APPLICATION-INFO':
      return {
        ...state,
        applicationInfo: action.info,
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

export type SetAddNewApplicationVisibleACType = ReturnType<
  typeof setAddNewApplicationVisibleAC
>;

export const setAddNewApplicationVisibleAC = (isVisible: boolean) =>
  ({
    type: 'SET-APPLICATION-VISIBLE',
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

export const addNewApplicationTC =
  (newApplicationData: NewApplicationDataType) => (dispatch: Dispatch) => {
    applicationsAPI
      .createNewApplication(newApplicationData)
      .then(res => {
        console.log(res);
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
