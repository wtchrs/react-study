import ListGroup from '../../components/ListGroup';
import Alert from '../../components/Alert';
import Button from '../../components/Button/Button.tsx';
import {useState} from 'react';
import './App.css';
import {BsFillCalendarFill} from 'react-icons/bs';
import Like from '../../components/Like.tsx';
import ChangeStateComponent from '../../components/examples/ChangeStateComponent.tsx';

function App() {
  const items = ['New York', 'San Francisco', 'Tokyo', 'London', 'Paris'];

  const [visible, setVisibility] = useState(false);

  const handleClick = () => {
    console.log('My Button clicked');
    setVisibility(true);
  };

  const handleSelectItem = (item: string) => console.log(item);

  return (
    <div>
      <ChangeStateComponent/>
      <br/>
      {visible && <Alert onClose={() => setVisibility(false)}>My Button clicked</Alert>}
      <Button onClick={handleClick}>My Button</Button>
      <Like onClick={() => console.log('clicked')}/>
      <br/>
      <br/>
      <BsFillCalendarFill color="red" size="40"/>
      <ListGroup heading="Cities" items={items} onSelectItem={handleSelectItem}/>
    </div>
  );
}

export default App;
