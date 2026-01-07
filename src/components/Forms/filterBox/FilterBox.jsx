import React, { useEffect, useState } from 'react'
import { API } from '../../../utils/api/api'
import { useFilter } from '../../../context/FilterContext'
import './FilterBox.css'
import Button from '../../UI/button/Button'

const FilterBox = () => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { selectedCountries, toggleCountry } = useFilter()

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        const response = await API({ endpoint: '/locations/countries' })

        if (response.status !== 200) {
          throw new Error(
            'An error has ocurred while trying to load the countries'
          )
        }

        setCountries(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  if (loading)
    return (
      <div className='filterLoading'>
        <div className='spinner'></div>
        <p>Loading filter...</p>
      </div>
    )
  if (error) return <div className='error-text'>Error: {error}</div>

  return (
    <div id='filterBox'>
      <div>
        <h5>Filter by location:</h5>
      </div>
      <div id='filterLocationDiv'>
        {countries.map((location) => (
          <Button
            key={location._id}
            text={location.country}
            className={`filter-button ${
              selectedCountries[location.country]?.selected ? 'active' : ''
            }`}
            fnc={() => toggleCountry(location.country, location._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default FilterBox
