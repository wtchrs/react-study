import {FormEvent, useRef, useState} from 'react';
import {FieldValues, useForm} from 'react-hook-form';

export const FormWithReactHookForm = () => {
  const {register, handleSubmit} = useForm();
  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input {...register('name')} id="name" type="text" className="form-control"/>
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">Age</label>
        <input {...register('age')} id="age" type="number" className="form-control"/>
      </div>
      <input type="submit" className="btn btn-primary" value="Submit"/>
    </form>
  );
};

export const FormWithStateHook = () => {
  // will be modified when every onChange event(key stroke) occurs
  const [person, setPerson] = useState({name: '', age: 0});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input onChange={(event) => setPerson({...person, name: event.target.value})}
               value={person.name} id="name" type="text" className="form-control"/>
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">Age</label>
        <input onChange={(event) => setPerson({...person, age: parseInt(event.target.value)})}
               value={person.age} id="age" type="number" className="form-control"/>
      </div>
      <input type="submit" className="btn btn-primary" value="Submit"/>
    </form>
  );
};

export const FormWithRefHook = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = {name: '', age: 0};

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (nameRef.current) person.name = nameRef.current.value;
    if (ageRef.current) person.age = parseInt(ageRef.current.value);
    console.log(person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input ref={nameRef} id="name" type="text" className="form-control"/>
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">Age</label>
        <input ref={ageRef} id="age" type="number" className="form-control"/>
      </div>
      <input type="submit" className="btn btn-primary" value="Submit"/>
    </form>
  );
};
