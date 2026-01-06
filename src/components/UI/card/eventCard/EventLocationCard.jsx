import React from 'react'
import './EventLocationCard.css'
import { useNavigate } from 'react-router-dom'

const EventLocationCard = ({ event }) => {
  const navigate = useNavigate()
  const dateObj = new Date(event.date)
  const formattedDate = dateObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const handleClick = () => {
    navigate(`/Events/Event/${event._id}`, { state: { event } })
  }

  const cardStyle = {
    background: `
      linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)),
      url('${event.eventBgImg}') center/cover no-repeat
    `
  }

  return (
    <div
      className='eventByLocationCard'
      onClick={handleClick}
      style={cardStyle}
    >
      <div id='imgDiv'>
        <img src={event.eventImg} alt='' />
      </div>
      <div id='infoCard'>
        <h3>{event.locationCity}</h3>
        <h5>{formattedDate}</h5>
      </div>
    </div>
  )
}

export default EventLocationCard
