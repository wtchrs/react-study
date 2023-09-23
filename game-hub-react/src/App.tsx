import {useEffect, useState} from 'react';
import './App.css';
import GameList from './components/GameList.tsx';
import GenreList from './components/GenreList.tsx';
import OrderSelect from './components/OrderSelect.tsx';
import PlatformSelect from './components/PlatformSelect.tsx';
import SearchForm from './components/SearchForm.tsx';
import gameService, {Search} from './services/game-service.ts';
import genreService from './services/genre-service.ts';
import httpService from './services/http-service.ts';
import platformService from './services/platform-service.ts';
import type {Game, Genre, Platform} from './types.ts';

function App() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreError, setGenreError] = useState('');
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platformError, setPlatformError] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [gameError, setGameError] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [searchOption, setSearchOption] = useState<Search>({page: 1, page_size: 20});

  // Fetching genres
  useEffect(() => {
    const {request, cancel} = genreService.getAllList();

    request
      .then(res => setGenres(res.data.results))
      .catch(err => setGenreError(err.message));

    return cancel;
  }, []);

  // Fetching platforms
  useEffect(() => {
    const {request, cancel} = platformService.getAllList();

    request
      .then(res => setPlatforms(res.data.results))
      .catch(err => setPlatformError(err.message));

    return cancel;
  }, []);

  // Fetching games
  useEffect(() => {
    const {request, cancel} = gameService.get(searchOption);

    request
      .then(res => {
        setGames(res.data.results);
        setNextPageUrl(res.data.next);
      })
      .catch(err => setGameError(err.message));

    return cancel;
  }, [searchOption]);

  const handleSearch = (input: string) => setSearchOption({search: input, ...searchOption});

  const handleGenreClick = (id: number) => {
    const newOption = {...searchOption};
    if (id === 0) {
      delete newOption.genres;
    } else {
      newOption.genres = id.toString();
    }
    setSearchOption(newOption);
  };

  const handlePlatformSelect = (id: string) => {
    const newOption = {...searchOption};
    if (id) {
      newOption.platforms = id.toString();
    } else {
      delete newOption.platforms;
    }
    setSearchOption(newOption);
  };

  const handleOrderSelect = (order: string) => {
    const newOption = {...searchOption};
    if (order) {
      newOption.ordering = order;
    } else {
      delete newOption.ordering;
    }
    setSearchOption(newOption);
  };

  const handleLoadingNext = () => {
    const {request, cancel} = httpService.getUrl(nextPageUrl);

    request
      .then(res => {
        setGames([...games, ...res.data.results]);
        setNextPageUrl(res.data.next);
      })
      .catch(err => setGameError(err.message));

    return cancel;
  };

  return (
    <>
      <SearchForm handleSubmit={handleSearch}/>
      <GenreList genres={genres} error={genreError} handleClick={handleGenreClick}/>
      <PlatformSelect platforms={platforms} selected={searchOption.platforms} error={platformError}
                      handleSelect={handlePlatformSelect}/>
      <OrderSelect selected={searchOption.ordering} handleSelect={handleOrderSelect}/>
      <GameList
        selectedGenre={genres.find(genre => searchOption.genres && genre.id === parseInt(searchOption.genres))?.name}
        games={games} error={gameError} handleLoadingNext={handleLoadingNext}/>
    </>
  );
}

export default App;
