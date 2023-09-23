import useUsers from './hooks/useUsers.ts';
import userService from './services/user-service.ts';
import {User} from './services/user-service.ts';

function App() {
  const {users, error, isLoading, setUsers, setError} = useUsers();

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = {id: 0, name: 'John'};
    setUsers([newUser, ...users]);
    userService.create(newUser)
      .then(({data: savedUser}) => setUsers([savedUser, ...originalUsers]))
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = {...user, name: user.name + '!'};
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));
    userService.update(updatedUser)
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter(u => u.id !== user.id));
    userService.delete(user.id)
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>Add</button>
      <ul className="list-group">
        {users.map(user =>
          <li key={user.id} className="list-group-item d-flex justify-content-between">
            {user.name}
            <div>
              <button className="btn btn-outline-secondary mx-1" onClick={() => updateUser(user)}>Update</button>
              <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
            </div>
          </li>,
        )}
      </ul>
    </>
  );
}

export default App;
