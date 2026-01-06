import React, { useState } from 'react'
import './LocationSelected.css'
import Banner from '../../components/Layout/banner/Banner'
import { useLocation, useNavigate } from 'react-router-dom'
import { locationsSrc } from '../../constants/locationConstants'
import EventLocationCard from '../../components/UI/card/eventCard/EventLocationCard'

const LocationSelected = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const locationData = location.state?.location

  if (error) return <div className='error'>{error}</div>
  if (!locationData) return <div>Event not found</div>

  return (
    <section id='locationSelected'>
      <Banner
        imageUrl={locationData.locationImg}
        logo={locationsSrc.logoBanner}
      />
      <article id='articleLocationSelected'>
        <h2>{locationData.country}</h2>
        <div id='eventsHappeningDiv'>
          {!locationData.eventList || locationData.eventList.length === 0 ? (
            <h4 id='noEvents'>¡There's no events in this location yet!</h4>
          ) : (
            <ul>
              {locationData.eventList.map((event) => (
                <li key={event._id}>
                  <EventLocationCard event={event} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </section>
  )
}

export default LocationSelected
