import {useEffect, useState} from 'react';
import {CanceledError} from '../services/api-client.ts';
import UserService, {User} from '../services/user-service.ts';

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const {request, cancel} = UserService.getAll();
    request
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return cancel;
  }, []);

  return {users, error, isLoading, setUsers, setError};
};

export default useUsers;