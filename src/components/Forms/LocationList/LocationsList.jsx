// src/components/LocationsList/LocationsList.jsx
import React, { useEffect, useState } from 'react'
import './LocationList.css'
import { API } from '../../../utils/api/api'
import LocationCard from '../../UI/card/locationCard/LocationCard'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'

const LocationsList = () => {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await API({
          endpoint: '/locations',
          method: 'GET'
        })

        if (response.status === 404) {
          setLocations([])
        } else if (response.status === 200) {
          setLocations(response.data)
        } else {
          throw new Error('Failed to load the locations')
        }
      } catch (err) {
        console.error('Failed to load the locations:', err)
        setError(err.message)
        setLocations([])
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

  if (loading) {
    return (
      <LoadingIcon size={50} borderSize={4} text={'Loading locations...'} />
    )
  }

  if (error) {
    return (
      <div className='locationsError'>
        <p>Error: {error}</p>
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
                ? 'Locations available'
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
