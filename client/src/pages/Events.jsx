import { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations()
                setLocations(locationsData)
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    const handleLocationChange = async (e) => {
        const locationId = e.target.value
        setSelectedLocation(locationId)
        try {
            if (locationId === '') {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
            } else {
                const eventsData = await EventsAPI.getEventsByLocation(locationId)
                setEvents(eventsData)
            }
        }
        catch (error) {
            throw error
        }
    }

    const selectedLocationName = locations.find(l => String(l.id) === selectedLocation)?.name

    return (
        <div className='location-events'>
            <header>
                <div className='location-info'>
                    <h2><i className="fa-solid fa-calendar-days"></i> {selectedLocationName || 'All Events'}</h2>
                    <p>{selectedLocationName ? `Events at ${selectedLocationName}` : 'Upcoming and past events across all UnityGrid Plaza venues'}</p>
                </div>
            </header>

            <div className='events-filter'>
                <select value={selectedLocation} onChange={handleLocationChange}>
                    <option value=''>All Locations</option>
                    {locations.map(location => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                </select>
            </div>

            <main>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> No events found.</h2>
                }
            </main>
        </div>
    )
}

export default Events
