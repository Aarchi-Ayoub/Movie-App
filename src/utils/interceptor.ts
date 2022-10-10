import axios from 'axios';
import Config from 'react-native-config';

const API = Config.API_URL || '';

const client = axios.create({
  baseURL: API,
});

const token = '';

export const request = ({...options}): Promise<Object> => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  const onSuccess = (response: any) => response;
  const onError = (error: any) => error;
  console.log('====================================');
  console.log('URL ==> ', API + options.url);
  console.log('====================================');
  return client(options).then(onSuccess).catch(onError);
};
