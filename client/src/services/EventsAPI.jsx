const getAllEvents = async () => {
    const response = await fetch('/api/events')
    return response.json()
}

const getEventById = async (id) => {
    const response = await fetch(`/api/events/${id}`)
    return response.json()
}

const getEventsByLocation = async (locationId) => {
    const response = await fetch(`/api/locations/${locationId}/events`)
    return response.json()
}

const EventsAPI = { getAllEvents, getEventById, getEventsByLocation }
export default EventsAPI
