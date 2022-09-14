import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/SearchComponent.css";

let data = [
  {
    id: 1,
    artist: "Kent",
    genre: "rock",
    date: new Date(),
    description: "En sista sång tillsammans",
  },
  {
    id: 2,
    artist: "Soilwork",
    date: new Date(),
    genre: "rock",
    description: "Kal pedal är skral i jämförelse",
  },
  {
    id: 3,
    artist: "Charlotte Pirelli",
    genre: "pop",
    date: new Date(),
    description: "Vi har hela helgen på oss",
  },
];

function RadioBoxes({ radioAllValue, radioGenreValue, handleRadioClick }) {
  return (
    <div id="search-filter-boxes">
      <label className="search-checkbox">
        <input
          checked={radioAllValue}
          onChange={handleRadioClick}
          type="radio"
        />
        all
      </label>
      <label className="search-checkbox">
        <input
          checked={radioGenreValue}
          onChange={handleRadioClick}
          type="radio"
        />
        genre
      </label>
    </div>
  );
}

function Searchbar({ inputValue, onInputChange, onEnter, onSearchClick }) {
  return (
    <div id="search-advanced-group">
      <input
        onKeyDown={onEnter}
        value={inputValue}
        onChange={onInputChange}
        id="search-body-input"
      />
      <button onClick={onSearchClick} id="search-body-btn">
        Search
      </button>
    </div>
  );
}

function NoResult({ searchString, onClick }) {
  return (
    <div className="search-card search-error">
      <p>No results for "{searchString}", please refine your search</p>
      <button onClick={onClick}>Go to home</button>
    </div>
  );
}

function SearchResult(concert) {
  const { artist, date, description, id } = concert.concert;

  return (
    <div className="search-card">
      <h3>{artist}</h3>
      <h4>{date.toLocaleDateString()}</h4>
      <p>{description}</p>
      <Link className="header-nav-link" to={"/events/" + id}>
        More information
      </Link>
    </div>
  );
}

function SearchComponent() {
  const [useSearchString] = useSearchParams();
  const [searchInputValue, setSearchInputValue] = useState("");

  const [radioCheckAll, setRadioCheckAll] = useState(true);
  const [radioCheckGenre, setRadioCheckGenre] = useState(false);

  const navigate = useNavigate();
  let searchParam = useSearchString.get("name");
  if (!searchParam) {
    searchParam = useSearchString.get("genre");
  }

  const handleSearchEnter = (e) => {
    if (e.key == "Enter") {
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    if (radioCheckAll) {
      navigate(`/search?name=${searchInputValue}`);
    } else {
      navigate(`/search?genre=${searchInputValue}`);
    }
  };

  const handleRadioChange = () => {
    setRadioCheckAll(!radioCheckAll);
    setRadioCheckGenre(!radioCheckGenre);
  };
  let dataToShow = [];

  if (searchParam) {
    dataToShow = radioCheckAll
      ? data.filter((concert) =>
          concert.artist.toLowerCase().includes(searchParam.toLowerCase())
        )
      : data.filter((concert) =>
          concert.genre.toLowerCase().includes(searchParam.toLowerCase())
        );
  }

  return (
    <div className="search-container">
      <h2>Search</h2>
      <Searchbar
        inputValue={searchInputValue}
        onInputChange={(e) => setSearchInputValue(e.target.value)}
        onEnter={handleSearchEnter}
        onSearchClick={handleSearchClick}
      />
      <RadioBoxes
        radioAllValue={radioCheckAll}
        radioGenreValue={radioCheckGenre}
        handleRadioClick={handleRadioChange}
      />
      <div>
        <h2>Results</h2>
        {dataToShow.length > 0 ? (
          dataToShow.map((concert) => (
            <SearchResult key={concert.id} concert={concert} />
          ))
        ) : (
          <NoResult onClick={() => navigate("/")} searchString={searchParam} />
        )}
      </div>
    </div>
  );
}

export default SearchComponent;
