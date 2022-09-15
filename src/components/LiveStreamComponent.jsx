import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "../styles/LiveStreamComponent.css"
import { useStore } from '../store/useStore'
import eventService from '../services/eventService'

const VideoComponent = ({ videoUrl }) => {
  return <video id="videoPlayer" controls muted="muted">
    <source
      src="/data/video-stream/3"
      type="video/mp4"
    />
  </video>
}

const AudioComponent = (props) => {
  return <audio controls>
    <source
      src="http://localhost:3333/data/audio-example"
      type="audio/mp3"
    />
  </audio>
}

function LiveStreamComponent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, setUser } = useStore()
  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState(null)
  const [isVideoMedia, setIsVideoMedia] = useState(false)

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const eventFromDb = await eventService.getOneEvent(id)
        setEvent(eventFromDb)
        const mediaType = eventFromDb.type === 'livestream' ? true : false
        setIsVideoMedia(mediaType)
        setIsLoading(false)
      } catch (error) {
        setEvent(null)
        setIsLoading(false)
      }
    }

    loadEvent()
  }, [])

  const doesIdExist = () => true

  console.log(event);


  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <div>
      {
        event != null ? <div className="livestream-container">
          <div className="livestream-media">
            {isVideoMedia ? <VideoComponent /> : <AudioComponent />}
          </div>
          <div className="livestream-content">
            <h2>{event.artist} at {event.address}</h2>
            <p>{event.date}</p>
            <h3>Information</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto aspernatur velit odit omnis ad enim eius eos optio, earum nulla aliquid cum! Hic voluptate facilis impedit explicabo quod dolores. Nobis?</p>
          </div>
        </div> : <div className="livestream-error">
          <h2 className="livestream-error-text">No stream with that id</h2>
          <button onClick={() => navigate('/')} className="livestream-error-btn">Back to home</button>
        </div>
      }
    </div>
  )
}

export default LiveStreamComponent