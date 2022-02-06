import { Dispatch } from 'redux';
import { applicationsAPI } from '../DAL/applicationsAPI';

export type ActionsTypes = GetApplicationsACType;

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
    {
      id: number;
      name: string;
    },
  ];
};

export type InitialStateType = {
  applications: ApplicationType[];
};

const initialState: InitialStateType = {
  applications: [],
};

export const applicationsReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case 'GET-APPLICATION':
      return {
        ...state,
        applications: [...action.applications],
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

export const getApplicationsTC = () => (dispatch: Dispatch) => {
  applicationsAPI
    .getApplications()
    .then(res => {
      // console.log(res.data.value);
      console.log(res.data.value);
      dispatch(getApplicationsAC(res.data.value));
    })
    .catch(err => {
      console.log(err);
    });
};
