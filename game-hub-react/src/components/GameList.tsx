import {Game} from '../types.ts';

interface Props {
  selectedGenre?: string;
  games: Game[];
  error: string;
  handleLoadingNext: () => void;
}

const GameList = ({selectedGenre, games, error, handleLoadingNext}: Props) => {
  return (
    <div>
      <h2>{selectedGenre ? selectedGenre + ' Games' : 'Games'}</h2>
      {error && <p>{error}</p>}
      <ul>
        {games.map(game =>
          <li>
            <img style={{width: '60px', height: '60px', objectFit: 'cover'}} src={game.background_image}
                 alt="genre_image"/>
            <p>{game.name}</p>
            <p>{game.released}</p>
            <p>{game.rating}</p>
          </li>)}
      </ul>
      <button onClick={handleLoadingNext}>Next</button>
    </div>
  );
};
export default GameList;
