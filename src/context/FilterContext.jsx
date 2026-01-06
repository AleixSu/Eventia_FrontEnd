// src/context/FilterContext.jsx
import { createContext, useContext, useState } from 'react'

const FilterContext = createContext(null)

export const useFilter = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter debe usarse dentro de FilterProvider')
  }
  return context
}

export const FilterProvider = ({ children }) => {
  const [selectedCountries, setSelectedCountries] = useState({})
  const [searchValue, setSearchValue] = useState('')

  const toggleCountry = (countryName, countryId) => {
    setSelectedCountries((prev) => ({
      ...prev,
      [countryName]: {
        id: countryId,
        selected: !prev[countryName]?.selected
      }
    }))
  }

  const clearCountries = () => {
    setSelectedCountries({})
  }

  const value = {
    selectedCountries,
    toggleCountry,
    clearCountries,
    searchValue,
    setSearchValue
  }

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}
