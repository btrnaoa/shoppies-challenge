import { useState } from 'react';
import MovieList from './components/MovieList';

const results = [
  { id: 1, title: 'The Avengers', year: 2012 },
  { id: 2, title: 'Avengers: Infinity War', year: 2018 },
  { id: 3, title: 'Avengers: Endgame', year: 2019 },
];

const initialNominees = [
  { id: 2, title: 'Avengers: Infinity War', year: 2018 },
];

const App = () => {
  const [nominees, setNominees] = useState(initialNominees);
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
