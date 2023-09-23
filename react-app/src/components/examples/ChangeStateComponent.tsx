import {useState} from 'react';
import {produce} from 'immer';
import ListGroup from '../ListGroup';

const ChangeStateComponent = () => {
  const [tags, setTags] = useState(['happy', 'cheerful']);

  const [customer, setCustomer] = useState({
    name: 'John',
    address: {city: 'San Francisco', zipCode: 94111},
  });

  const [bugs, setBugs] = useState([
    {id: 1, title: 'Bug 1', fixed: false},
    {id: 2, title: 'Bug 2', fixed: false},
  ]);

  const handleClick = () => {
    // add
    setTags([...tags, 'exciting']);
    // remove
    setTags(tags.filter(tag => tag !== 'happy'));
    // update (only this will be applied)
    setTags(tags.map(tag => tag === 'happy' ? 'happiness' : tag));

    // nested object
    setCustomer({
      ...customer,
      address: {...customer.address, zipCode: 94112},
    });

    // array of objects
    setBugs(bugs.map(bug => bug.id === 1 ? {...bug, fixed: true} : bug));

    // array of objects with immer
    setBugs(produce(draft => {
      const bug = draft.find(bug => bug.id === 2);
      if (bug) bug.fixed = true;
    }));
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <ListGroup heading="Tags" items={tags}/>
      <p>name: {customer.name}, city: {customer.address.city}, zip code: {customer.address.zipCode}</p>
      {bugs.map(bug => <p key={bug.id}>{bug.title}: {bug.fixed ? 'Fixed' : 'New'}</p>)}
    </div>
  );
};

export default ChangeStateComponent;