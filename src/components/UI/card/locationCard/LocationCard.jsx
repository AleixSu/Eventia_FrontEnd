import React from 'react'
import './LocationCard.css'
import { NavLink } from 'react-router-dom'

const LocationCard = ({ location }) => {
  return (
    <NavLink
      to={`Location/${location._id}`}
      key={location._id}
      className='locationCard'
      state={{ location }}
    >
      {location.locationImg && (
        <div className='locationCardImage'>
          <img src={location.locationImg} alt={location.country} />
        </div>
      )}
      <div className='locationCardContent'>
        <h3>{location.country}</h3>
        {location.description && (
          <p className='locationDescription'>{location.description}</p>
        )}
        {location.eventList && location.eventList.length > 0 && (
          <div className='locationEventsInfo'>
            <span className='eventsBadge'>
              {location.eventList.length}{' '}
              {location.eventList.length === 1 ? 'event' : 'events'}
            </span>
          </div>
        )}
      </div>
    </NavLink>
  )
}

export default LocationCard
