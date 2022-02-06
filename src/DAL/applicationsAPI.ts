import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://intravision-task.test01.intravision.ru/',
});

export const applicationsAPI = {
  getApplications: () =>
    axiosInstance.get('odata/tasks?tenantguid=7bd558ea-771d-4b99-a2d3-55151d5388ac'),
};
