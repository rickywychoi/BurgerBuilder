import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-a99e6.firebaseio.com/'
});

instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

instance.interceptors.request.use(request => {
  console.log(request);
  return request;
}, error => {
  console.log(error);
  return error;
})

export default instance;