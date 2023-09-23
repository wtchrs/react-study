import {BsHeart, BsHeartFill} from 'react-icons/bs';
import {MouseEvent, MouseEventHandler, useState} from 'react';

interface Props {
  onClick: MouseEventHandler;
}

const Like = ({onClick}: Props) => {
  const [status, setStatus] = useState(false);

  const toggle = (event: MouseEvent) => {
    setStatus(!status);
    onClick(event);
  };

  if (status) return <BsHeartFill color="#FF6B81" size="20" onClick={toggle}/>;
  return <BsHeart size="20" onClick={toggle}/>;
};

export default Like;