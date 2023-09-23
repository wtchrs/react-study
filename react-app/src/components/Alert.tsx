import {MouseEventHandler, ReactNode} from 'react';

type AlertType =
  'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'

interface AlertProps {
  children: ReactNode;
  onClose: MouseEventHandler;
  type?: AlertType;
}

const Alert = ({children, onClose, type = 'primary'}: AlertProps) => {
  return (
    <div className={'alert alert-' + type + ' alert-dismissible'}>
      {children}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

export default Alert;