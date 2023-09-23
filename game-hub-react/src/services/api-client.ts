import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.rawg.io/api/',
});

instance.interceptors.request.use(config => {
  config.params = {
    key: import.meta.env.VITE_APP_RAWG_API_KEY,
    ...config.params,
  };
  return config;
});

export default instance;
