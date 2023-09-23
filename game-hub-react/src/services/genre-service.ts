import apiClient from './api-client.ts';

export interface Page {
  ordering?: string;
  page: number;
  page_size: number;
}

class GenreService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAllList(page?: Page) {
    const controller = new AbortController();
    const request = apiClient.get(this.endpoint, {
      signal: controller.signal,
      params: page,
    });
    return {request, cancel: () => controller.abort()};
  }

  getDetail(id: number) {
    const controller = new AbortController();
    const request = apiClient.get(this.endpoint + '/' + id, {signal: controller.signal});
    return {request, cancel: controller.abort};
  }
}

export default new GenreService('genres');