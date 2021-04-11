const SearchForm = ({ searchTerms, handleInputChange }) => (
  <form>
    <label>Movie Title</label>
    <input type="text" value={searchTerms} onChange={handleInputChange} />
  </form>
);

export default SearchForm;
