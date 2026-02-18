// src/components/LocationsList/LocationsList.jsx
import React from 'react'
import './LocationList.css'
import LocationCard from '../../UI/card/locationCard/LocationCard'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useGetLocations } from '../../../utils/api/queries/locations/useGetLocations'

const LocationsList = () => {
  const { data: locations = [], isLoading, isError, error } = useGetLocations()

  if (isLoading) {
    return (
      <LoadingIcon size={50} borderSize={4} text={'Loading locations...'} />
    )
  }

  if (isError) {
    return (
      <div className='locationsError'>
        <p>Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className='locationsListContainer'>
      {locations.length === 0 ? (
        <div className='noLocationsMessage'>
          <p>There's no locations at this moment</p>
        </div>
      ) : (
        <>
          <div className='locationsCount'>
            <h5>
              {locations.length}{' '}
              {locations.length === 1
                ? 'Location available'
                : 'Locations available'}
            </h5>
          </div>
          <div className='locationsGrid'>
            {locations.map((location) => (
              <LocationCard key={location._id} location={location} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default LocationsList
