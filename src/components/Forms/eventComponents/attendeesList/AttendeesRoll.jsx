import AttendeeCard from '../../../UI/card/attendeeCard/AttendeeCard'
import './AttendeesRoll.css'
import React from 'react'

export const AttendeesRoll = ({ attendees }) => {
  return (
    <div className='attendeesRoll'>
      {attendees.map((attendee, i) => (
        <div key={attendee._id} className='attendeeItem'>
          <AttendeeCard attendee={attendee} i={i} />
        </div>
      ))}
    </div>
  )
}

export default AttendeesRoll
