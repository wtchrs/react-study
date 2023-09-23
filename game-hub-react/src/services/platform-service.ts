import apiClient from './api-client.ts';

class PlatformService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAllList() {
    const controller = new AbortController();
    const request = apiClient.get(this.endpoint, {signal: controller.signal});
    return {request, cancel: () => controller.abort()};
  }

  getDetail(id: number) {
    const controller = new AbortController();
    const request = apiClient.get(this.endpoint + '/' + id, {signal: controller.signal});
    return {request, cancel: () => controller.abort()};
  }
}

export default new PlatformService('platforms')