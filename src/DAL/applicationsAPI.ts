import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://intravision-task.test01.intravision.ru/',
});

export const applicationsAPI = {
  getApplications: () =>
    axiosInstance.get('odata/tasks?tenantguid=06e867b6-a7da-4c45-bfcb-86c9f9ae7264'),
};
