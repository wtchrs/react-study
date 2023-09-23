import axios from 'axios';

class HttpService {
  getUrl(url: string) {
    const controller = new AbortController();
    const request = axios.get(url, {signal: controller.signal});
    return {request, cancel: () => controller.abort()};
  }
}

export default new HttpService();