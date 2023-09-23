import {useState} from 'react';
// import './ListGroup.css'; // Vanilla CSS
import styles from './ListGroup.module.css'; // CSS Module

interface ListGroupProps {
  heading: string;
  items: string[];
  onSelectItem: (item: string) => void;
}

function ListGroup({heading, items, onSelectItem}: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const noItemMessage = (items: string[]) => {
    return items.length === 0 && <p>No item found</p>;
  };

  const makeHandleClick = (index: number, item: string) => {
    return () => {
      setSelectedIndex(index);
      onSelectItem(item);
    };
  };

  return (
    <>
      <h1>{heading}</h1>
      {noItemMessage(items)}
      {/*<ul className="list-group">*/ /* CSS crash may happen */}
      <ul className={[styles.listGroup, styles.container].join(' ')}>
        {items.map((item, index) => {
          return (
            <li key={item}
                className={'list-group-item' + (selectedIndex === index ? ' active' : '')}
                onClick={makeHandleClick(index, item)}>{item}</li>
          );
        })}
      </ul>
    </>
  );
}

export default ListGroup;