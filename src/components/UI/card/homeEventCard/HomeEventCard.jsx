import './HomeEventCard.css'
import { NavLink } from 'react-router-dom'

const HomeEventCard = ({ event }) => {
  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return (
    <NavLink
      to={`Events/Event/${event._id}`}
      key={event._id}
      className='homeEventCard'
      state={{ event }}
    >
      <div className='event-card'>
        <div className='event-card-image-wrapper'>
          <img
            src={event.eventBgImg}
            alt={event.eventName}
            className='event-card-image'
          />
          <div className='event-card-gradient'></div>
          <div className='event-card-title-wrapper'>
            <h3 className='event-card-title'>{event.eventName}</h3>
          </div>
        </div>
        <div className='event-card-content'>
          <div className='event-card-info-row'>
            <p>{eventDate}</p>
          </div>
          <div className='event-card-info-row'>
            <p>
              {event.locationCity}, {event.locationCountry.country}
            </p>
          </div>
          <div className='event-card-info-row'>
            <p>
              {event.attendees.length} / {event.maxCapacity}
            </p>
          </div>
          <button className='event-card-button'>View Details</button>
        </div>
      </div>
    </NavLink>
  )
}

export default HomeEventCard
