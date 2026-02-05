import React, { useState } from 'react'
import './LocationSelected.css'
import Banner from '../../components/Layout/banner/Banner'
import { useLocation, useNavigate } from 'react-router-dom'
import { locationsSrc } from '../../constants/locationConstants'
import EventLocationCard from '../../components/UI/card/eventCard/EventLocationCard'
import Button from '../../components/UI/button/Button'
import { Helmet } from 'react-helmet-async'

const LocationSelected = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const locationData = location.state?.location

  if (error) return <div className='error'>{error}</div>
  if (!locationData) return <div>Event not found</div>

  return (
    <>
      <Helmet>
        <title>Events in {locationData.country} | EventHub</title>
        <meta
          name='description'
          content={`Discover events happening in ${locationData.country}. Browse festivals, conferences, and local gatherings.`}
        />
        <link
          rel='canonical'
          href={`${import.meta.env.VITE_APP_URL}/locations/${locationData._id}`}
        />
        <meta property='og:title' content={`Events in ${location.country}`} />
        <meta property='og:image' content={location.locationImg} />
      </Helmet>

      <section id='locationSelected'>
        <Banner
          imageUrl={locationData.locationImg}
          logo={locationsSrc.logoBanner}
        />
        <article id='articleLocationSelected'>
          <div id='locationHeader'>
            <h2>{locationData.country}</h2>
            <Button
              className={'backButton'}
              text={'Back to Locations'}
              fnc={() => navigate(-1)}
            />
          </div>
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
    </>
  )
}

export default LocationSelected
