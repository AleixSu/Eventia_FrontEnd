import React, { useEffect, useState } from 'react'
import './AttendeesList.css'
import Button from '../../../UI/button/Button'
import { useAuthContext } from '../../../../context/AuthContext'
import AttendeesRoll from './AttendeesRoll'
import LoadingIcon from '../../../UI/loadingIcon/LoadingIcon'
import { useGetUserByNameOrNickname } from '../../../../utils/api/queries/users/useGetUserByNameOrNickname'
import useDebounce from '../../../../utils/Hooks/useDebounce'

const AttendeesList = ({ event }) => {
  const { token } = useAuthContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [foundAttendees, setFoundAttendees] = useState([])
  const [openAttendeeList, setOpenAtteendeeList] = useState(false)

  const debouncedSearch = useDebounce(searchQuery, 500)
  const getUsersByNameOrNicknameMutation = useGetUserByNameOrNickname(token)

  useEffect(() => {
    if (!openAttendeeList) return
    if (!debouncedSearch.trim()) {
      setFoundAttendees([])
      return
    }

    getUsersByNameOrNicknameMutation.mutate(
      { searchQuery: debouncedSearch, eventId: event._id },
      {
        onSuccess: (data) => setFoundAttendees(data)
      }
    )
  }, [debouncedSearch, openAttendeeList])

  return (
    <div id='attendeesListUser'>
      <h3 className='attendeesListTitle'>Who's Going</h3>
      <div id='exampleSection'>
        <div className='exampleAttendees'>
          <div className='exampleAttendeesImgDiv'>
            {event.attendees.slice(0, 5).map((attendee, i) => (
              <img
                key={attendee._id}
                src={attendee.profileImg || '/images/noProfileImg.png'}
                alt='userImg'
                style={{ zIndex: 5 - i, marginLeft: i > 0 ? '-20px' : '0' }}
              />
            ))}
          </div>
          <div id='attendeesCount'>
            <p>
              {event.attendees.length === 0
                ? 'Be the first to attend to this event'
                : event.attendees.length - 5 < 1
                  ? `${event.attendees.length} going`
                  : `+ ${event.attendees.length - 5} going`}
            </p>
          </div>
        </div>
      </div>
      <div id='eventStats'>
        <div className='stat'>
          <div className='statNumber attending'>
            {event.attendees.length.toLocaleString()}
          </div>
          <div className='statLabel'>Attending</div>
        </div>
        <div className='stat'>
          <div className='statNumber capacity'>
            {Math.round((event.attendees.length / event.maxCapacity) * 100)}%
          </div>
          <div className='statLabel'>Capacity</div>
        </div>
        <div className='stat'>
          <div className='statNumber spotsLeft'>
            {(event.maxCapacity - event.attendees.length).toLocaleString()}
          </div>
          <div className='statLabel'>Spots Left</div>
        </div>
      </div>
      <div id='viewAllButtonDiv'>
        <Button
          className={openAttendeeList ? 'viewNoneButton' : 'viewAllButton'}
          text={openAttendeeList ? 'Close Attendees List' : 'See All Attendees'}
          fnc={() => setOpenAtteendeeList(!openAttendeeList)}
        />
      </div>
      {openAttendeeList && (
        <div id='attendeesSection'>
          <div className='searchContainer'>
            <input
              type='text'
              placeholder='Search attendees...'
              className='searchInputAttendees'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery.length === 0 ? (
            <AttendeesRoll attendees={event.attendees} />
          ) : getUsersByNameOrNicknameMutation.isPending ||
            searchQuery !== debouncedSearch ? ( // 👈 así
            <LoadingIcon size={50} borderSize={4} />
          ) : foundAttendees.length > 0 ? (
            <div className='attendeesRoll'>
              <AttendeesRoll attendees={foundAttendees} />
            </div>
          ) : (
            <div className='noResults'>
              <p>No attendees found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AttendeesList
