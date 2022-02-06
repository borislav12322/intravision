import { Dispatch } from 'redux';
import { applicationsAPI, NewApplicationDataType } from '../DAL/applicationsAPI';

export type ActionsTypes =
  | GetApplicationsACType
  | SetAddNewApplicationVisibleACType
  | SetNewApplicationNameACType
  | SetNewApplicationDescriptionACType;

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

export type InitialStateType = {
  applications: ApplicationType[];
  isAddNewApplicationFormVisible: boolean;
  newApplicationName: string;
  newApplicationDescription: string;
};

const initialState: InitialStateType = {
  applications: [],
  isAddNewApplicationFormVisible: false,
  newApplicationName: '',
  newApplicationDescription: '',
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

export const getApplicationsTC = () => (dispatch: Dispatch) => {
  applicationsAPI
    .getApplications()
    .then(res => {
      console.log(res.data);
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
