import React from 'react'
import './AttendeeCard.css'

const AttendeeCard = ({ attendee, numeration }) => {
  return (
    <div
      className='attendeeCard'
      style={{
        '--bg-image': `url('${
          attendee.profileImg || '/images/noProfileImg.png'
        }')`
      }}
    >
      <div id='infoProfileCard'>
        <h5>{numeration}.</h5>
        <h3>{attendee.nickName}</h3>
      </div>
      <div id='profileImgDivCard'>
        <img
          src={attendee.profileImg || '/images/noProfileImg.png'}
          alt={attendee.nickName}
        />
      </div>
    </div>
  )
}

export default AttendeeCard
