import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "../styles/LiveStreamComponent.css"
import eventService from '../services/eventService'

const VideoComponent = ({ videoUrl }) => {
  return <video id="videoPlayer" controls muted="muted">
    <source
      src={videoUrl}
      type="video/mp4"
    />
  </video>
}

const AudioComponent = ({ audioUrl }) => {
  return <audio controls>
    <source
      src={audioUrl}
      type="audio/mp3"
    />
  </audio>
}

function LiveStreamComponent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState(null)
  const [isVideoMedia, setIsVideoMedia] = useState(false)

  useEffect(() => {
    let isCancelled = false
    const loadEvent = async () => {
      if (!isCancelled) {
        try {
          if (isNaN(id)) {
            throw error
          }
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
    }

    loadEvent()
    return () => {
      isCancelled
    }
  }, [])

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <div id="livestream-main">
      {
        event != null ? <div className="livestream-container">
          <div className="livestream-media">
            {isVideoMedia ? <VideoComponent videoUrl={`http://localhost:3333/data/video-stream/${Math.floor(Math.random() * (3 - 1 + 1) + 1)}`} />
              :
              <AudioComponent audioUrl={`http://localhost:3333/data/audio-stream/${Math.random() > 0.5 ? 1 : 2}`} />}
          </div>
          <div className="livestream-content">
            <h2>{event.artist} at {event.venue}</h2>
            <h3>{event.date}</h3>
            <h4>Information</h4>
            <p>{event.description}</p>
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