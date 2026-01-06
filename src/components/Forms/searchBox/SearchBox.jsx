import React from 'react'
import './SearchBox.css'
import { useFilter } from '../../../context/FilterContext'

const SearchBox = () => {
  const { searchValue, setSearchValue } = useFilter()

  return (
    <div className='searchBar'>
      <input
        className='searchInput'
        type='text'
        name=''
        placeholder='Search'
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
        }}
      />
      <button className='searchButton'>
        <img
          className='searchIcon'
          src='./images/searchIcon.png'
          alt='searchImg'
        />
      </button>{' '}
    </div>
  )
}

export default SearchBox
