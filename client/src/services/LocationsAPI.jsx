const getAllLocations = async () => {
    const response = await fetch('/api/locations')
    return response.json()
}

const getLocationById = async (id) => {
    const response = await fetch(`/api/locations/${id}`)
    return response.json()
}

const LocationsAPI = { getAllLocations, getLocationById }
export default LocationsAPI
