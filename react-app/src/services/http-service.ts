import apiClient from './api-client.ts';

interface Entity {
  id: number;
}

class HttpService<T extends Entity> {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  getAll() {
    const controller = new AbortController();
    const request = apiClient
      .get<T[]>(this.endpoint, {signal: controller.signal});
    return {request, cancel: () => controller.abort()};
  }

  create(t: T) {
    return apiClient.post(this.endpoint, t);
  }

  update(t: T) {
    return apiClient.patch(this.endpoint + '/' + t.id, t);
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + '/' + id);
  }
}

const create = <T extends Entity>(endpoint: string) => {
  return new HttpService<T>(endpoint)
}

export default create;