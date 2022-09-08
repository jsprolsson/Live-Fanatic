import { useParams } from "react-router-dom"


function LiveStreamComponent() {
  const { id } = useParams()

  console.log(id);

  return (
    <div>

    </div>
  )
}

export default LiveStreamComponent