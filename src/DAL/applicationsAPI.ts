import axios from 'axios';
import { ApplicationType } from '../redux/applications-reducer';

const axiosInstance = axios.create({
  baseURL: 'http://intravision-task.test01.intravision.ru/',
});

const tenantKey = '7bd558ea-771d-4b99-a2d3-55151d5388ac';

export const applicationsAPI = {
  getApplications: () =>
    axiosInstance.get<ApplicationResponseType>(`odata/tasks?tenantguid=${tenantKey}`),
  createNewApplication: (newApplicationData: NewApplicationDataType) =>
    axiosInstance.post(`api/${tenantKey}/Tasks`, newApplicationData),
  getApplicationInfo: (id: string) => axiosInstance.get(`/api/${tenantKey}/Tasks/${id}`),
  getStatuses: () => axiosInstance.get(`/api/${tenantKey}/Statuses`),
  getExecutors: () => axiosInstance.get(`/api/${tenantKey}/Users`),
  updateApplicationInfo: (
    id: number | null,
    statusId: number | null,
    executorId: number | null,
  ) =>
    axiosInstance.put(`/api/${tenantKey}/Tasks/`, {
      id,
      statusId,
      executorId,
    }),
  addComment: (
    id: number | null,
    statusId: number | null,
    executorId: number | null,
    comment: string | null,
  ) =>
    axiosInstance.put(`/api/${tenantKey}/Tasks/`, {
      id,
      statusId,
      executorId,
      comment,
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
