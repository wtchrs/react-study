import type {Genre} from '../types.ts';

interface Props {
  genres: Genre[];
  error: string;
  handleClick: (id: number) => void;
}

const GenreList = ({genres, error, handleClick}: Props) => {
  return (
    <>
      <h2>Genres</h2>
      {error && <p>{error}</p>}
      <ul style={{overflow:'scroll', height:'200px'}}>
        <li key="all">
          <button onClick={() => handleClick(0)}>All</button>
        </li>
        {genres.map(genre =>
          <li key={genre.id}>
            <button onClick={() => handleClick(genre.id)}>
              <img style={{width: '40px', height: '40px', objectFit: 'cover'}} src={genre.image_background}
                   alt="genre_image"/>
              {genre.name}
            </button>
          </li>)}
      </ul>
    </>
  );
};

export default GenreList;
