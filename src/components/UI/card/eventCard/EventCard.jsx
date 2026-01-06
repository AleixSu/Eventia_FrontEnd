import React from 'react'
import './EventCard.css'
import { NavLink } from 'react-router-dom'

const EventCard = ({ event }) => {
  return (
    <NavLink
      to={`Event/${event._id}`}
      key={event._id}
      className='eventCard'
      style={{ backgroundImage: `url(${event.eventImg})` }}
      state={{ event }}
    >
      <div id='overlayBlurCard'></div>
      <div>
        <h3>{event.eventName} </h3>
        <h4>{event.locationCity} </h4>
      </div>
    </NavLink>
  )
}

export default EventCard
