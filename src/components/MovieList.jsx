const MovieList = ({
  nomineeIds,
  movies,
  heading,
  buttonText,
  handleButtonClick,
}) => (
  <>
    <h2>{heading}</h2>
    <ul>
      {movies.map(({ id, title, year }) => (
        <div key={id}>
          <li>
            {title} ({year})
          </li>
          <button
            disabled={nomineeIds && nomineeIds.includes(id)}
            onClick={() => handleButtonClick(id)}
          >
            {buttonText}
          </button>
        </div>
      ))}
    </ul>
  </>
);

export default MovieList;
