import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import "../styles/LiveStreamComponent.css"

import { useStore } from '../store/useStore'


const VideoComponent = ({ videoUrl }) => {
  return <video controls width="100%" src="./canned.mp4">

  </video>
}

const AudioComponent = (props) => {
  return <audio></audio>
}

function LiveStreamComponent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, setUser } = useStore()

  console.log(user);

  const doesIdExist = () => true

  useEffect(() => {
    if (isNaN(id) || !doesIdExist()) {
      navigate('/events')
    }
  }, [])


  const isVideoMedia = true

  // get event details
  const mockConcert = {
    artist: "Prince",
    address: "Superbowl MVII",
    date: new Date()
  }

  const exampleUrl = ""

  return (
    <div className="livestream-container">
      <div className="livestream-media">
        {isVideoMedia ? <VideoComponent videoUrl={exampleUrl} /> : <AudioComponent />}
      </div>
      <div className="livestream-content">
        <h2>{mockConcert.artist} at {mockConcert.address}</h2>
        <p>{mockConcert.date.toDateString()}</p>
        <h3>Information</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto aspernatur velit odit omnis ad enim eius eos optio, earum nulla aliquid cum! Hic voluptate facilis impedit explicabo quod dolores. Nobis?</p>
      </div>
    </div>
  )
}

export default LiveStreamComponent