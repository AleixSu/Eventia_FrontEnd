import React, { useEffect, useMemo, useState } from 'react'

import './EventsList.css'
import { useFilter } from '../../../context/FilterContext'
import EventCard from '../../UI/card/eventCard/EventCard'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useGetEventsFiltered } from '../../../utils/api/queries/events/useGetEventsFiltered'

const EventsList = () => {
  const { searchValue, selectedCountries } = useFilter()

  const {
    data: events = [],
    isLoading,
    isError,
    error
  } = useGetEventsFiltered(selectedCountries)

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchValue.toLowerCase())
  )

  if (isLoading) {
    return <LoadingIcon size={50} borderSize={4} text={'Loading events...'} />
  }

  if (isError) {
    return <div className='errorText'>Error: {error.message}</div>
  }

  return (
    <div className='eventsListDiv'>
      {events.length === 0 && !isLoading ? (
        <div className='noEventsMessage'>
          <p>There's no events for the selected country</p>
        </div>
      ) : (
        <>
          <div className='eventsCount'>
            <h5>Events found: {filteredEvents.length}</h5>
          </div>
          <div className='eventsGrid'>
            <div className='eventsGrid'>
              {filteredEvents.length === 0 ? (
                <p>No events were found matching your criteria.</p>
              ) : (
                filteredEvents.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default EventsList
