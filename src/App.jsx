import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import SearchForm from './components/SearchForm';

const App = () => {
  const [nominees, setNominees] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');

  const [results, setResults] = useState([]);
  useEffect(
    () =>
      fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchTerms}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.Search) {
            setResults([]);
            return;
          }
          setResults(
            data.Search.map(({ imdbID, Title, Year }) => ({
              id: imdbID,
              title: Title,
              year: Year,
            })),
          );
        }),
    [searchTerms],
  );

  return (
    <>
      <h1>The Shoppies</h1>
      <SearchForm
        searchTerms={searchTerms}
        handleInputChange={(event) => setSearchTerms(event.target.value)}
      />
      <MovieList
        nomineeIds={nominees.map((nominee) => nominee.id)}
        movies={results}
        heading={`Results${searchTerms !== '' ? ` for "${searchTerms}"` : ''}`}
        buttonText="Nominate"
        handleButtonClick={(id) => {
          if (nominees.some((nominee) => nominee.id === id)) {
            return;
          }
          setNominees((prev) => [
            ...prev,
            results.find((movie) => movie.id === id),
          ]);
        }}
      />
      <MovieList
        movies={nominees}
        heading="Nominations"
        buttonText="Remove"
        handleButtonClick={(id) =>
          setNominees((prev) => prev.filter((nominee) => nominee.id !== id))
        }
      />
    </>
  );
};

export default App;
