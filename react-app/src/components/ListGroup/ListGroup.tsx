import {useState} from 'react';
import styled from 'styled-components';
import '../examples/ListGroupWithCssModule/ListGroup.css';

interface Props {
  heading: string;
  items: string[];
  onSelectItem?: (item: string) => void;
}

interface ListItemProps {
  active?: boolean;
}

// css-in-js with 'styled-components' library
const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li<ListItemProps>`
  padding: 5px 0;
  background: ${props => props.active ? 'blue' : 'none'};
`;

function ListGroup({heading, items, onSelectItem}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const noItemMessage = (items: string[]) => {
    return items.length === 0 && <p>No item found</p>;
  };

  const makeHandleClick = (index: number, item: string) => {
    if (onSelectItem) {
      return () => {
        setSelectedIndex(index);
        onSelectItem(item);
      };
    }
    return () => setSelectedIndex(index);
  };

  return (
    <>
      <h1>{heading}</h1>
      {noItemMessage(items)}
      <List>
        {items.map((item, index) => {
          return (
            <ListItem active={index === selectedIndex} key={item}
                      onClick={makeHandleClick(index, item)}>{item}</ListItem>
          );
        })}
      </List>
    </>
  );
}

export default ListGroup;