import { useSearchParams } from 'react-router-dom'
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
  const [concerts, setConcerts] = useState([])

  // för att söka i databasen
  // useEffect(() => {
  //   const loadConcerts = async () => {
  //     let rawResponse = await fetch('/data/concerts')
  //     console.log(rawResponse);
  //     let response = await rawResponse.json();

  //     console.log(response);
  //   }

  //   loadConcerts()
  // }, [])

  const searchParam = useSearchString.get('name')

  const dataToShow = searchParam ? data.filter(concert => {
    if (concert.artist.toLowerCase().includes(searchParam.toLowerCase())) {
      return concert
    }
  }) : []

  return (
    <div className='search-container'>
      <h2>Search results</h2>
      {dataToShow.length > 0
        ? dataToShow.map(concert => <SearchResult key={concert.id} concert={concert} />)
        : <NoResult searchString={searchParam} />
      }
    </div>
  )
}

export default SearchComponent