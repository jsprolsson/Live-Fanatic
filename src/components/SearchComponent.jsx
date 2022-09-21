import { useSearchParams, useNavigate, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import "../styles/SearchComponent.css";
import eventService from "../services/eventService";
import Datepicker from "react-datepicker";

function RadioBoxes({ radioAllValue, radioGenreValue, handleRadioClick }) {
  return (
    <div id="search-filter-boxes">
      <label className="search-checkbox">
        <input
          checked={radioAllValue}
          onChange={handleRadioClick}
          type="radio"
        />
        Artist
      </label>
      <label className="search-checkbox">
        <input
          checked={radioGenreValue}
          onChange={handleRadioClick}
          type="radio"
        />
        Genre
      </label>
    </div>
  );
}

function Searchbar({
  inputValue,
  onInputChange,
  onEnter,
  onSearchClick,
  radioCheckGenre,
}) {
  return (
    <div id="search-advanced-group">
      <input
        onKeyDown={onEnter}
        value={inputValue}
        onChange={onInputChange}
        id="search-body-input"
        list="suggestions"
      />
      {radioCheckGenre ? (
        <datalist id="suggestions">
          <option>Rock</option>
          <option>Orchestra</option>
          <option>Metal</option>
        </datalist>
      ) : (
        <></>
      )}

      <button onClick={onSearchClick} id="search-body-btn">
        Search
      </button>
    </div>
  );
}

function NoResult({ searchString, onClick }) {
  return (
    <div>
      <p className="no-result">No results for "{searchString}", please refine your search</p>
    </div>
  );
}

function SearchResult({ concert }) {
  const { artist, date, description, id } = concert;

  return (
    <>
      <div className="search-card">
        <h3 className="searchh3">{artist}</h3>
        <h4>{date}</h4>
        <p>{description}</p>
        <Link className="header-nav-link" to={"/events/" + id}>
          More information
        </Link>
      </div>
    </>
  );
}
function DateFilter({
  selectedDateOne,
  selectedDateTwo,
  setSelectedDateOne,
  setSelectedDateTwo,
  handleDateReset,
  handleSetSortByDate,
  sortByDate,
}) {
  return (
    <>
      <div className="search-checkbox">
        <button onClick={handleSetSortByDate} className="sortbydatebtn ">
          Sort by date
        </button>
      </div>

      <div className="dpdiv">
        {sortByDate ? (
          <>
            <div className="dpdiv">
              <Datepicker
                value={selectedDateOne}
                onChange={(date) => {
                  const d = new Date(date).toLocaleDateString("sv-SE");
                  console.log(d);
                  setSelectedDateOne(d);
                }}
                minDate={new Date()}
              />
              <Datepicker
                value={selectedDateTwo}
                onChange={(date) => {
                  const d = new Date(date).toLocaleDateString("sv-SE");
                  console.log(d);
                  setSelectedDateTwo(d);
                }}
                minDate={new Date(selectedDateOne)}
              />
            </div>
            <button onClick={handleDateReset} className="sortbydatebtn ">
              Reset
            </button>
          </>
        ) : (
          null
        )}
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
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  const [sortByDate, setSortByDate] = useState(false);
  const [selectedDateOne, setSelectedDateOne] = useState(
    new Date().toLocaleDateString()
  );
  const [selectedDateTwo, setSelectedDateTwo] = useState(
    date.toLocaleDateString()
  );

  useEffect(() => {
    const loadData = async () => {
      let data = await eventService.getAll();
      const listSortedByDate = [...data].sort((a, b) =>
        a.date > b.date ? 1 : -1
      );
      setEvents(listSortedByDate);
    };

    loadData();
  }, []);

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

  const handleSetSortByDate = () => {
    {
      sortByDate ? setSortByDate(false) : setSortByDate(true);
    }
  };

  const handleDateReset = () => {
    setSelectedDateOne(new Date().toLocaleDateString());
    setSelectedDateTwo(date.toLocaleDateString());
  };

  const handleRadioChange = () => {
    setRadioCheckAll(!radioCheckAll);
    setRadioCheckGenre(!radioCheckGenre);
  };

  let dataToShow = [];

  if (searchParam) {
    sortByDate
      ? (dataToShow = radioCheckAll
          ? events
              .filter((concert) =>
                concert.artist.toLowerCase().includes(searchParam.toLowerCase())
              )
              .filter(
                (concert) =>
                  Date.parse(concert.date) >= Date.parse(selectedDateOne) &&
                  Date.parse(concert.date) <= Date.parse(selectedDateTwo)
              )
          : events
              .filter((concert) =>
                concert.genre.toLowerCase().includes(searchParam.toLowerCase())
              )
              .filter(
                (concert) =>
                  Date.parse(concert.date) >= Date.parse(selectedDateOne) &&
                  Date.parse(concert.date) <= Date.parse(selectedDateTwo)
              ))
      : (dataToShow = radioCheckAll
          ? events
              .filter((concert) =>
                concert.artist.toLowerCase().includes(searchParam.toLowerCase())
              )
              .filter((concert) => Date.parse(concert.date) >= new Date())
          : events
              .filter((concert) =>
                concert.genre.toLowerCase().includes(searchParam.toLowerCase())
              )
              .filter((concert) => Date.parse(concert.date) >= new Date()));
  }

  return (
    <div className="search-container">
      <h2>Search</h2>
      <Searchbar
        inputValue={searchInputValue}
        onInputChange={(e) => setSearchInputValue(e.target.value)}
        onEnter={handleSearchEnter}
        onSearchClick={handleSearchClick}
        radioCheckGenre={radioCheckGenre}
      />
      <RadioBoxes
        radioAllValue={radioCheckAll}
        radioGenreValue={radioCheckGenre}
        handleRadioClick={handleRadioChange}
      />
      <DateFilter
        selectedDateOne={selectedDateOne}
        selectedDateTwo={selectedDateTwo}
        setSelectedDateOne={setSelectedDateOne}
        setSelectedDateTwo={setSelectedDateTwo}
        sortByDate={sortByDate}
        handleDateReset={handleDateReset}
        handleSetSortByDate={handleSetSortByDate}
      />

      <div>
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
