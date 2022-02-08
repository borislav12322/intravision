import axios from 'axios';
import { ApplicationType } from '../redux/applications-reducer';

const axiosInstance = axios.create({
  baseURL: 'http://intravision-task.test01.intravision.ru/',
});

export const applicationsAPI = {
  getApplications: () =>
    axiosInstance.get<ApplicationResponseType>(
      'odata/tasks?tenantguid=7bd558ea-771d-4b99-a2d3-55151d5388ac',
    ),
  createNewApplication: (newApplicationData: NewApplicationDataType) =>
    axiosInstance.post(
      'api/7bd558ea-771d-4b99-a2d3-55151d5388ac/Tasks',
      newApplicationData,
    ),
  getApplicationInfo: (id: string) =>
    axiosInstance.get(`/api/7bd558ea-771d-4b99-a2d3-55151d5388ac/Tasks/${id}`),
  getStatuses: () =>
    axiosInstance.get('/api/7bd558ea-771d-4b99-a2d3-55151d5388ac/Statuses'),
  getExecutors: () =>
    axiosInstance.get('/api/7bd558ea-771d-4b99-a2d3-55151d5388ac/Users'),
  updateStatus: (id: number | null, statusId: number, executorId: number | null) =>
    axiosInstance.put(`/api/7bd558ea-771d-4b99-a2d3-55151d5388ac/Tasks/`, {
      id,
      statusId,
      executorId,
    }),
};

export type ApplicationResponseType = {
  '@odata.context': string;
  value: ApplicationType[];
};

export type NewApplicationDataType = {
  name: string;
  description: string;
  comment: string;
  price: number;
  taskTypeId: number;
  statusId: number;
  priorityId: number;
  serviceId: number;
  resolutionDatePlan: string;
  tags: number[];
  initiatorId: number;
  executorId: number;
  executorGroupId: number;
};
