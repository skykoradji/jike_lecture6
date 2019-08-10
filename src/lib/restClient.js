import axios from 'axios';
import { API } from './config';

const restClient = () => {
  // Create instance
  const instance = axios.create();
  // const uid = localStorage.getItem('uid');
  // const authToken = localStorage.getItem('authToken');
  // Set the AUTH token for any request
  instance.interceptors.request.use(axiosConfig => {
    const current = axiosConfig;
    // current.headers.UID = uid;
    // current.headers.AuthToken = authToken;
    current.url = `${API}/${axiosConfig.url}`;
    return current;
  });

  return instance;
};

export default restClient;
