import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/SearchComponent.css";
import eventService from "../services/eventService";
import DatePickerComponent from "./DatePickerComponent";
import { Link } from "react-router-dom";

function RadioBoxes({ radioAllValue, radioGenreValue, handleRadioClick }) {
  return (
    <div id="search-filter-boxes">
      <label className="search-checkbox">
        <input
          checked={radioAllValue}
          onChange={handleRadioClick}
          type="radio"
        />
        All
      </label>
      <label className="search-checkbox">
        <input
          checked={radioGenreValue}
          onChange={handleRadioClick}
          type="radio"
        />
        Genre
      </label>
      <div className="search-checkbox ">
      <button>Sort by date</button>

      </div>
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
    <>
      <div className="search-card">
        <h3 class="searchh3">{artist}</h3>
        <h4>{date}</h4>
        <p>{description}</p>
        <Link className="header-nav-link" to={"/events/" + id}>
          More information
        </Link>
      </div>
    </>
  );
}

function SearchComponent() {
  const [useSearchString] = useSearchParams();
  const [searchInputValue, setSearchInputValue] = useState("");

  const [radioCheckAll, setRadioCheckAll] = useState(true);
  const [radioCheckGenre, setRadioCheckGenre] = useState(false);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      let data = await eventService.getAll();
      setEvents(data);
    };

    loadData();
  }, []);
  console.log(events);

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
      ? events.filter((concert) =>
          concert.artist.toLowerCase().includes(searchParam.toLowerCase())
        )
      : events.filter((concert) =>
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
        {dataToShow.length > 0 ? (
          dataToShow.map((concert) => (
            <SearchResult key={concert.id} concert={concert} />
          ))
        ) : (
          // <NoResult onClick={() => navigate("/")} searchString={searchParam} />
          <DatePickerComponent />
        )}
      </div>
    </div>
  );
}

export default SearchComponent;
