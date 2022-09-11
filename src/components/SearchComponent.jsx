import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import "../styles/SearchComponent.css"

let data = [
  {
    id: 1,
    artist: "Kent",
    date: new Date(),
    description: "En sista sång tillsammans"
  },
  {
    id: 2,
    artist: "Soilwork",
    date: new Date(),
    description: "Kal pedal är skral i jämförelse"
  },
  {
    id: 3,
    artist: "Charlotte Pirelli",
    date: new Date(),
    description: "Vi har hela helgen på oss"
  },
]

function Searchbar({ inputValue, onInputChange, onEnter, onSearchClick }) {
  return (
    <div id='search-advanced-group'>
      <input onKeyDown={onEnter} value={inputValue} onChange={onInputChange} id='search-body-input' />
      <button onClick={onSearchClick} id='search-body-btn'>Search</button>
    </div>
  )
}

function NoResult({ searchString }) {
  return <div className='search-card error'>
    <p>No results for "{searchString}", please refine your search</p>
    <button>Go to home</button>
  </div>
}

function SearchResult(concert) {
  const { artist, date, description } = concert.concert

  return (
    <div className='search-card'>
      <h3>{artist}</h3>
      <h4>{date.toLocaleDateString()}</h4>
      <p>{description}</p>
      <button>More information</button>
    </div>
  )
}

function SearchComponent() {
  const [useSearchString] = useSearchParams()
  const [searchInputValue, setSearchInputValue] = useState("")

  const [radioAll, setRadioAll] = useState(true)
  const [radioGenre, setRadioGenre] = useState(false)

  const navigate = useNavigate()
  const searchParam = useSearchString.get('name')

  const handleSearchEnter = (e) => {
    if (e.key == 'Enter') {
      handleSearchClick()
    }
  }
  const handleSearchClick = () => navigate(`/search?name=${searchInputValue}`)

  const handleRadioChange = () => {
    setRadioAll(!radioAll)
    setRadioGenre(!radioGenre)
  }

  const dataToShow = searchParam ? data.filter(concert => {
    if (concert.artist.toLowerCase().includes(searchParam.toLowerCase())) {
      return concert
    }
  }) : []



  return (
    <div className='search-container'>
      <h2>Search</h2>
      <Searchbar
        inputValue={searchInputValue}
        onInputChange={(e) => setSearchInputValue(e.target.value)}
        onEnter={handleSearchEnter}
        onSearchClick={handleSearchClick} />
      <div id='search-filter-boxes'>
        <label className='search-checkbox'>
          <input type="radio" />
          all
        </label>
        <label className='search-checkbox'>
          <input type="radio" />
          genre
        </label>
      </div>
      <div>
        <h2>Results</h2>
        {dataToShow.length > 0
          ? dataToShow.map(concert => <SearchResult key={concert.id} concert={concert} />)
          : <NoResult searchString={searchParam} />
        }
      </div>
    </div>
  )
}

export default SearchComponent