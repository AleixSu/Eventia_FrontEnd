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
      <div class='event-card'>
        <div class='event-card-image-wrapper'>
          <img
            src={event.eventBgImg}
            alt={event.eventName}
            class='event-card-image'
          />
          <div class='event-card-gradient'></div>
          <div class='event-card-title-wrapper'>
            <h3 class='event-card-title'>{event.eventName}</h3>
          </div>
        </div>
        <div class='event-card-content'>
          <div class='event-card-info-row'>
            <p>{eventDate}</p>
          </div>
          <div class='event-card-info-row'>
            <p>
              {event.locationCity}, {event.locationCountry.country}
            </p>
          </div>
          <div class='event-card-info-row'>
            <p>
              {event.attendees.length} / {event.maxCapacity}
            </p>
          </div>
          <button class='event-card-button'>View Details</button>
        </div>
      </div>
    </NavLink>
  )
}

export default HomeEventCard
