import {MouseEventHandler} from 'react';
import styles from './Button.module.css';

type ButtonType =
  'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link'
  | 'close'

interface ButtonProps {
  children: string;
  onClick?: MouseEventHandler;
  type?: ButtonType;
}

const Button = ({children, onClick, type = 'primary'}: ButtonProps) => {
  return (
    <button className={[styles['btn'], styles['btn-' + type]].join(' ')} onClick={onClick}>{children}</button>
  );
};

export default Button;