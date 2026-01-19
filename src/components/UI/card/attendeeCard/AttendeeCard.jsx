import React from 'react'
import './AttendeeCard.css'

const AttendeeCard = ({ attendee, i }) => {
  return (
    <>
      <div className='attendeeNumber'>{i + 1}.</div>
      <img
        src={attendee.profileImg || '/images/noProfileImg.png'}
        alt={attendee.nickName}
        className='attendeeAvatar'
      />
      <span className='attendeeName'>{attendee.nickName}</span>
    </>
  )
}

export default AttendeeCard
