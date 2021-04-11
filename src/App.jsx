import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';

const App = () => {
  const [nominees, setNominees] = useState([]);

  const [results, setResults] = useState([]);
  useEffect(() => {
    fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=avengers`,
    )
      .then((res) => res.json())
      .then((data) =>
        setResults(
          data.Search.map(({ imdbID, Title, Year }) => ({
            id: imdbID,
            title: Title,
            year: Year,
          })),
        ),
      );
  }, []);

  return (
    <>
      <h1>The Shoppies</h1>
      <MovieList
        nomineeIds={nominees.map((nominee) => nominee.id)}
        movies={results}
        heading="Results"
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
