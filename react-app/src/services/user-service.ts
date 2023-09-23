import create from './http-service.ts';

export interface User {
  id: number;
  name: string;
}

export default create<User>('/users');