import apiClient from './api-client.ts';

export interface Search {
  ordering?: string;
  page: number;
  page_size: number;
  search?: string;
  search_precise?: boolean;
  platforms?: string;
  genres?: string;
}

class GameService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get(search: Search) {
    const controller = new AbortController();
    const request = apiClient.get(this.endpoint, {
      signal: controller.signal,
      params: search,
    });
    return {request, cancel: () => controller.abort()};
  }
}

export default new GameService('games');
