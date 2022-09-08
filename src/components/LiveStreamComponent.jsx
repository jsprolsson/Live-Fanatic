import { useParams } from "react-router-dom"


const VideoComponent = (props) => {
  return <video></video>
}

const AudioComponent = (props) => {
  return <audio></audio>
}

function LiveStreamComponent() {
  const { id } = useParams()
  const isVideoMedia = true

  // get event details
  const mockConcert = {
    artist: "Prince",
    address: "Superbowl MVII",
    date: new Date()
  }

  return (
    <div>
      <div className="livestream-media">
        {isVideoMedia ? <VideoComponent /> : <AudioComponent />}
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