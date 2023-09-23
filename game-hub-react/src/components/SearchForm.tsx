import {useRef} from 'react';

interface Props {
  handleSubmit: (input: string) => void;
}

const SearchForm = ({handleSubmit}: Props) => {
  const textBoxRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      textBoxRef.current && handleSubmit(textBoxRef.current.value);
    }}>
      <input ref={textBoxRef} name="search" type="text" placeholder="Search games..."/>
      <input type="submit" value="Search"/>
    </form>
  );
};

export default SearchForm;
