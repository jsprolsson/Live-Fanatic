const getAll = async () => {
  const request = await fetch('/data/events')
  const response = await request.json()
  return response
}

const getOneEvent = async id => {
  const request = await fetch(`/data/events/${id}`)
  const response = await request.json()
  return response
}

const update = async (id, data) => {
  const requestOptions = {
    method: 'put',
    // and that we will send data json formatted
    headers: { 'Content-Type': 'application/json' },
    // the data encoded as json
    body: JSON.stringify(data)
  }
  const request = await fetch(`/data/events/${id}`, requestOptions)
  const response = await request.json()
  return response
}

export default {
  getAll,
  getOneEvent,
  update
}