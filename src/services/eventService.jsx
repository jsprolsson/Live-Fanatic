const getAll = async () => {
  const request = await fetch('/data/events')
  const response = await request.json()
  return response
}

const update = async (id, amountOfTickets) => {
  const requestOptions = {}
  const request = await fetch('/data/events', requestOptions)
  const response = await request.json()
  return response
}

export default {
  getAll,
  update
}