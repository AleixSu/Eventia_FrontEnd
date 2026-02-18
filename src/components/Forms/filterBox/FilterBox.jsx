import React, { useEffect, useState } from 'react'
import { useFilter } from '../../../context/FilterContext'
import './FilterBox.css'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useGetCountries } from '../../../utils/api/queries/locations/useGetCountries'

const FilterBox = () => {
  const { selectedCountries, toggleCountry } = useFilter()

  const { data: countries = [], isLoading, isError, error } = useGetCountries()

  if (isLoading) {
    return <LoadingIcon size={25} borderSize={2} text={'Loading filter...'} />
  }

  if (isError) {
    return <div className='error-text'> Error: {error.message}</div>
  }

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
